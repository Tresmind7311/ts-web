import type { RefObject, CSSProperties } from 'react';

export interface ImageSequenceProps {
    /** Frame URLs for desktop (≥ mobileBreakpoint). Required; used as fallback when mobile frames absent. */
    desktopFrames: string[];
    /** Frame URLs for mobile (< mobileBreakpoint). Falls back to desktopFrames when absent. */
    mobileFrames?: string[];
    /**
     * Ref pointing to the tall scroll container that wraps the sticky canvas.
     * Progress = how far that container has scrolled through the viewport.
     */
    containerRef: RefObject<HTMLElement | null>;
    /** Canvas fill mode — mirrors CSS object-fit. Default: 'cover'. */
    objectFit?: 'cover' | 'contain';
    /** Viewport width (px) at which mobile frames activate. Default: 768. */
    mobileBreakpoint?: number;
    className?: string;
    style?: CSSProperties;
}