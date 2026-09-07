import {
    GEO_COORDINATE_SCALE,
    WORLD_COASTLINES,
    WORLD_COUNTRY_BOUNDARIES,
    WORLD_LAND_HATCHES,
} from "./worldGeography";

export interface EarthLocation {
    id: string;
    title: string;
    lines: string[];
    lat: number;
    lng: number;
    side: "left" | "right";
}

export interface LabelBinding {
    location: EarthLocation;
    element: HTMLDivElement;
}

interface GlobeRoute {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
}

interface PointAttributes {
    plane: Float32Array;
    sphere: Float32Array;
    sizes: Float32Array;
    seeds: Float32Array;
    flowSpeeds: Float32Array;
    seedPhases: Float32Array;
}

interface Polyline3D {
    points: Float32Array;
}

interface DotGlobeReferenceCanvasOptions {
    canvas: HTMLCanvasElement;
    labels: LabelBinding[];
}

const CAMERA_Z = 10;
const CAMERA_FOV_DEG = 45;
const TAU = Math.PI * 2;
const DEG_TO_RAD = Math.PI / 180;

const ROUTES: GlobeRoute[] = [
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 41.9028,
        endLng: 12.4964,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 40.4168,
        endLng: -3.7038,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 37.9838,
        endLng: 23.7275,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 51.5072,
        endLng: -0.1276,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 52.52,
        endLng: 13.405,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 48.8566,
        endLng: 2.3522,
    },
];

const DOT_COLORS = [
    "rgb(174 184 184)",
    "rgb(127 157 155)",
    "rgb(82 128 125)",
    "rgb(41 91 88)",
    "rgb(6 65 62)",
];

const ALPHA_LEVELS = [0.28, 0.45, 0.66];
const COLOR_BUCKETS = DOT_COLORS.length;
const ALPHA_BUCKETS = ALPHA_LEVELS.length;
const BUCKET_COUNT = COLOR_BUCKETS * ALPHA_BUCKETS;

const GEO_HATCH_RGB = "137, 160, 178";
const GEO_BOUNDARY_RGB = "102, 132, 154";
const GEO_COAST_RGB = "83, 119, 146";
const GEO_SURFACE_RGB = "151, 171, 186";

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
    return start + (end - start) * progress;
}

function smoothstep(edge0: number, edge1: number, value: number) {
    const normalized = clamp(
        (value - edge0) / Math.max(edge1 - edge0, 0.00001),
        0,
        1,
    );

    return normalized * normalized * (3 - 2 * normalized);
}

function damp(
    current: number,
    target: number,
    lambda: number,
    deltaSeconds: number,
) {
    return lerp(
        current,
        target,
        1 - Math.exp(-lambda * Math.max(deltaSeconds, 0)),
    );
}

function positiveModulo(value: number, divisor: number) {
    return ((value % divisor) + divisor) % divisor;
}

function seededRandom(index: number, offset = 0) {
    const value =
        Math.sin(index * 12.9898 + offset * 78.233) *
        43758.5453123;

    return value - Math.floor(value);
}

function getViewportWorldSize(width: number, height: number) {
    const safeHeight = Math.max(height, 1);
    const aspect = Math.max(width, 1) / safeHeight;
    const fovRadians = CAMERA_FOV_DEG * DEG_TO_RAD;
    const worldHeight =
        2 * CAMERA_Z * Math.tan(fovRadians * 0.5);

    return {
        width: worldHeight * aspect,
        height: worldHeight,
    };
}

function getFocalLengthPixels(height: number) {
    const fovRadians = CAMERA_FOV_DEG * DEG_TO_RAD;

    return (
        Math.max(height, 1) /
        (2 * Math.tan(fovRadians * 0.5))
    );
}

function getGlobeRadiusWorld(
    viewportHeight: number,
    isMobile: boolean,
) {
    /*
     * The reference globe is intentionally dominant. This is slightly
     * larger than dot-globe-lite while keeping the same camera model.
     */
    return Math.min(
        viewportHeight * (isMobile ? 0.34 : 0.41),
        isMobile ? 2.55 : 3.45,
    );
}

function getProjectedWorldRadiusPixels(
    radiusWorld: number,
    height: number,
) {
    return (
        (radiusWorld * getFocalLengthPixels(height)) / CAMERA_Z
    );
}

function latLngToXYZ(lat: number, lng: number, radius: number) {
    const phi = (90 - lat) * DEG_TO_RAD;
    const theta = (lng + 180) * DEG_TO_RAD;

    return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
    };
}

