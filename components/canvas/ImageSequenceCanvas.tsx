'use client';
import { useRef, useEffect, useCallback } from 'react';
import { ImageSequenceProps } from '@/types/canvas';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export interface ImageSequenceCanvasProps extends ImageSequenceProps {
    mouseInteraction?: boolean;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function drawCover(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    img: HTMLImageElement,
    cw: number,
    ch: number,
    dx = 0,
    dy = 0,
) {
    if (!img.naturalWidth) return;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - sw) / 2 + dx, (ch - sh) / 2 + dy, sw, sh);
}

function drawContain(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    img: HTMLImageElement,
    cw: number,
    ch: number,
) {
    if (!img.naturalWidth) return;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
}

// ─── component ────────────────────────────────────────────────────────────────

const BATCH_SIZE = 10;

export default function ImageSequenceCanvas({
    desktopFrames,
    mobileFrames,
    containerRef,
    objectFit = 'cover',
    mouseInteraction = false,
}: ImageSequenceCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef<Set<number>>(new Set());
    const isMobileRef = useRef(false);

    // mouse / auto-pilot
    const targetMouseRef = useRef({ x: -1, y: -1 });
    const smoothMouseRef = useRef({ x: -1, y: -1 });
    const lastMoveTimeRef = useRef(0);
    const autoPhaseRef = useRef(0);
    const intensityRef = useRef(0);

    // offscreen buffers (always integer dimensions)
    const offscreenRef = useRef<OffscreenCanvas | null>(null);
    const lensBufferRef = useRef<OffscreenCanvas | null>(null);
    const lensRRef = useRef(0);

    // ── perf: scroll metrics cached outside the tick ──────────────────────────
    const containerTopRef = useRef(0);
    const containerScrollHeightRef = useRef(1);

    // ── perf: skip redundant canvas draws ────────────────────────────────────
    // Tracks the index that was actually drawn (not just the target frameIdx)
    // so the skip check stays correct when a fallback frame was used.
    const lastDrawnIdxRef = useRef(-1);

    // ── perf: IO-driven render gate ───────────────────────────────────────────
    const isVisibleRef = useRef(false);

    // ── frame list ────────────────────────────────────────────────────────────
    const getFrames = useCallback(() => {
        const mobile = isMobileRef.current;
        if (mobile && mobileFrames?.length) return mobileFrames;
        if (desktopFrames?.length) return desktopFrames;
        if (mobileFrames?.length) return mobileFrames;
        return [] as string[];
    }, [desktopFrames, mobileFrames]);

    // ── batched preload ───────────────────────────────────────────────────────
    // Loads BATCH_SIZE frames at a time. When all frames in a batch finish
    // (load or error), the next batch starts automatically. This prevents
    // all 120–357 Image() requests from saturating the connection pool at once.
    const loadFramesBatched = useCallback((frames: string[]) => {
        imagesRef.current = new Array(frames.length);
        loadedRef.current = new Set();
        lastDrawnIdxRef.current = -1;

        const loadBatch = (start: number) => {
            const end = Math.min(start + BATCH_SIZE, frames.length);
            const batchCount = end - start;
            if (batchCount <= 0) return;

            let settled = 0;

            const onSettle = () => {
                settled++;
                if (settled === batchCount) loadBatch(end);
            };

            for (let i = start; i < end; i++) {
                const img = new Image();
                img.decoding = 'async';
                // Give the first three frames high fetch priority so the
                // initial canvas draw happens as soon as possible.
                if (i <= 2) img.fetchPriority = 'high';
                img.src = frames[i];
                imagesRef.current[i] = img;
                img.onload = () => {
                    loadedRef.current.add(i);
                    // Invalidate cached drawn index so the tick redraws with
                    // the newly loaded frame if it's closer to the target.
                    lastDrawnIdxRef.current = -1;
                    onSettle();
                };
                img.onerror = onSettle;
            }
        };

        loadBatch(0);
    }, []);

    // ── resize + canvas sizing ────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            isMobileRef.current = window.innerWidth < 768;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            offscreenRef.current = null;
            lensBufferRef.current = null;
            smoothMouseRef.current = { x: -1, y: -1 };
            targetMouseRef.current = { x: -1, y: -1 };
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // ── scroll metrics cache ──────────────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateMetrics = () => {
            const rect = container.getBoundingClientRect();
            containerTopRef.current = rect.top + window.scrollY;
            containerScrollHeightRef.current = Math.max(1, container.offsetHeight - window.innerHeight);
            lastDrawnIdxRef.current = -1;
        };

        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        ScrollTrigger.addEventListener('refresh', updateMetrics);

        return () => {
            window.removeEventListener('resize', updateMetrics);
            ScrollTrigger.removeEventListener('refresh', updateMetrics);
        };
    }, [containerRef]);

    // ── preload gate (IntersectionObserver on scroll container) ──────────────
    // Fires once when the container is within 200px of the viewport bottom.
    // Disconnects immediately after triggering so the observer doesn't persist.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadFramesBatched(getFrames());
                    io.disconnect();
                }
            },
            { rootMargin: '0px 0px 200px 0px', threshold: 0 },
        );

        io.observe(container);
        return () => io.disconnect();
    }, [containerRef, getFrames, loadFramesBatched]);

    // ── visibility gate (IntersectionObserver on scroll container) ────────────
    // Persists and gates the tick() render loop so no canvas work runs when
    // the section is off-screen.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const io = new IntersectionObserver(
            ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
            { threshold: 0 },
        );
        io.observe(container);
        return () => io.disconnect();
    }, [containerRef]);

    // ── mouse tracking ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!mouseInteraction) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (
                e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom
            ) return;
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            targetMouseRef.current = {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY,
            };
            lastMoveTimeRef.current = performance.now();
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, [mouseInteraction]);

    // ── tick (GSAP ticker — single RAF loop shared with Lenis + ST) ───────────
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const IDLE_MS = 1500;

        const tick = () => {
            if (!isVisibleRef.current) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const frames = getFrames();
            if (!frames.length) return;

            const cw = canvas.width;
            const ch = canvas.height;

            const scrolled = window.scrollY - containerTopRef.current;
            const progress = Math.max(0, Math.min(1, scrolled / containerScrollHeightRef.current));
            const frameIdx = Math.min(
                frames.length - 1,
                Math.max(0, Math.round(progress * (frames.length - 1))),
            );

            // ── Nearest-frame fallback ────────────────────────────────────────
            // When the exact target frame hasn't loaded yet, walk outward in
            // both directions and draw the closest frame that is available.
            // This prevents the canvas from freezing on a stale frame while
            // batches are still loading (most visible on cold Netlify CDN).
            // Once the target frame's onload fires, lastDrawnIdxRef resets to
            // -1 so the next tick redraws with the correct frame automatically.
            let drawIdx = frameIdx;
            if (!loadedRef.current.has(frameIdx)) {
                let found = false;
                for (let delta = 1; delta < frames.length; delta++) {
                    const lo = frameIdx - delta;
                    const hi = frameIdx + delta;
                    if (lo >= 0 && loadedRef.current.has(lo)) {
                        drawIdx = lo;
                        found = true;
                        break;
                    }
                    if (hi < frames.length && loadedRef.current.has(hi)) {
                        drawIdx = hi;
                        found = true;
                        break;
                    }
                }
                // Nothing loaded at all yet — wait silently.
                if (!found) return;
            }

            const img = imagesRef.current[drawIdx];
            if (!img) return;

            if (mouseInteraction) {
                // Mouse path always redraws every frame (lerp changes
                // regardless of scroll) so no skip-check needed here.
                if (smoothMouseRef.current.x < 0) {
                    smoothMouseRef.current = { x: cw / 2, y: ch / 2 };
                    targetMouseRef.current = { x: cw / 2, y: ch / 2 };
                }

                const cursorIdle = (performance.now() - lastMoveTimeRef.current) > IDLE_MS;
                autoPhaseRef.current += 0.004;
                if (cursorIdle) {
                    targetMouseRef.current = {
                        x: cw * (0.5 + 0.30 * Math.sin(autoPhaseRef.current)),
                        y: ch * (0.5 + 0.25 * Math.sin(autoPhaseRef.current * 1.3 + 1.2)),
                    };
                }

                smoothMouseRef.current.x += (targetMouseRef.current.x - smoothMouseRef.current.x) * 0.04;
                smoothMouseRef.current.y += (targetMouseRef.current.y - smoothMouseRef.current.y) * 0.04;
                intensityRef.current += (1 - intensityRef.current) * 0.06;

                const intensity = intensityRef.current;
                const mx = smoothMouseRef.current.x;
                const my = smoothMouseRef.current.y;
                const shiftX = intensity * ((mx / cw - 0.5) * 8);
                const shiftY = intensity * ((my / ch - 0.5) * 8);

                if (!offscreenRef.current ||
                    offscreenRef.current.width !== cw ||
                    offscreenRef.current.height !== ch) {
                    offscreenRef.current = new OffscreenCanvas(cw, ch);
                }
                const offCtx = offscreenRef.current.getContext('2d')!;
                offCtx.clearRect(0, 0, cw, ch);
                if (objectFit === 'cover') drawCover(offCtx, img, cw, ch, shiftX, shiftY);
                else drawContain(offCtx, img, cw, ch);

                ctx.clearRect(0, 0, cw, ch);
                ctx.drawImage(offscreenRef.current, 0, 0);

                if (intensity > 0.01) {
                    const LENS_R = Math.round(Math.min(cw, ch) * 0.17);
                    const ZOOM = 1 + 0.075 * intensity;
                    const BRIGHT = 1 + 0.18 * intensity;
                    const DIAM = LENS_R * 2;

                    if (!lensBufferRef.current || lensRRef.current !== LENS_R) {
                        lensBufferRef.current = new OffscreenCanvas(DIAM, DIAM);
                        lensRRef.current = LENS_R;
                    }

                    const lensCtx = lensBufferRef.current.getContext('2d')!;
                    lensCtx.clearRect(0, 0, DIAM, DIAM);
                    lensCtx.filter = `brightness(${BRIGHT})`;
                    lensCtx.drawImage(
                        offscreenRef.current,
                        mx - (DIAM / ZOOM) / 2, my - (DIAM / ZOOM) / 2,
                        DIAM / ZOOM, DIAM / ZOOM,
                        0, 0, DIAM, DIAM,
                    );
                    lensCtx.filter = 'none';

                    lensCtx.globalCompositeOperation = 'destination-in';
                    const mask = lensCtx.createRadialGradient(LENS_R, LENS_R, 0, LENS_R, LENS_R, LENS_R);
                    mask.addColorStop(0, `rgba(0,0,0,${intensity})`);
                    mask.addColorStop(0.55, `rgba(0,0,0,${intensity * 0.9})`);
                    mask.addColorStop(0.80, `rgba(0,0,0,${intensity * 0.4})`);
                    mask.addColorStop(1, 'rgba(0,0,0,0)');
                    lensCtx.fillStyle = mask;
                    lensCtx.fillRect(0, 0, DIAM, DIAM);
                    lensCtx.globalCompositeOperation = 'source-over';

                    ctx.drawImage(lensBufferRef.current, Math.round(mx - LENS_R), Math.round(my - LENS_R));
                }

            } else {
                // ── Skip draw when the drawn frame hasn't changed ─────────────
                // Uses drawIdx (the actually rendered frame) not frameIdx (the
                // scroll target) so fallback frames don't cause false cache hits.
                if (drawIdx === lastDrawnIdxRef.current) return;
                lastDrawnIdxRef.current = drawIdx;

                ctx.clearRect(0, 0, cw, ch);
                if (objectFit === 'cover') drawCover(ctx, img, cw, ch);
                else drawContain(ctx, img, cw, ch);
            }
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, [containerRef, getFrames, objectFit, mouseInteraction]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}
        />
    );
}