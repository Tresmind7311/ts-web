'use client';
import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * ScrollRefreshManager
 * ─────────────────────
 * Mount this ONCE in app/page.tsx, above or alongside your sections.
 * It renders nothing — it only calls ScrollTrigger.refresh() at safe,
 * predictable moments instead of letting every section's own
 * ScrollTrigger.create() trigger its own implicit refresh as it mounts.
 *
 * Why this fixes the jump:
 * Each section (StatsSection, WorkSection, AnimationSection, etc.) calls
 * ScrollTrigger.create() on mount. Every one of those calls schedules a
 * global refresh — recalculating start/end pixel boundaries for ALL
 * existing triggers, not just its own. If a later section mounts after
 * an earlier section's layout has shifted even slightly (webp frame
 * loading, font swap, viewport height change), that later mount's
 * refresh recalculates the earlier section's boundaries mid-scroll and
 * snaps its scrub progress to match — visible as a jerk.
 *
 * This component waits for window 'load' (fonts + initial images settled)
 * plus one more frame for layout to fully stabilize, then fires exactly
 * ONE refresh. It also refreshes on resize (debounced), which you need
 * anyway and which replaces the need for scattered ad-hoc refreshes.
 */
export default function ScrollRefreshManager() {
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;

        const doRefresh = () => ScrollTrigger.refresh();

        const onLoad = () => {
            // One extra rAF — lets the browser finish any layout it queued
            // as a result of the 'load' event itself before we measure.
            requestAnimationFrame(doRefresh);
        };

        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(doRefresh, 150);
        };

        if (document.readyState === 'complete') {
            // Already loaded (e.g. fast refresh / client nav) — refresh now.
            onLoad();
        } else {
            window.addEventListener('load', onLoad);
        }

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('load', onLoad);
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return null;
}