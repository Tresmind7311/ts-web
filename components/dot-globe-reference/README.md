# Dot Globe Reference — centered Contact intro

Replace the existing dot-globe-reference folder.

## Layout and flow

Before the globe: centered gradient heading “What's Next Together.”, description, CTA and a horizontal Our Location / Call Us / Email Us strip. On small screens the strip stacks. Existing contact values are retained; screenshot placeholder address/phone/email are not substituted.

Dots continue moving behind the intro from the first scroll. Content fades out, then the existing full-size centered globe forms. Separate centered phone/email stages remain removed. Globe renderer, geography data, navy GEO_*_RGB values, drag controls and reduced-motion support are unchanged.

The strip uses a light translucent fill without backdrop blur. The fallback CTA uses a darker navy/teal gradient for white-text contrast. Existing shared buttons still go through contactCta and keep their own styling.

## Manually adjust timing

Open DotGlobeReferenceSection.tsx. These controls are at the top:

```ts
const CONTACT_FADE_IN_VH = 70;
const CONTACT_HOLD_VH = 260;
const CONTACT_FADE_OUT_VH = 90;
const ANIMATION_SCROLL_DISTANCE_VH = 650;
const GLOBE_END_HOLD_VH = 70;
```

- CONTACT_HOLD_VH: fully visible content hold. Increase 260 to 400 to hide it later.
- CONTACT_FADE_IN_VH: scroll distance for the staggered reveal.
- CONTACT_FADE_OUT_VH: scroll distance for fading out.
- ANIMATION_SCROLL_DISTANCE_VH: globe phase length.
- GLOBE_END_HOLD_VH: completed globe hold before unpinning.

These are scroll distances in viewport-height equivalents, NOT seconds. 100vh corresponds approximately to one section height. CONTACT_SCROLL_DISTANCE_VH and SECTION_SCROLL_DISTANCE_VH derive from these controls automatically; do not manually edit their sums. Keep fade durations greater than zero and hold values nonnegative.

Current timeline: reveal 0–70vh; full hold 70–330vh; fade out 330–420vh; globe phase 420–1070vh; globe hold 1070–1140vh. Former full hold was only 80vh and fade-out began at 150vh. Globe phase length remains 650vh.

## Manually adjust appearance and copy

DotGlobeReference.module.css:
- .finalHeading: font size, weight and heading gradient.
- .finalDescription: description width, size and color.
- .finalContact: overall spacing/padding.
- .finalRight: contact strip fill, border, padding and columns.
- .ctaFallback: fallback CTA appearance only.
- Media queries: mobile and short-screen variants.

DotGlobeReferenceSection.tsx:
- Heading/description JSX near the end of the file.
- phoneNumber, emailAddress, locationText props/defaults for contact values.
- contactCta accepts your existing button JSX; its implementation/import path was not supplied, so a working mailto CTA remains as fallback.
- textColor/mutedTextColor accept your actual project token values.

## Validation

TSX transpilation passed. Mocked browser/Canvas component tests passed for intro stagger, longer hold through 320vh, hidden content before globe, globe-only ending, reverse scrolling and inert hidden links in both motion modes. ZIP integrity checked; Canvas renderer and worldGeography.ts unchanged by this update.

Full project build and physical browser/iPhone visual validation remain unverified. The archive contains only the section, without the host Next.js project or shared button.
