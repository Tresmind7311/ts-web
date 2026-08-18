/**
 * Generate an array of frame URLs from a pattern string.
 *
 * @param pattern  URL pattern containing `{n}` as the frame number placeholder.
 * @param start    First frame number (inclusive).
 * @param end      Last frame number (inclusive).
 * @param zeroPad  Zero-pad width (0 = no padding). Common values: 4 → 0001, 5 → 00001.
 *
 * @example
 * generateFrameUrls('/frames/hero/desktop/{n}.jpg', 1, 120, 4)
 * // → ['/frames/hero/desktop/0001.jpg', ..., '/frames/hero/desktop/0120.jpg']
 *
 * generateFrameUrls('/cdn/seq/frame{n}.webp', 0, 59)
 * // → ['/cdn/seq/frame0.webp', ..., '/cdn/seq/frame59.webp']
 */
export function generateFrameUrls(
    pattern: string,
    start: number,
    end: number,
    zeroPad = 0,
): string[] {
    return Array.from({ length: end - start + 1 }, (_, i) => {
        const n = i + start;
        const ns = zeroPad ? String(n).padStart(zeroPad, '0') : String(n);
        return pattern.replace('{n}', ns);
    });
}