function createPointAttributes(
    count: number,
    width: number,
    height: number,
    sphereRadius: number,
): PointAttributes {
    const plane = new Float32Array(count * 3);
    const sphere = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    const flowSpeeds = new Float32Array(count);
    const seedPhases = new Float32Array(count);

    const aspect = width / Math.max(height, 0.00001);
    const columns = Math.ceil(Math.sqrt(count * aspect));
    const rows = Math.ceil(count / columns);
    const stepX = width / Math.max(columns - 1, 1);
    const stepY = height / Math.max(rows - 1, 1);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const permutation = 3571;

    for (let index = 0; index < count; index += 1) {
        const row = Math.floor(index / columns);
        const column = index % columns;

        const randomX = seededRandom(index, 1) - 0.5;
        const randomY = seededRandom(index, 2) - 0.5;
        const randomZ = seededRandom(index, 3) - 0.5;

        plane[index * 3] =
            -width * 0.5 +
            column * stepX +
            randomX * stepX * 0.34;
        plane[index * 3 + 1] =
            height * 0.5 -
            row * stepY +
            randomY * stepY * 0.34;
        plane[index * 3 + 2] = randomZ * 0.08;

        const sphereIndex = (index * permutation) % count;
        const normalized =
            count <= 1 ? 0 : sphereIndex / (count - 1);
        const sphereY = 1 - normalized * 2;
        const horizontalRadius = Math.sqrt(
            Math.max(0, 1 - sphereY * sphereY),
        );
        const angle = goldenAngle * sphereIndex;

        const radiusVariation = lerp(
            0.97,
            1.015,
            seededRandom(index, 4),
        );
        const radius = sphereRadius * radiusVariation;

        sphere[index * 3] =
            Math.cos(angle) * horizontalRadius * radius;
        sphere[index * 3 + 1] = sphereY * radius;
        sphere[index * 3 + 2] =
            Math.sin(angle) * horizontalRadius * radius;

        sizes[index] = lerp(
            1.45,
            7.15,
            seededRandom(index, 5),
        );

        const seed = seededRandom(index, 6);
        seeds[index] = seed;
        flowSpeeds[index] = lerp(0.94, 1.06, seed);
        seedPhases[index] = seed * Math.PI;
    }

    return {
        plane,
        sphere,
        sizes,
        seeds,
        flowSpeeds,
        seedPhases,
    };
}

function normalizeXYZ(x: number, y: number, z: number) {
    const length = Math.hypot(x, y, z) || 1;

    return {
        x: x / length,
        y: y / length,
        z: z / length,
    };
}

function slerpUnitVectors(
    startX: number,
    startY: number,
    startZ: number,
    endX: number,
    endY: number,
    endZ: number,
    progress: number,
) {
    const dot = clamp(
        startX * endX + startY * endY + startZ * endZ,
        -1,
        1,
    );

    if (dot > 0.9995) {
        return normalizeXYZ(
            lerp(startX, endX, progress),
            lerp(startY, endY, progress),
            lerp(startZ, endZ, progress),
        );
    }

    const theta = Math.acos(dot);
    const sinTheta = Math.sin(theta);

    if (Math.abs(sinTheta) < 0.00001) {
        return normalizeXYZ(
            lerp(startX, endX, progress),
            lerp(startY, endY, progress),
            lerp(startZ, endZ, progress),
        );
    }

    const startWeight =
        Math.sin((1 - progress) * theta) / sinTheta;
    const endWeight =
        Math.sin(progress * theta) / sinTheta;

    return normalizeXYZ(
        startX * startWeight + endX * endWeight,
        startY * startWeight + endY * endWeight,
        startZ * startWeight + endZ * endWeight,
    );
}

function createGlobeGridPolylines(radius: number): Polyline3D[] {
    const polylines: Polyline3D[] = [];
    const segments = 96;
    const latitudes = [-60, -30, 0, 30, 60];

    for (const latitude of latitudes) {
        const points = new Float32Array((segments + 1) * 3);

        for (let index = 0; index <= segments; index += 1) {
            const lng = -180 + (index / segments) * 360;
            const point = latLngToXYZ(latitude, lng, radius);
            const offset = index * 3;

            points[offset] = point.x;
            points[offset + 1] = point.y;
            points[offset + 2] = point.z;
        }

        polylines.push({ points });
    }

    const longitudes = [
        -150,
        -120,
        -90,
        -60,
        -30,
        0,
        30,
        60,
        90,
        120,
        150,
        180,
    ];

    for (const longitude of longitudes) {
        const points = new Float32Array((segments + 1) * 3);

        for (let index = 0; index <= segments; index += 1) {
            const lat = -90 + (index / segments) * 180;
            const point = latLngToXYZ(lat, longitude, radius);
            const offset = index * 3;

            points[offset] = point.x;
            points[offset + 1] = point.y;
            points[offset + 2] = point.z;
        }

        polylines.push({ points });
    }

    return polylines;
}

function createSurfaceLatitudePolylines(radius: number): Polyline3D[] {
    const polylines: Polyline3D[] = [];
    const longitudeStep = 3;

    for (let latitude = -81; latitude <= 81; latitude += 4.5) {
        const pointCount = Math.floor(360 / longitudeStep) + 1;
        const points = new Float32Array(pointCount * 3);

        for (let index = 0; index < pointCount; index += 1) {
            const lng = -180 + index * longitudeStep;
            const point = latLngToXYZ(latitude, lng, radius);
            const offset = index * 3;

            points[offset] = point.x;
            points[offset + 1] = point.y;
            points[offset + 2] = point.z;
        }

        polylines.push({ points });
    }

    return polylines;
}

