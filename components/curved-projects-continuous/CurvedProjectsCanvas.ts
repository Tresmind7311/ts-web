export interface CanvasProject {
    title: string;
    image: string;
    href: string;
    tag?: string;
}

interface CardMetric {
    offsetLeft: number;
    width: number;
    height: number;
}

interface ProjectCanvasOptions {
    canvas: HTMLCanvasElement;
    track: HTMLDivElement;
    cards: (HTMLAnchorElement | null)[];
    projects: CanvasProject[];
}

interface Point {
    x: number;
    y: number;
}

interface SlotLayout {
    inner: number;
    outer: number;
    centerSlope: number;
    innerSlope: number;
    exitSlope: number;
    visibleRange: number;
}

const CAMERA_Z = 8.5;
const CAMERA_FOV = 45;
const CARD_COLUMNS = 24;
const CARD_ROWS = 8;

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const smoothstep = (edge0: number, edge1: number, value: number) => {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};

const hermite = (
    start: number,
    end: number,
    startSlope: number,
    endSlope: number,
    t: number,
) => {
    const t2 = t * t;
    const t3 = t2 * t;

    return (
        (2 * t3 - 3 * t2 + 1) * start
        + (t3 - 2 * t2 + t) * startSlope
        + (-2 * t3 + 3 * t2) * end
        + (t3 - t2) * endSlope
    );
};

const getSlotLayout = (viewportWidth: number): SlotLayout => {
    if (viewportWidth <= 767) {
        return {
            inner: 1.12,
            outer: 1.42,
            centerSlope: 1.24,
            innerSlope: 0.46,
            exitSlope: 0.95,
            visibleRange: 1.75,
        };
    }

    if (viewportWidth <= 1100) {
        return {
            inner: 0.90,
            outer: 1.16,
            centerSlope: 1.12,
            innerSlope: 0.38,
            exitSlope: 0.86,
            visibleRange: 2.18,
        };
    }

    return {
        inner: 0.82,
        outer: 1.06,
        centerSlope: 1.05,
        innerSlope: 0.35,
        exitSlope: 0.85,
        visibleRange: 2.20,
    };
};

const mapRelativeToSlot = (
    relativePosition: number,
    viewportWidth: number,
) => {
    if (relativePosition === 0) {
        return 0;
    }

    const layout = getSlotLayout(viewportWidth);
    const direction = Math.sign(relativePosition);
    const distance = Math.abs(relativePosition);
    let mappedDistance: number;

    if (distance <= 1) {
        mappedDistance = hermite(
            0,
            layout.inner,
            layout.centerSlope,
            layout.innerSlope,
            distance,
        );
    } else if (distance <= 2) {
        const t = distance - 1;
        const eased = t * (2 - t);
        mappedDistance =
            layout.inner
            + (layout.outer - layout.inner) * eased;
    } else {
        mappedDistance =
            layout.outer
            + (distance - 2) * layout.exitSlope;
    }

    return direction * mappedDistance;
};

const getGalleryDepth = (relativePosition: number) =>
    Math.min(Math.abs(relativePosition) * 7, 11.5);

const expandTriangle = (points: [Point, Point, Point], amount: number) => {
    const centerX = (points[0].x + points[1].x + points[2].x) / 3;
    const centerY = (points[0].y + points[1].y + points[2].y) / 3;

    return points.map((point) => {
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        const length = Math.hypot(dx, dy) || 1;

        return {
            x: point.x + (dx / length) * amount,
            y: point.y + (dy / length) * amount,
        };
    }) as [Point, Point, Point];
};

