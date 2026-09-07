import { positiveModulo, TAU } from "./earthMath";

interface EarthFrameSequenceOptions {
    frameCount: number;
    basePath: string;
    maxDecodedFrames?: number;
    onFrameAvailable?: () => void;
}

interface FramePair {
    first: HTMLImageElement | null;
    second: HTMLImageElement | null;
    mix: number;
}

export default class EarthFrameSequence {
    private readonly frameCount: number;
    private readonly basePath: string;
    private readonly maxDecodedFrames: number;
    private readonly onFrameAvailable?: () => void;

    private readonly cache = new Map<number, HTMLImageElement>();
    private readonly loading = new Map<number, Promise<HTMLImageElement | null>>();
    private readonly warmed = new Set<number>();
    private readonly failed = new Set<number>();

    private enabled = false;
    private assetSetAvailable: boolean | null = null;
    private destroyed = false;
    private idleHandle: number | null = null;
    private warmCursor = 0;
    private lastRequestedIndex = 0;

    constructor(options: EarthFrameSequenceOptions) {
        this.frameCount = options.frameCount;
        this.basePath = options.basePath.replace(/\/$/, "");
        this.maxDecodedFrames = options.maxDecodedFrames ?? 14;
        this.onFrameAvailable = options.onFrameAvailable;
    }

    public enable(yaw: number) {
        if (this.destroyed || this.enabled) {
            return;
        }

        this.enabled = true;
        const index = this.yawToIndex(yaw);
        this.lastRequestedIndex = index;

        void this.loadFrame(index, true).then((image) => {
            if (this.destroyed) {
                return;
            }

            if (!image) {
                this.assetSetAvailable = false;
                return;
            }

            this.assetSetAvailable = true;
            this.preloadAround(index, 4);
            this.scheduleWarmRemaining();
            this.onFrameAvailable?.();
        });
    }

    public isAvailable() {
        return this.assetSetAvailable === true;
    }

    public getFramePair(yaw: number): FramePair {
        const normalized = positiveModulo(yaw, TAU) / TAU;
        const exact = normalized * this.frameCount;
        const firstIndex = positiveModulo(
            Math.floor(exact),
            this.frameCount,
        );
        const secondIndex = positiveModulo(
            firstIndex + 1,
            this.frameCount,
        );
        const mix = exact - Math.floor(exact);

        this.lastRequestedIndex = firstIndex;

        if (this.enabled && this.assetSetAvailable !== false) {
            this.preloadAround(firstIndex, 3);
        }

        const first =
            this.cache.get(firstIndex) ??
            this.findNearestCached(firstIndex);
        const second =
            this.cache.get(secondIndex) ??
            first;

        this.prune(firstIndex);

        return {
            first: first ?? null,
            second: second ?? null,
            mix,
        };
    }

    public destroy() {
        this.destroyed = true;
        this.cancelIdleWarm();
        this.cache.clear();
        this.loading.clear();
        this.warmed.clear();
        this.failed.clear();
    }

    private yawToIndex(yaw: number) {
        const normalized = positiveModulo(yaw, TAU) / TAU;
        return positiveModulo(
            Math.round(normalized * this.frameCount),
            this.frameCount,
        );
    }

    private buildUrl(index: number) {
        const padded = String(index).padStart(3, "0");
        return `${this.basePath}/earth-${padded}.webp`;
    }

    private loadFrame(
        index: number,
        retain: boolean,
    ): Promise<HTMLImageElement | null> {
        const wrappedIndex = positiveModulo(index, this.frameCount);

        const cached = this.cache.get(wrappedIndex);
        if (cached) {
            return Promise.resolve(cached);
        }

        if (this.failed.has(wrappedIndex)) {
            return Promise.resolve(null);
        }

        const existing = this.loading.get(wrappedIndex);
        if (existing) {
            return existing;
        }

        const promise = new Promise<HTMLImageElement | null>((resolve) => {
            const image = new Image();
            image.decoding = "async";

            const cleanup = () => {
                image.onload = null;
                image.onerror = null;
                this.loading.delete(wrappedIndex);
            };

            image.onload = () => {
                cleanup();
                this.warmed.add(wrappedIndex);

                if (retain && !this.destroyed) {
                    this.cache.set(wrappedIndex, image);
                    this.prune(this.lastRequestedIndex);
                    this.onFrameAvailable?.();
                }

                resolve(image);
            };

            image.onerror = () => {
                cleanup();
                this.failed.add(wrappedIndex);
                resolve(null);
            };

            image.src = this.buildUrl(wrappedIndex);
        });

        this.loading.set(wrappedIndex, promise);
        return promise;
    }

    private preloadAround(centerIndex: number, radius: number) {
        for (let offset = -radius; offset <= radius; offset += 1) {
            const index = positiveModulo(
                centerIndex + offset,
                this.frameCount,
            );
            void this.loadFrame(index, true);
        }
    }

    private findNearestCached(index: number) {
        for (let distance = 1; distance <= 5; distance += 1) {
            const before = positiveModulo(
                index - distance,
                this.frameCount,
            );
            const after = positiveModulo(
                index + distance,
                this.frameCount,
            );

            const beforeImage = this.cache.get(before);
            if (beforeImage) {
                return beforeImage;
            }

            const afterImage = this.cache.get(after);
            if (afterImage) {
                return afterImage;
            }
        }

        return null;
    }

    private prune(centerIndex: number) {
        if (this.cache.size <= this.maxDecodedFrames) {
            return;
        }

        const entries = Array.from(this.cache.keys()).map((index) => {
            const direct = Math.abs(index - centerIndex);
            const wrapped = this.frameCount - direct;
            return {
                index,
                distance: Math.min(direct, wrapped),
            };
        });

        entries.sort((a, b) => b.distance - a.distance);

        while (
            this.cache.size > this.maxDecodedFrames &&
            entries.length > 0
        ) {
            const farthest = entries.shift();
            if (farthest) {
                this.cache.delete(farthest.index);
            }
        }
    }

    private scheduleWarmRemaining() {
        if (
            this.destroyed ||
            this.assetSetAvailable !== true ||
            this.idleHandle !== null
        ) {
            return;
        }

        const runBatch = () => {
            this.idleHandle = null;

            if (this.destroyed || this.assetSetAvailable !== true) {
                return;
            }

            let loadedThisBatch = 0;

            while (
                this.warmCursor < this.frameCount &&
                loadedThisBatch < 1
            ) {
                const index = this.warmCursor;
                this.warmCursor += 1;

                if (
                    this.warmed.has(index) ||
                    this.loading.has(index) ||
                    this.failed.has(index)
                ) {
                    continue;
                }

                loadedThisBatch += 1;
                void this.loadFrame(index, false);
            }

            if (this.warmCursor < this.frameCount) {
                this.scheduleWarmRemaining();
            }
        };

        if (typeof window.requestIdleCallback === "function") {
            this.idleHandle = window.requestIdleCallback(
                runBatch,
                { timeout: 1500 },
            );
            return;
        }

        this.idleHandle = window.setTimeout(runBatch, 250);
    }

    private cancelIdleWarm() {
        if (this.idleHandle === null) {
            return;
        }

        if (typeof window.cancelIdleCallback === "function") {
            window.cancelIdleCallback(this.idleHandle);
        } else {
            window.clearTimeout(this.idleHandle);
        }

        this.idleHandle = null;
    }
}