function createRoutePolylines(
    routes: GlobeRoute[],
    radius: number,
): Polyline3D[] {
    const segmentsPerRoute = 64;

    return routes.map((route) => {
        const startRaw = latLngToXYZ(
            route.startLat,
            route.startLng,
            1,
        );
        const endRaw = latLngToXYZ(
            route.endLat,
            route.endLng,
            1,
        );
        const start = normalizeXYZ(
            startRaw.x,
            startRaw.y,
            startRaw.z,
        );
        const end = normalizeXYZ(
            endRaw.x,
            endRaw.y,
            endRaw.z,
        );

        const points = new Float32Array(
            (segmentsPerRoute + 1) * 3,
        );

        for (
            let index = 0;
            index <= segmentsPerRoute;
            index += 1
        ) {
            const progress = index / segmentsPerRoute;
            const direction = slerpUnitVectors(
                start.x,
                start.y,
                start.z,
                end.x,
                end.y,
                end.z,
                progress,
            );
            const lift =
                Math.sin(Math.PI * progress) * radius * 0.12;
            const distance = radius + lift;
            const offset = index * 3;

            points[offset] = direction.x * distance;
            points[offset + 1] = direction.y * distance;
            points[offset + 2] = direction.z * distance;
        }

        return { points };
    });
}

function convertGeoPolylines(
    source: number[][],
    radius: number,
    stride = 1,
): Polyline3D[] {
    const result: Polyline3D[] = [];

    for (let lineIndex = 0; lineIndex < source.length; lineIndex += stride) {
        const line = source[lineIndex];
        const pairCount = Math.floor(line.length / 2);

        if (pairCount < 2) {
            continue;
        }

        const points = new Float32Array(pairCount * 3);

        for (let index = 0; index < pairCount; index += 1) {
            const lng = line[index * 2] * GEO_COORDINATE_SCALE;
            const lat = line[index * 2 + 1] * GEO_COORDINATE_SCALE;
            const point = latLngToXYZ(lat, lng, radius);
            const offset = index * 3;

            points[offset] = point.x;
            points[offset + 1] = point.y;
            points[offset + 2] = point.z;
        }

        result.push({ points });
    }

    return result;
}

export default class DotGlobeReferenceCanvasRenderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly labels: LabelBinding[];

    private width = 1;
    private height = 1;
    private dpr = 1;
    private viewportWorldWidth = 1;
    private viewportWorldHeight = 1;
    private globeRadius = 1;
    private focalPixels = 1;

    private points: PointAttributes = createPointAttributes(1, 1, 1, 1);
    private transitionGridLines: Polyline3D[] = [];
    private routeLines: Polyline3D[] = [];
    private surfaceLines: Polyline3D[] = [];
    private geographyHatches: Polyline3D[] = [];
    private geographyBoundaries: Polyline3D[] = [];
    private geographyCoastlines: Polyline3D[] = [];

    private projectedX = new Float32Array(1);
    private projectedY = new Float32Array(1);
    private projectedRadius = new Float32Array(1);
    private bucketIndices: Int32Array[] = [];
    private bucketCounts = new Uint32Array(BUCKET_COUNT);

    private targetProgress = 0;
    private currentProgress = 0;

    private targetPointerX = 0;
    private targetPointerY = 0;
    private targetPointerActive = 0;
    private currentPointerX = 0;
    private currentPointerY = 0;
    private currentPointerActive = 0;

    private targetOrbitYaw = 0;
    private targetOrbitPitch = 0;
    private currentOrbitYaw = 0;
    private currentOrbitPitch = 0;
    private dragging = false;

    private visible = true;
    private reducedMotion = false;
    private destroyed = false;

    private rafId: number | null = null;
    private timerId: number | null = null;
    private lastTimestamp = 0;
    private lastDrawTimestamp = 0;
    private targetFrameInterval = 1000 / 60;

    constructor(options: DotGlobeReferenceCanvasOptions) {
        this.canvas = options.canvas;
        this.labels = options.labels;

        const context = this.canvas.getContext("2d", {
            alpha: true,
            desynchronized: true,
        });

        if (!context) {
            throw new Error(
                "DotGlobeReference: Canvas 2D context unavailable.",
            );
        }

        this.context = context;
        this.configurePerformanceTier();
    }

    public resize(width: number, height: number) {
        const safeWidth = Math.max(Math.round(width), 1);
        const safeHeight = Math.max(Math.round(height), 1);

        if (
            safeWidth === this.width &&
            safeHeight === this.height
        ) {
            return;
        }

        this.width = safeWidth;
        this.height = safeHeight;

        const lowPower = this.isLowPowerDevice();
        const dprCap = lowPower ? 1.1 : 1.35;
        this.dpr = Math.min(window.devicePixelRatio || 1, dprCap);

        this.canvas.width = Math.max(
            1,
            Math.round(this.width * this.dpr),
        );
        this.canvas.height = Math.max(
            1,
            Math.round(this.height * this.dpr),
        );
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        const viewport = getViewportWorldSize(
            this.width,
            this.height,
        );
        this.viewportWorldWidth = viewport.width;
        this.viewportWorldHeight = viewport.height;
        this.focalPixels = getFocalLengthPixels(this.height);

        const isMobile = this.width < 768;
        this.globeRadius = getGlobeRadiusWorld(
            this.viewportWorldHeight,
            isMobile,
        );

        const pointCount = this.getParticleCount();
        this.points = createPointAttributes(
            pointCount,
            this.viewportWorldWidth * 1.18,
            this.viewportWorldHeight * 1.22,
            this.globeRadius,
        );

        this.transitionGridLines = createGlobeGridPolylines(
            this.globeRadius * 1.006,
        );
        this.routeLines = createRoutePolylines(
            ROUTES,
            this.globeRadius * 1.014,
        );
        this.surfaceLines = createSurfaceLatitudePolylines(
            this.globeRadius * 1.002,
        );

        const hatchStride = lowPower || isMobile ? 2 : 1;
        this.geographyHatches = convertGeoPolylines(
            WORLD_LAND_HATCHES,
            this.globeRadius * 1.003,
            hatchStride,
        );
        this.geographyBoundaries = convertGeoPolylines(
            WORLD_COUNTRY_BOUNDARIES,
            this.globeRadius * 1.008,
        );
        this.geographyCoastlines = convertGeoPolylines(
            WORLD_COASTLINES,
            this.globeRadius * 1.012,
        );

        this.allocateProjectionBuffers(pointCount);
        this.wake();
    }

    public setProgress(progress: number) {
        this.targetProgress = clamp(progress, 0, 1);
        this.wake();
    }

    public setPointer(x: number, y: number, active: number) {
        this.targetPointerX = clamp(x, -1.5, 1.5);
        this.targetPointerY = clamp(y, -1.5, 1.5);
        this.targetPointerActive = clamp(active, 0, 1);
        this.wake();
    }

    public setOrbit(
        yaw: number,
        pitch: number,
        dragging: boolean,
    ) {
        this.targetOrbitYaw = yaw;
        this.targetOrbitPitch = clamp(pitch, -0.72, 0.72);
        this.dragging = dragging;
        this.wake();
    }

    public setVisible(visible: boolean) {
        this.visible = visible;

        if (!visible) {
            this.cancelScheduledFrame();
            return;
        }

        this.wake();
    }

    public setReducedMotion(reducedMotion: boolean) {
        this.reducedMotion = reducedMotion;

        if (reducedMotion) {
            this.targetProgress = 1;
            this.currentProgress = 1;
            this.targetPointerActive = 0;
            this.currentPointerActive = 0;
            this.targetOrbitPitch = 0;
            this.currentOrbitPitch = 0;
        }

        this.wake();
    }

    public wake() {
        if (
            this.destroyed ||
            !this.visible ||
            this.rafId !== null ||
            this.timerId !== null
        ) {
            return;
        }

        this.rafId = window.requestAnimationFrame(this.handleFrame);
    }

    public destroy() {
        this.destroyed = true;
        this.cancelScheduledFrame();

        for (const binding of this.labels) {
            binding.element.style.opacity = "0";
            binding.element.style.visibility = "hidden";
        }
    }

    private readonly handleFrame = (timestamp: number) => {
        this.rafId = null;

        if (this.destroyed || !this.visible) {
            return;
        }

        const elapsed =
            this.lastTimestamp === 0
                ? 1 / 60
                : Math.min(
                    (timestamp - this.lastTimestamp) / 1000,
                    0.05,
                );
        this.lastTimestamp = timestamp;

        const sinceLastDraw = timestamp - this.lastDrawTimestamp;
        if (sinceLastDraw + 0.5 < this.targetFrameInterval) {
            this.scheduleNext(
                Math.max(
                    this.targetFrameInterval - sinceLastDraw,
                    1,
                ),
            );
            return;
        }

        this.lastDrawTimestamp = timestamp;
        this.updateSmoothedState(elapsed);
        this.render(timestamp * 0.001);

        if (this.shouldContinueRendering()) {
            this.scheduleNext(this.targetFrameInterval);
        }
    };

    private scheduleNext(delayMs: number) {
        if (
            this.destroyed ||
            !this.visible ||
            this.rafId !== null ||
            this.timerId !== null
        ) {
            return;
        }

        if (delayMs <= 5) {
            this.rafId = window.requestAnimationFrame(this.handleFrame);
            return;
        }

        this.timerId = window.setTimeout(() => {
            this.timerId = null;

            if (this.destroyed || !this.visible) {
                return;
            }

            this.rafId = window.requestAnimationFrame(this.handleFrame);
        }, delayMs);
    }

    private cancelScheduledFrame() {
        if (this.rafId !== null) {
            window.cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }

        if (this.timerId !== null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    }

    private updateSmoothedState(delta: number) {
        if (this.reducedMotion) {
            this.currentProgress = this.targetProgress;
            this.currentPointerX = this.targetPointerX;
            this.currentPointerY = this.targetPointerY;
            this.currentPointerActive = 0;
            this.currentOrbitYaw = this.targetOrbitYaw;
            this.currentOrbitPitch = 0;
            return;
        }

        this.currentProgress = damp(
            this.currentProgress,
            this.targetProgress,
            6.5,
            delta,
        );
        this.currentPointerX = damp(
            this.currentPointerX,
            this.targetPointerX,
            7,
            delta,
        );
        this.currentPointerY = damp(
            this.currentPointerY,
            this.targetPointerY,
            7,
            delta,
        );
        this.currentPointerActive = damp(
            this.currentPointerActive,
            this.targetPointerActive,
            10,
            delta,
        );
        this.currentOrbitYaw = damp(
            this.currentOrbitYaw,
            this.targetOrbitYaw,
            10,
            delta,
        );
        this.currentOrbitPitch = damp(
            this.currentOrbitPitch,
            this.targetOrbitPitch,
            10,
            delta,
        );
    }

    private render(timeSeconds: number) {
        const ctx = this.context;

        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.clearRect(0, 0, this.width, this.height);

        const progress = this.currentProgress;
        const morph = smoothstep(0.22, 0.68, progress);
        const finalReveal = smoothstep(0.72, 0.95, progress);
        const geographyReveal = this.reducedMotion
            ? 1
            : smoothstep(0.62, 0.88, progress);
        const particleOpacity = this.reducedMotion
            ? 0
            : 1 - smoothstep(0.70, 0.92, progress);

        const originalBaseRotationY = lerp(-0.68, 0.22, progress);
        const referencePoseBlend = smoothstep(0.58, 0.90, progress);
        const baseRotationY = lerp(
            originalBaseRotationY,
            -0.55,
            referencePoseBlend,
        );
        const baseRotationX = 0.42 * referencePoseBlend;

        const pointerRotationY =
            this.currentPointerX *
            0.11 *
            this.currentPointerActive;
        const pointerRotationX =
            -this.currentPointerY *
            0.065 *
            this.currentPointerActive;

        const rotationY =
            baseRotationY +
            pointerRotationY +
            this.currentOrbitYaw;
        const rotationX =
            baseRotationX +
            pointerRotationX +
            this.currentOrbitPitch;

        const transitionGridOpacity =
            smoothstep(0.62, 0.84, progress) *
            (1 - smoothstep(0.74, 0.91, progress));
        const routeOpacity =
            smoothstep(0.76, 0.92, progress) *
            (1 - smoothstep(0.82, 0.96, progress));

        if (transitionGridOpacity > 0.001) {
            this.drawFrontPolylines(
                this.transitionGridLines,
                rotationX,
                rotationY,
                "49, 95, 93",
                transitionGridOpacity * 0.24,
                0.9,
                -0.08,
            );
        }

        if (particleOpacity > 0.001) {
            this.prepareParticles(
                timeSeconds,
                morph,
                finalReveal,
                rotationX * morph,
                rotationY * morph,
            );
            this.drawPreparedParticles(particleOpacity);
        }

        if (routeOpacity > 0.001) {
            this.drawFrontPolylines(
                this.routeLines,
                rotationX,
                rotationY,
                "102, 203, 197",
                routeOpacity * 0.72,
                1,
                -0.05,
            );
        }

        if (geographyReveal > 0.001) {
            this.drawReferenceGeography(
                rotationX,
                rotationY,
                geographyReveal,
            );
        }

        this.updateLabels(rotationX, rotationY, geographyReveal);
    }

    private prepareParticles(
        timeSeconds: number,
        morph: number,
        finalReveal: number,
        rotationX: number,
        rotationY: number,
    ) {
        const {
            plane,
            sphere,
            sizes,
            seeds,
            flowSpeeds,
            seedPhases,
        } = this.points;

        this.bucketCounts.fill(0);

        const count = sizes.length;
        const fieldHeight = Math.max(
            this.viewportWorldHeight * 1.22,
            0.0001,
        );
        const halfFieldHeight = fieldHeight * 0.5;
        const halfViewportX = Math.max(
            this.viewportWorldWidth * 0.5,
            0.0001,
        );
        const halfViewportY = Math.max(
            this.viewportWorldHeight * 0.5,
            0.0001,
        );
        const aspect =
            this.viewportWorldWidth /
            Math.max(this.viewportWorldHeight, 0.0001);
        const globalWaveStrength =
            (1 - morph) *
            lerp(
                0.055,
                0.22,
                smoothstep(0, 0.4, this.currentProgress),
            );

        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);

        for (let index = 0; index < count; index += 1) {
            const offset = index * 3;
            const seed = seeds[index];

            let planeX = plane[offset];
            let planeY =
                plane[offset + 1] -
                this.currentProgress *
                    fieldHeight *
                    1.45 *
                    flowSpeeds[index];

            planeY =
                positiveModulo(
                    planeY + halfFieldHeight,
                    fieldHeight,
                ) - halfFieldHeight;

            const scrollWave1 = Math.sin(
                planeX * 0.72 +
                    planeY * 0.22 +
                    this.currentProgress * 9 +
                    timeSeconds * 0.18,
            );
            const scrollWave2 = Math.sin(
                planeX * 0.23 -
                    planeY * 0.82 -
                    this.currentProgress * 6.5 +
                    seedPhases[index],
            );
            const globalWave =
                scrollWave1 * 0.65 + scrollWave2 * 0.35;

            let planeZ =
                plane[offset + 2] +
                globalWave * globalWaveStrength;

            const pointNdcX = planeX / halfViewportX;
            const pointNdcY = planeY / halfViewportY;
            let mouseDeltaX = pointNdcX - this.currentPointerX;
            const mouseDeltaY = pointNdcY - this.currentPointerY;
            mouseDeltaX *= aspect;

            const mouseDistance = Math.hypot(
                mouseDeltaX,
                mouseDeltaY,
            );
            const influence =
                (1 - smoothstep(0, 0.34, mouseDistance)) *
                this.currentPointerActive *
                (1 - morph);

            const cursorRipple =
                Math.sin(
                    mouseDistance * 18 - timeSeconds * 1.35,
                ) * influence;

            planeZ += influence * 0.28;
            planeZ += cursorRipple * 0.055;

            const directionLength = Math.hypot(
                mouseDeltaX,
                mouseDeltaY,
            );

            if (directionLength > 0.0001) {
                planeX +=
                    (mouseDeltaX / directionLength) *
                    influence *
                    0.025;
                planeY +=
                    (mouseDeltaY / directionLength) *
                    influence *
                    0.025;
            }

            let sphereX = sphere[offset];
            let sphereY = sphere[offset + 1];
            let sphereZ = sphere[offset + 2];

            const sphereLength = Math.max(
                Math.hypot(sphereX, sphereY, sphereZ),
                0.0001,
            );
            const sphereNoise =
                Math.sin(timeSeconds * 0.3 + seed * 18) *
                0.018 *
                morph *
                (1 - finalReveal);
            const sphereNoiseScale =
                1 + sphereNoise / sphereLength;

            sphereX *= sphereNoiseScale;
            sphereY *= sphereNoiseScale;
            sphereZ *= sphereNoiseScale;

            const transformedX = lerp(planeX, sphereX, morph);
            const transformedY = lerp(planeY, sphereY, morph);
            const transformedZ = lerp(planeZ, sphereZ, morph);

            const yawX =
                transformedX * cosY + transformedZ * sinY;
            const yawZ =
                -transformedX * sinY + transformedZ * cosY;
            const rotatedY =
                transformedY * cosX - yawZ * sinX;
            const rotatedZ =
                transformedY * sinX + yawZ * cosX;

            const depth = Math.max(CAMERA_Z - rotatedZ, 0.5);
            const perspectivePixels = this.focalPixels / depth;
            const screenX =
                this.width * 0.5 + yawX * perspectivePixels;
            const screenY =
                this.height * 0.5 - rotatedY * perspectivePixels;

            if (
                screenX < -20 ||
                screenX > this.width + 20 ||
                screenY < -20 ||
                screenY > this.height + 20
            ) {
                continue;
            }

            const perspective = CAMERA_Z / depth;
            const cursorSize = 1 + influence * 1.9;
            const depthSize =
                1 + clamp(rotatedZ * 0.13, -0.22, 0.5);
            const sphereSize = lerp(1, 1.15, morph);
            const radius = Math.max(
                0.5,
                sizes[index] *
                    cursorSize *
                    depthSize *
                    sphereSize *
                    perspective *
                    0.5,
            );

            const baseAlpha = lerp(
                0.42 + influence * 0.2,
                lerp(0.68, 0.28, finalReveal),
                morph,
            );

            const randomWeight = smoothstep(0.25, 0.95, seed);
            const depthWeight = smoothstep(-0.3, 0.55, rotatedZ);
            const waveWeight = smoothstep(-0.15, 0.85, globalWave);

            let darkWeight =
                randomWeight * 0.3 +
                depthWeight * 0.32 +
                waveWeight * 0.22 +
                influence * 0.42;
            darkWeight = clamp(darkWeight, 0, 1);

            const finalDarkness = clamp(
                lerp(
                    darkWeight,
                    lerp(1, 0.58, finalReveal),
                    morph,
                ),
                0,
                1,
            );

            const colorBucket = Math.min(
                COLOR_BUCKETS - 1,
                Math.floor(finalDarkness * COLOR_BUCKETS),
            );
            const alphaBucket =
                baseAlpha < 0.38 ? 0 : baseAlpha < 0.56 ? 1 : 2;
            const bucket =
                alphaBucket * COLOR_BUCKETS + colorBucket;
            const bucketOffset = this.bucketCounts[bucket];

            this.bucketIndices[bucket][bucketOffset] = index;
            this.bucketCounts[bucket] += 1;

            this.projectedX[index] = screenX;
            this.projectedY[index] = screenY;
            this.projectedRadius[index] = radius;
        }
    }

    private drawPreparedParticles(layerOpacity: number) {
        const ctx = this.context;

        for (
            let alphaBucket = 0;
            alphaBucket < ALPHA_BUCKETS;
            alphaBucket += 1
        ) {
            for (
                let colorBucket = 0;
                colorBucket < COLOR_BUCKETS;
                colorBucket += 1
            ) {
                const bucket =
                    alphaBucket * COLOR_BUCKETS + colorBucket;
                const bucketCount = this.bucketCounts[bucket];

                if (bucketCount === 0) {
                    continue;
                }

                ctx.beginPath();

                const indices = this.bucketIndices[bucket];
                for (
                    let offset = 0;
                    offset < bucketCount;
                    offset += 1
                ) {
                    const index = indices[offset];
                    const radius = this.projectedRadius[index];

                    ctx.moveTo(
                        this.projectedX[index] + radius,
                        this.projectedY[index],
                    );
                    ctx.arc(
                        this.projectedX[index],
                        this.projectedY[index],
                        radius,
                        0,
                        TAU,
                    );
                }

                ctx.fillStyle = DOT_COLORS[colorBucket];
                ctx.globalAlpha =
                    ALPHA_LEVELS[alphaBucket] * layerOpacity;
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;
    }

    private drawReferenceGeography(
        rotationX: number,
        rotationY: number,
        reveal: number,
    ) {
        /*
         * Reference look:
         * - very light spherical scanlines
         * - denser horizontal land hatching
         * - country/coast outlines slightly stronger
         * - no back-side geometry
         */
        this.drawFrontPolylines(
            this.surfaceLines,
            rotationX,
            rotationY,
            GEO_SURFACE_RGB,
            reveal * 0.055,
            0.55,
            0,
        );

        this.drawFrontPolylines(
            this.geographyHatches,
            rotationX,
            rotationY,
            GEO_HATCH_RGB,
            reveal * 0.24,
            0.62,
            0,
            [0.8, 1.25],
        );

        /* Near-facing hatch gets a second subtle pass for depth. */
        this.drawFrontPolylines(
            this.geographyHatches,
            rotationX,
            rotationY,
            GEO_HATCH_RGB,
            reveal * 0.09,
            0.58,
            0.38,
            [0.8, 1.25],
        );

        this.drawFrontPolylines(
            this.geographyBoundaries,
            rotationX,
            rotationY,
            GEO_BOUNDARY_RGB,
            reveal * 0.43,
            0.72,
            0,
        );

        this.drawFrontPolylines(
            this.geographyCoastlines,
            rotationX,
            rotationY,
            GEO_COAST_RGB,
            reveal * 0.56,
            0.9,
            0,
        );

        const radiusPixels = getProjectedWorldRadiusPixels(
            this.globeRadius,
            this.height,
        );
        const ctx = this.context;
        ctx.save();
        ctx.beginPath();
        ctx.arc(
            this.width * 0.5,
            this.height * 0.5,
            radiusPixels * 1.008,
            0,
            TAU,
        );
        ctx.strokeStyle = `rgba(${GEO_COAST_RGB}, ${reveal * 0.10})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.restore();
    }

    private drawFrontPolylines(
        polylines: Polyline3D[],
        rotationX: number,
        rotationY: number,
        rgb: string,
        opacity: number,
        lineWidth: number,
        frontThresholdRatio: number,
        dash?: number[],
    ) {
        if (opacity <= 0.001) {
            return;
        }

        const ctx = this.context;
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const frontThreshold =
            this.globeRadius * frontThresholdRatio;

        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
        ctx.setLineDash(dash ?? []);

        for (const polyline of polylines) {
            const points = polyline.points;
            let drawing = false;

            ctx.beginPath();

            for (let index = 0; index < points.length; index += 3) {
                const x = points[index];
                const y = points[index + 1];
                const z = points[index + 2];

                const yawX = x * cosY + z * sinY;
                const yawZ = -x * sinY + z * cosY;
                const rotatedY = y * cosX - yawZ * sinX;
                const rotatedZ = y * sinX + yawZ * cosX;

                if (rotatedZ <= frontThreshold) {
                    drawing = false;
                    continue;
                }

                const depth = Math.max(CAMERA_Z - rotatedZ, 0.5);
                const scale = this.focalPixels / depth;
                const screenX = this.width * 0.5 + yawX * scale;
                const screenY = this.height * 0.5 - rotatedY * scale;

                if (!drawing) {
                    ctx.moveTo(screenX, screenY);
                    drawing = true;
                } else {
                    ctx.lineTo(screenX, screenY);
                }
            }

            ctx.stroke();
        }

        ctx.restore();
    }

    private updateLabels(
        rotationX: number,
        rotationY: number,
        geographyReveal: number,
    ) {
        const revealOpacity = smoothstep(
            0.18,
            0.78,
            geographyReveal,
        );

        for (const binding of this.labels) {
            const { location, element } = binding;

            if (revealOpacity <= 0.001) {
                element.style.opacity = "0";
                element.style.visibility = "hidden";
                continue;
            }

            const anchor = latLngToXYZ(
                location.lat,
                location.lng,
                this.globeRadius * 1.025,
            );

            const cosY = Math.cos(rotationY);
            const sinY = Math.sin(rotationY);
            const yawX = anchor.x * cosY + anchor.z * sinY;
            const yawZ = -anchor.x * sinY + anchor.z * cosY;
            const cosX = Math.cos(rotationX);
            const sinX = Math.sin(rotationX);
            const rotatedY =
                anchor.y * cosX - yawZ * sinX;
            const rotatedZ =
                anchor.y * sinX + yawZ * cosX;

            const length = Math.max(
                Math.hypot(yawX, rotatedY, rotatedZ),
                0.0001,
            );
            const frontFacing = rotatedZ / length;
            const horizonOpacity = smoothstep(
                0.015,
                0.20,
                frontFacing,
            );
            const opacity = revealOpacity * horizonOpacity;

            if (opacity <= 0.006) {
                element.style.opacity = "0";
                element.style.visibility = "hidden";
                continue;
            }

            const depth = Math.max(CAMERA_Z - rotatedZ, 0.5);
            const scale = this.focalPixels / depth;
            const screenX = this.width * 0.5 + yawX * scale;
            const screenY = this.height * 0.5 - rotatedY * scale;

            element.style.transform = `translate3d(${screenX}px, ${screenY}px, 0)`;
            element.style.opacity = String(opacity);
            element.style.visibility = "visible";
        }
    }

    private shouldContinueRendering() {
        if (!this.visible || this.destroyed) {
            return false;
        }

        const progressSettling =
            Math.abs(this.currentProgress - this.targetProgress) >
            0.0005;
        const pointerSettling =
            Math.abs(this.currentPointerX - this.targetPointerX) >
                0.001 ||
            Math.abs(this.currentPointerY - this.targetPointerY) >
                0.001 ||
            Math.abs(
                this.currentPointerActive - this.targetPointerActive,
            ) > 0.003;
        const orbitSettling =
            Math.abs(this.currentOrbitYaw - this.targetOrbitYaw) >
                0.0005 ||
            Math.abs(
                this.currentOrbitPitch - this.targetOrbitPitch,
            ) > 0.0005;

        if (
            progressSettling ||
            pointerSettling ||
            orbitSettling ||
            this.dragging
        ) {
            return true;
        }

        if (this.reducedMotion) {
            return false;
        }

        /*
         * Only the pre-final dot/wave phase has time-based motion.
         * Once geography is established, a stationary final hold is idle.
         */
        return this.currentProgress < 0.92;
    }

    private configurePerformanceTier() {
        const lowPower = this.isLowPowerDevice();
        const mobile = window.matchMedia("(max-width: 767px)").matches;

        if (lowPower) {
            this.targetFrameInterval = 1000 / 30;
        } else if (mobile) {
            this.targetFrameInterval = 1000 / 45;
        } else {
            this.targetFrameInterval = 1000 / 60;
        }
    }

    private isLowPowerDevice() {
        const nav = navigator as Navigator & {
            deviceMemory?: number;
            connection?: {
                saveData?: boolean;
            };
        };

        return (
            (navigator.hardwareConcurrency || 8) <= 4 ||
            (nav.deviceMemory !== undefined &&
                nav.deviceMemory <= 4) ||
            Boolean(nav.connection?.saveData)
        );
    }

    private getParticleCount() {
        if (this.reducedMotion) {
            return 900;
        }

        const baseCount =
            this.width < 768
                ? 1600
                : this.width < 1200
                    ? 2600
                    : 3800;

        return Math.max(
            900,
            Math.round(
                baseCount *
                    (this.isLowPowerDevice() ? 0.72 : 1),
            ),
        );
    }

    private allocateProjectionBuffers(count: number) {
        this.projectedX = new Float32Array(count);
        this.projectedY = new Float32Array(count);
        this.projectedRadius = new Float32Array(count);
        this.bucketCounts = new Uint32Array(BUCKET_COUNT);
        this.bucketIndices = Array.from(
            { length: BUCKET_COUNT },
            () => new Int32Array(count),
        );
    }
}