const drawTexturedTriangle = (
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    source: [Point, Point, Point],
    destination: [Point, Point, Point],
) => {
    const [s0, s1, s2] = source;
    const [d0, d1, d2] = destination;
    const denominator =
        s0.x * (s1.y - s2.y)
        + s1.x * (s2.y - s0.y)
        + s2.x * (s0.y - s1.y);

    if (Math.abs(denominator) < 0.0001) {
        return;
    }

    const a = (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) / denominator;
    const b = (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) / denominator;
    const c = (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) / denominator;
    const d = (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) / denominator;
    const e = (d0.x * (s1.x * s2.y - s2.x * s1.y) + d1.x * (s2.x * s0.y - s0.x * s2.y) + d2.x * (s0.x * s1.y - s1.x * s0.y)) / denominator;
    const f = (d0.y * (s1.x * s2.y - s2.x * s1.y) + d1.y * (s2.x * s0.y - s0.x * s2.y) + d2.y * (s0.x * s1.y - s1.x * s0.y)) / denominator;
    const clip = expandTriangle(destination, 0.7);

    context.save();
    context.beginPath();
    context.moveTo(clip[0].x, clip[0].y);
    context.lineTo(clip[1].x, clip[1].y);
    context.lineTo(clip[2].x, clip[2].y);
    context.closePath();
    context.clip();
    context.transform(a, b, c, d, e, f);
    context.drawImage(image, 0, 0);
    context.restore();
};

export default class CurvedProjectsCanvasRenderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly gridCanvas: HTMLCanvasElement;
    private readonly gridContext: CanvasRenderingContext2D;
    private readonly cardCanvas: HTMLCanvasElement;
    private readonly cardContext: CanvasRenderingContext2D;
    private readonly track: HTMLDivElement;
    private cards: (HTMLAnchorElement | null)[];
    private projects: CanvasProject[];
    private readonly images = new Map<string, HTMLImageElement>();
    private metrics: CardMetric[] = [];
    private width = 0;
    private height = 0;
    private trackTop = 0;
    private currentIndex = 0;
    private destroyed = false;

    constructor(options: ProjectCanvasOptions) {
        const context = options.canvas.getContext('2d', { alpha: false });

        if (!context) {
            throw new Error('Canvas 2D is unavailable.');
        }

        const gridCanvas = document.createElement('canvas');
        const gridContext = gridCanvas.getContext('2d');
        const cardCanvas = document.createElement('canvas');
        const cardContext = cardCanvas.getContext('2d');

        if (!gridContext || !cardContext) {
            throw new Error('Canvas 2D is unavailable.');
        }

        this.canvas = options.canvas;
        this.context = context;
        this.gridCanvas = gridCanvas;
        this.gridContext = gridContext;
        this.cardCanvas = cardCanvas;
        this.cardContext = cardContext;
        this.track = options.track;
        this.cards = options.cards;
        this.projects = options.projects;
        this.loadImages();
    }

    public setContent(cards: (HTMLAnchorElement | null)[], projects: CanvasProject[]) {
        this.cards = cards;
        this.projects = projects;
        this.loadImages();
    }

    public resize(width: number, height: number) {
        this.width = Math.max(width, 1);
        this.height = Math.max(height, 1);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        this.canvas.width = Math.round(this.width * pixelRatio);
        this.canvas.height = Math.round(this.height * pixelRatio);
        this.gridCanvas.width = Math.round(this.width * pixelRatio);
        this.gridCanvas.height = Math.round(this.height * pixelRatio);
        this.cardCanvas.width = Math.round(this.width * pixelRatio);
        this.cardCanvas.height = Math.round(this.height * pixelRatio);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.cacheMetrics();
        this.gridContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        this.gridContext.clearRect(0, 0, this.width, this.height);
        this.drawGrid(this.gridContext);
        this.render(this.currentIndex);
    }

    public render(index: number) {
        if (this.destroyed || this.width <= 0 || this.height <= 0) return;

        this.currentIndex = index;
        const frames = this.layoutCards(index);
        this.context.save();
        this.context.setTransform(this.canvas.width / this.width, 0, 0, this.canvas.height / this.height, 0, 0);
        this.context.filter = 'none';
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.drawImage(
            this.gridCanvas,
            0,
            0,
            this.width,
            this.height,
        );
        frames
            .filter((frame) => frame.visible)
            .sort((left, right) => Math.abs(right.relativePosition) - Math.abs(left.relativePosition))
            .forEach((frame) => this.drawCardLayer(frame));

        this.context.restore();
    }

    public destroy() {
        this.destroyed = true;
        this.images.forEach((image) => {
            image.onload = null;
            image.onerror = null;
        });
        this.images.clear();
    }

    private loadImages() {
        this.projects.forEach((project) => {
            if (this.images.has(project.image)) return;
            const image = new Image();
            image.decoding = 'async';
            image.onload = () => this.render(this.currentIndex);
            image.src = project.image;
            this.images.set(project.image, image);
        });
    }

    private cacheMetrics() {
        this.trackTop = this.track.offsetTop;
        this.metrics = this.cards.map((card) => ({
            offsetLeft: card?.offsetLeft ?? 0,
            width: card?.offsetWidth ?? 0,
            height: card?.offsetHeight ?? 0,
        }));
    }

    private layoutCards(index: number) {
        const visibleRange = getSlotLayout(this.width).visibleRange;
        return this.metrics.map((metric, cardIndex) => {
            const card = this.cards[cardIndex];
            const relativePosition = cardIndex - index;
            const normalizedSlot = mapRelativeToSlot(relativePosition, this.width);
            const centerX = this.width / 2 + normalizedSlot * this.width / 2;
            const left = centerX - metric.width / 2;

            if (card) {
                card.style.transform = `translate3d(${left - metric.offsetLeft}px, 0, 0)`;
                card.style.visibility = 'visible';
            }

            return {
                project: this.projects[cardIndex],
                relativePosition,
                centerX,
                top: this.trackTop,
                width: metric.width,
                height: metric.height,
                visible: Boolean(this.projects[cardIndex]) && metric.width > 0 && metric.height > 0 && Math.abs(relativePosition) <= visibleRange,
            };
        });
    }

    private projectWorld(x: number, y: number, z: number): Point {
        const focalLength = this.height / (2 * Math.tan((CAMERA_FOV * Math.PI) / 360));
        const scale = focalLength / (CAMERA_Z - z);
        return { x: this.width / 2 + x * scale, y: this.height / 2 - y * scale };
    }

    private projectCardPoint(u: number, topV: number, frame: { relativePosition: number; centerX: number; top: number; width: number; height: number }): Point {
        const worldPerPixel = (2 * Math.tan((CAMERA_FOV * Math.PI) / 360) * CAMERA_Z) / this.height;
        const widthWorld = frame.width * worldPerPixel;
        const heightWorld = frame.height * worldPerPixel;
        const centerYInPixels = frame.top + frame.height / 2;
        const projectedCenterWorldX = (frame.centerX - this.width / 2) * worldPerPixel;
        const centerWorldY = -(centerYInPixels - this.height / 2) * worldPerPixel;
        const relativeDistance = Math.abs(frame.relativePosition);
        const sideSign = frame.relativePosition < 0 ? -1 : 1;
        const deformationDistance = Math.min(relativeDistance, 1.28);
        const galleryDepth = getGalleryDepth(frame.relativePosition);
        const centerWorldX = projectedCenterWorldX * ((CAMERA_Z + galleryDepth) / CAMERA_Z);
        const angleProgress = smoothstep(0, 1.28, deformationDistance);
        const galleryAngle = sideSign * 1.34 * angleProgress * angleProgress;
        const sideAmount = smoothstep(0.28, 1.15, deformationDistance);
        const uvY = 1 - topV;
        const vertical = (uvY - 0.5) * 2;
        const waistProfile = 1 - Math.pow(Math.abs(vertical), 1.45);
        const waistScale = 1 - sideAmount * waistProfile * 0.24;
        const localX = (u - 0.5) * widthWorld;
        const localY = (0.5 - topV) * heightWorld;
        const wringShear = sideSign * vertical * sideAmount * 0.11;
        const wrungX = localX * waistScale + wringShear;
        let wrungZ = -localX * vertical * sideSign * sideAmount * 0.075;
        wrungZ += Math.sin(u * Math.PI) * widthWorld * 0.115 * (1 - sideAmount);
        const cosAngle = Math.cos(galleryAngle);
        const sinAngle = Math.sin(galleryAngle);
        const rotatedX = wrungX * cosAngle + wrungZ * sinAngle;
        const rotatedZ = -wrungX * sinAngle + wrungZ * cosAngle;

        return this.projectWorld(centerWorldX + rotatedX, centerWorldY + localY, -galleryDepth + rotatedZ);
    }

    private drawCardLayer(frame: { project: CanvasProject; relativePosition: number; centerX: number; top: number; width: number; height: number; visible: boolean }) {
        const blurStrength = smoothstep(0.35, 1.65, Math.abs(frame.relativePosition));

        if (blurStrength <= 0.01) {
            this.drawCard(this.context, frame);
            return;
        }

        const scaleX = this.cardCanvas.width / this.width;
        const scaleY = this.cardCanvas.height / this.height;
        this.cardContext.setTransform(1, 0, 0, 1, 0, 0);
        this.cardContext.clearRect(0, 0, this.cardCanvas.width, this.cardCanvas.height);
        this.cardContext.setTransform(scaleX, 0, 0, scaleY, 0, 0);
        this.drawCard(this.cardContext, frame);

        this.context.save();
        this.context.filter = `blur(${(blurStrength * 3.8).toFixed(2)}px)`;
        this.context.drawImage(this.cardCanvas, 0, 0, this.width, this.height);
        this.context.restore();
    }

    private drawCard(context: CanvasRenderingContext2D, frame: { project: CanvasProject; relativePosition: number; centerX: number; top: number; width: number; height: number; visible: boolean }) {
        const image = this.images.get(frame.project.image);
        if (!image?.complete || !image.naturalWidth || !image.naturalHeight) return;

        const planeAspect = frame.width / frame.height;
        const imageAspect = image.naturalWidth / image.naturalHeight;
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = image.naturalWidth;
        let sourceHeight = image.naturalHeight;

        if (imageAspect > planeAspect) {
            sourceWidth = image.naturalHeight * planeAspect;
            sourceX = (image.naturalWidth - sourceWidth) / 2;
        } else {
            sourceHeight = image.naturalWidth / planeAspect;
            sourceY = (image.naturalHeight - sourceHeight) / 2;
        }

        const points: Point[][] = [];
        for (let row = 0; row <= CARD_ROWS; row++) {
            const line: Point[] = [];
            for (let column = 0; column <= CARD_COLUMNS; column++) {
                line.push(this.projectCardPoint(column / CARD_COLUMNS, row / CARD_ROWS, frame));
            }
            points.push(line);
        }

        context.save();
        this.traceRoundedCard(context, frame);
        context.clip();

        for (let row = 0; row < CARD_ROWS; row++) {
            for (let column = 0; column < CARD_COLUMNS; column++) {
                const u0 = column / CARD_COLUMNS;
                const u1 = (column + 1) / CARD_COLUMNS;
                const v0 = row / CARD_ROWS;
                const v1 = (row + 1) / CARD_ROWS;
                const sourceTopLeft = { x: sourceX + u0 * sourceWidth, y: sourceY + v0 * sourceHeight };
                const sourceTopRight = { x: sourceX + u1 * sourceWidth, y: sourceY + v0 * sourceHeight };
                const sourceBottomLeft = { x: sourceX + u0 * sourceWidth, y: sourceY + v1 * sourceHeight };
                const sourceBottomRight = { x: sourceX + u1 * sourceWidth, y: sourceY + v1 * sourceHeight };

                drawTexturedTriangle(context, image, [sourceTopLeft, sourceTopRight, sourceBottomRight], [points[row][column], points[row][column + 1], points[row + 1][column + 1]]);
                drawTexturedTriangle(context, image, [sourceTopLeft, sourceBottomRight, sourceBottomLeft], [points[row][column], points[row + 1][column + 1], points[row + 1][column]]);
            }
        }
        context.restore();
    }

    private traceRoundedCard(context: CanvasRenderingContext2D, frame: { relativePosition: number; centerX: number; top: number; width: number; height: number }) {
        const radius = Math.min(frame.width, frame.height) * 0.034;
        const radiusU = radius / frame.width;
        const radiusV = radius / frame.height;
        const corners = [
            { centerU: radiusU, centerV: radiusV, start: Math.PI, end: Math.PI * 1.5 },
            { centerU: 1 - radiusU, centerV: radiusV, start: Math.PI * 1.5, end: Math.PI * 2 },
            { centerU: 1 - radiusU, centerV: 1 - radiusV, start: 0, end: Math.PI * 0.5 },
            { centerU: radiusU, centerV: 1 - radiusV, start: Math.PI * 0.5, end: Math.PI },
        ];

        context.beginPath();
        let first = true;
        corners.forEach((corner) => {
            for (let step = 0; step <= 5; step++) {
                const angle = corner.start + (corner.end - corner.start) * (step / 5);
                const point = this.projectCardPoint(corner.centerU + Math.cos(angle) * radiusU, corner.centerV + Math.sin(angle) * radiusV, frame);
                if (first) {
                    context.moveTo(point.x, point.y);
                    first = false;
                } else {
                    context.lineTo(point.x, point.y);
                }
            }
        });
        context.closePath();
    }

    private drawGrid(context: CanvasRenderingContext2D) {
        const minX = -32;
        const maxX = 32;
        const frontZ = 6;
        const backZ = -52;
        const floorY = -2.58;
        const curvedPoint = (x: number, z: number) => {
            const normalizedX = clamp(x / 30, -1, 1);
            const curve = normalizedX * normalizedX;
            return {
                point: this.projectWorld(x, floorY - curve * 0.72, z - curve * 1.75),
                alpha: 0.20 * (1 - smoothstep(8, 42, -(z - curve * 1.75))) * (1 - smoothstep(0.72, 1, Math.abs(normalizedX))),
            };
        };

        context.lineWidth = 1;
        for (let x = minX; x <= maxX; x += 1.35) {
            for (let segment = 0; segment < 42; segment++) {
                const z0 = frontZ + (backZ - frontZ) * (segment / 42);
                const z1 = frontZ + (backZ - frontZ) * ((segment + 1) / 42);
                const start = curvedPoint(x, z0);
                const end = curvedPoint(x, z1);
                this.strokeSegment(context, start.point, end.point, (start.alpha + end.alpha) / 2);
            }
        }

        for (let z = frontZ; z >= backZ; z -= 1.22) {
            for (let segment = 0; segment < 64; segment++) {
                const x0 = minX + (maxX - minX) * (segment / 64);
                const x1 = minX + (maxX - minX) * ((segment + 1) / 64);
                const start = curvedPoint(x0, z);
                const end = curvedPoint(x1, z);
                this.strokeSegment(context, start.point, end.point, (start.alpha + end.alpha) / 2);
            }
        }

        this.strokeSegment(context, this.projectWorld(-32.5, -2.53, -25), this.projectWorld(32.5, -2.53, -25), 0.24);
    }

    private strokeSegment(
        context: CanvasRenderingContext2D,
        start: Point,
        end: Point,
        alpha: number,
    ) {
        if (alpha <= 0.001) return;
        context.strokeStyle = `rgba(133, 133, 133, ${alpha})`;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
    }
}
