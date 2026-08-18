'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

// ─── Public API ───────────────────────────────────────────────────────────────
export interface FrameCanvasHandle {
    /**
     * Drive the canvas to a specific frame. progress 0–1.
     * Called imperatively from GSAP onUpdate — no React re-render.
     */
    setProgress(progress: number): void;
}

interface Props {
    frames: string[];
    style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────
const FrameCanvas = forwardRef<FrameCanvasHandle, Props>(({ frames, style }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Preload all frames up-front
    useEffect(() => {
        imagesRef.current = frames.map((src) => {
            const img = new Image();
            img.src = src;
            return img;
        });
    }, [frames]);

    // Keep canvas pixel buffer matched to element size (cover-fit aware)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const sync = () => {
            const dpr = window.devicePixelRatio ?? 1;
            // Conflict rule §7: OffscreenCanvas dimensions must be integers
            canvas.width = Math.round(canvas.offsetWidth * dpr);
            canvas.height = Math.round(canvas.offsetHeight * dpr);
        };

        sync();
        const ro = new ResizeObserver(sync);
        ro.observe(canvas);
        return () => ro.disconnect();
    }, []);

    // Internal draw — reads live refs, safe to call any time
    const drawFrame = (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const idx = Math.round(Math.max(0, Math.min(1, progress)) * (frames.length - 1));
        const img = imagesRef.current[idx];
        if (!img?.complete || !img.naturalWidth) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width: cw, height: ch } = canvas;
        const { naturalWidth: iw, naturalHeight: ih } = img;
        const scale = Math.max(cw / iw, ch / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    };

    // Expose setProgress — deps [] is correct; drawFrame reads refs at call-time
    useImperativeHandle(ref, () => ({ setProgress: drawFrame }), []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                pointerEvents: 'none', // never block scroll / GSAP
                ...style,
            }}
        />
    );
});

FrameCanvas.displayName = 'FrameCanvas';
export default FrameCanvas;