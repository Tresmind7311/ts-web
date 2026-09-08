export interface BannerButton {
    /** Link text */
    text: string;
    /** Destination URL or anchor */
    href: string;
}

export interface BannerOverlay {
    /**
     * CSS color string applied over the background image.
     * @default 'rgba(255,255,255,0)'
     */
    color?: string;
    /**
     * Overlay opacity, 0–1.
     * @default 0
     */
    opacity?: number;
}

export interface ServicesBannerProps {
    /** Optional small eyebrow label rendered above the heading. */
    smallLabel?: string;

    /** Main section heading. Rendered as an <h2>. */
    heading: string;

    /** Supporting description paragraph. */
    description: string;

    /**
     * Path or URL of the background image.
     * Rendered as CSS background-image (cover + center).
     */
    backgroundImage: string;

    /**
     * Optional colour overlay applied above the background image.
     * Useful for improving text contrast over bright photographs.
     */
    backgroundOverlay?: BannerOverlay;

    /** Primary (filled-gradient) call-to-action button. */
    primaryButton: BannerButton;

    /** Secondary (outlined) call-to-action button. */
    secondaryButton: BannerButton;

    /** Additional CSS class applied to the section root. */
    className?: string;

    /** HTML id applied to the section root. */
    id?: string;
}
