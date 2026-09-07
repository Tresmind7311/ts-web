import EarthFrameSequence from "./EarthFrameSequence";
import {
    CAMERA_Z,
    clamp,
    createGlobeGridPolylines,
    createPointAttributes,
    createRoutePolylines,
    damp,
    getFocalLengthPixels,
    getGlobeRadiusWorld,
    getProjectedWorldRadiusPixels,
    getViewportWorldSize,
    latLngToXYZ,
    lerp,
    positiveModulo,
    projectXYZ,
    rotateXY,
    smoothstep,
    TAU,
} from "./earthMath";

import type {
    GlobeRoute,
    LabelBinding,
    PointAttributes,
    Polyline3D,
} from "./types";

const EARTH_FRAME_COUNT = 72;
const EARTH_FRAME_BASE_PATH = "/images/dot-globe-lite/earth";
const EARTH_PRELOAD_PROGRESS = 0.72;

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

export interface DotGlobeCanvasRendererOptions {
    canvas: HTMLCanvasElement;
    labels: LabelBinding[];
}

export default class DotGlobeCanvasRenderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly labels: LabelBinding[];
    private readonly earthFrames: EarthFrameSequence;

    private width = 1;
    private height = 1;
    private dpr = 1;
    private viewportWorldWidth = 1;
    private viewportWorldHeight = 1;
    private globeRadius = 1;
    private focalPixels = 1;

    private points: PointAttributes = createPointAttributes(1, 1, 1, 1);
    private gridLines: Polyline3D[] = [];
    private routeLines: Polyline3D[] = [];

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

    private earthReveal = 0;
    private visible = true;
    private reducedMotion = false;
    private destroyed = false;

    private rafId: number | null = null;
    private timerId: number | null = null;
    private lastTimestamp = 0;
    private lastDrawTimestamp = 0;
    private targetFrameInterval = 1000 / 60;

    constructor(options: DotGlobeCanvasRendererOptions) {
        this.canvas = options.canvas;
        this.labels = options.labels;

        const context = this.canvas.getContext("2d", {
            alpha: true,
            desynchronized: true,
        });

        if (!context) {
            throw new Error("DotGlobeLite: Canvas 2D context unavailable.");
        }

        this.context = context;
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = "high";

        this.earthFrames = new EarthFrameSequence({
            frameCount: EARTH_FRAME_COUNT,
            basePath: EARTH_FRAME_BASE_PATH,
            maxDecodedFrames: 14,
            onFrameAvailable: () => this.wake(),
        });

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

        this.gridLines = createGlobeGridPolylines(
            this.globeRadius * 1.006,
        );
        this.routeLines = createRoutePolylines(
            ROUTES,
            this.globeRadius * 1.014,
        );

        this.allocateProjectionBuffers(pointCount);
        this.wake();
    }

    public setProgress(progress: number) {
        this.targetProgress = clamp(progress, 0, 1);

        if (this.targetProgress >= EARTH_PRELOAD_PROGRESS) {
            this.earthFrames.enable(this.getEarthYawTarget());
        }

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
        this.targetOrbitPitch = clamp(pitch, -0.35, 0.35);
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
            this.earthFrames.enable(this.getEarthYawTarget());
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
        this.earthFrames.destroy();

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
                : Math.min((timestamp - this.lastTimestamp) / 1000, 0.05);

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
        } else {
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
                9,
                delta,
            );
            this.currentOrbitPitch = damp(
                this.currentOrbitPitch,
                this.targetOrbitPitch,
                9,
                delta,
            );
        }

        const earthYaw = this.getEarthYawCurrent();
        const pair = this.earthFrames.getFramePair(earthYaw);
        const earthFrameReady = Boolean(pair.first || pair.second);
        const targetEarthReveal =
            this.earthFrames.isAvailable() && earthFrameReady
                ? smoothstep(0.88, 0.98, this.currentProgress)
                : 0;

        this.earthReveal = this.reducedMotion
            ? targetEarthReveal
            : damp(this.earthReveal, targetEarthReveal, 7, delta);
    }

    private render(timeSeconds: number) {
        const ctx = this.context;

        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.clearRect(0, 0, this.width, this.height);

        const progress = this.currentProgress;
        const morph = smoothstep(0.22, 0.68, progress);
        const finalReveal = smoothstep(0.72, 0.95, progress);
        const syntheticOpacity = 1 - this.earthReveal;

        const baseRotationY = lerp(-0.68, 0.22, progress);
        const pointerRotationY =
            this.currentPointerX *
            0.11 *
            this.currentPointerActive;
        const pointerRotationX =
            -this.currentPointerY *
            0.065 *
            this.currentPointerActive;

        const syntheticRotationY =
            (baseRotationY + pointerRotationY) * morph;
        const syntheticRotationX =
            pointerRotationX * morph;

        if (syntheticOpacity > 0.001) {
            const globeReveal = smoothstep(0.62, 0.84, progress);
            const routeReveal = smoothstep(0.76, 0.92, progress);

            if (globeReveal > 0.001) {
                this.drawPolylines(
                    this.gridLines,
                    syntheticRotationX,
                    syntheticRotationY,
                    "49, 95, 93",
                    globeReveal * 0.26 * syntheticOpacity,
                    1,
                );
            }

            this.prepareParticles(
                timeSeconds,
                morph,
                finalReveal,
                syntheticRotationX,
                syntheticRotationY,
            );
            this.drawPreparedParticles(syntheticOpacity);

            if (routeReveal > 0.001) {
                this.drawPolylines(
                    this.routeLines,
                    syntheticRotationX,
                    syntheticRotationY,
                    "102, 203, 197",
                    routeReveal * 0.9 * syntheticOpacity,
                    1.15,
                );
            }
        }

        if (this.earthReveal > 0.001) {
            this.drawEarthFrames();
        }

        this.updateLabels();
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

        for (let alphaBucket = 0; alphaBucket < ALPHA_BUCKETS; alphaBucket += 1) {
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
                for (let offset = 0; offset < bucketCount; offset += 1) {
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

    private drawPolylines(
        polylines: Polyline3D[],
        rotationX: number,
        rotationY: number,
        rgb: string,
        opacity: number,
        lineWidth: number,
    ) {
        if (opacity <= 0.001) {
            return;
        }

        const ctx = this.context;
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const backCutoff = -this.globeRadius * 0.10;

        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;

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

                if (rotatedZ < backCutoff) {
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
    }

    private drawEarthFrames() {
        const pair = this.earthFrames.getFramePair(
            this.getEarthYawCurrent(),
        );

        if (!pair.first && !pair.second) {
            return;
        }

        const radiusPixels = getProjectedWorldRadiusPixels(
            this.globeRadius,
            this.height,
        );
        const revealScale = lerp(0.94, 1, this.earthReveal);
        const diameter = radiusPixels * 2 * revealScale;

        const pitchOffset =
            this.currentOrbitPitch * radiusPixels * 0.11;
        const centerX = this.width * 0.5;
        const centerY = this.height * 0.5 + pitchOffset;
        const left = centerX - diameter * 0.5;
        const top = centerY - diameter * 0.5;

        const ctx = this.context;
        ctx.save();
        ctx.globalAlpha = this.earthReveal;

        if (pair.first && pair.second && pair.first !== pair.second) {
            ctx.globalAlpha = this.earthReveal * (1 - pair.mix);
            ctx.drawImage(pair.first, left, top, diameter, diameter);

            ctx.globalAlpha = this.earthReveal * pair.mix;
            ctx.drawImage(pair.second, left, top, diameter, diameter);
        } else {
            const image = pair.first ?? pair.second;
            if (image) {
                ctx.drawImage(image, left, top, diameter, diameter);
            }
        }

        ctx.restore();
    }

    private updateLabels() {
        const earthYaw = this.getEarthYawCurrent();
        const radiusPixels = getProjectedWorldRadiusPixels(
            this.globeRadius,
            this.height,
        );
        const pitchOffset =
            this.currentOrbitPitch * radiusPixels * 0.11;
        const revealOpacity = smoothstep(
            0.22,
            0.82,
            this.earthReveal,
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
                this.globeRadius * 1.075,
            );
            const rotated = rotateXY(
                anchor.x,
                anchor.y,
                anchor.z,
                0,
                earthYaw,
            );
            const projected = projectXYZ(
                rotated.x,
                rotated.y,
                rotated.z,
                this.width,
                this.height,
            );

            const surfaceLength = Math.max(
                Math.hypot(rotated.x, rotated.y, rotated.z),
                0.0001,
            );
            const frontFacing = rotated.z / surfaceLength;
            const horizonOpacity = smoothstep(
                -0.04,
                0.2,
                frontFacing,
            );
            const opacity = revealOpacity * horizonOpacity;

            element.style.transform = `translate3d(${projected.x}px, ${
                projected.y + pitchOffset
            }px, 0)`;
            element.style.opacity = String(opacity);
            element.style.visibility =
                opacity > 0.015 ? "visible" : "hidden";
        }
    }

    private shouldContinueRendering() {
        if (!this.visible || this.destroyed) {
            return false;
        }

        const progressSettling =
            Math.abs(this.currentProgress - this.targetProgress) > 0.0005;
        const pointerSettling =
            Math.abs(this.currentPointerX - this.targetPointerX) > 0.001 ||
            Math.abs(this.currentPointerY - this.targetPointerY) > 0.001 ||
            Math.abs(
                this.currentPointerActive - this.targetPointerActive,
            ) > 0.003;
        const orbitSettling =
            Math.abs(this.currentOrbitYaw - this.targetOrbitYaw) > 0.0005 ||
            Math.abs(
                this.currentOrbitPitch - this.targetOrbitPitch,
            ) > 0.0005;

        const targetEarthReveal = this.earthFrames.isAvailable()
            ? smoothstep(0.88, 0.98, this.currentProgress)
            : 0;
        const earthSettling =
            Math.abs(this.earthReveal - targetEarthReveal) > 0.003;

        if (
            progressSettling ||
            pointerSettling ||
            orbitSettling ||
            earthSettling ||
            this.dragging
        ) {
            return true;
        }

        if (this.reducedMotion) {
            return false;
        }

        const syntheticStillAnimated =
            this.currentProgress < 0.95 &&
            this.earthReveal < 0.995;

        return syntheticStillAnimated;
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
            (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
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
                baseCount * (this.isLowPowerDevice() ? 0.72 : 1),
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

    private getEarthYawTarget() {
        return lerp(-0.68, 0.22, this.targetProgress) + this.targetOrbitYaw;
    }

    private getEarthYawCurrent() {
        return lerp(-0.68, 0.22, this.currentProgress) + this.currentOrbitYaw;
    }
}
