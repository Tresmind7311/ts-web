'use client';

import {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    type MutableRefObject,
} from 'react';

import { styled } from '@mui/material/styles';
import {
    Canvas,
    useFrame,
    useThree,
} from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { gsap, ScrollTrigger } from '@/lib/gsap';

export interface Project {
    title: string;
    image: string;
    href: string;
    tag?: string;
}

interface CurvedProjectsContinuousProps {
    projects: Project[];
    /** Kept for API compatibility with the original component. */
    sectionLabel?: string;
}

interface ScrollState {
    target: number;
    current: number;
    velocity: number;
}

interface RectSnapshot {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface CardMetric {
    offsetLeft: number;
    width: number;
    height: number;
}

interface TrackMetrics {
    step: number;
    top: number;
    cards: CardMetric[];
}

interface DomTrackDriverProps {
    cardRefs: MutableRefObject<(HTMLAnchorElement | null)[]>;
    trackRef: MutableRefObject<HTMLDivElement | null>;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
    projectCount: number;
}

interface MirroredCardProps {
    project: Project;
    index: number;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
}

interface CurvedProjectsSceneProps {
    projects: Project[];
    cardRefs: MutableRefObject<(HTMLAnchorElement | null)[]>;
    trackRef: MutableRefObject<HTMLDivElement | null>;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
}

/*
 * Preserve original gallery coverage:
 * - 2 leading cards before first real centre state.
 * - every original project passes through centre.
 * - 2 repeated projects may pass through centre after originals.
 * - 2 look-ahead cards only maintain composition at final edge.
 *
 * All rendered cards use one continuous linear index track. None are static
 * side overlays and no content swapping is used for movement.
 */
const LEADING_BUFFER_COUNT = 2;
const LOOP_CENTER_COUNT = 2;
const LOOKAHEAD_BUFFER_COUNT = 2;
const SCROLL_PER_CARD_VH = 1.15;

/*
 * Reference-driven five-lane screen-space mapping.
 *
 * Values are normalized against half the viewport width:
 * 0.82 = 41vw from centre, 1.06 = 53vw from centre.
 * This keeps the large centre card intact while placing the inner side cards
 * outside its projected bounds and the far cards partially beyond viewport.
 *
 * Position is continuous. Centre-to-inner motion uses Hermite interpolation;
 * inner-to-far motion eases outward early so projected card bounds stay apart.
 * The same physical card moves
 * through FAR RIGHT -> RIGHT -> CENTER -> LEFT -> FAR LEFT without snapping.
 * After the far slot, cards accelerate fully outside viewport so ±3 never
 * remain visible as random edge slivers.
 */
interface SlotLayout {
    inner: number;
    outer: number;
    centerSlope: number;
    innerSlope: number;
    exitSlope: number;
    visibleRange: number;
}

const getSlotLayout = (viewportWidth: number): SlotLayout => {
    if (viewportWidth <= 767) {
        return {
            inner: 1.12,
            outer: 1.42,
            centerSlope: 1.24,
            innerSlope: 0.46,
            exitSlope: 0.95,
            visibleRange: 1.75,
        };
    }

    if (viewportWidth <= 1100) {
        return {
            inner: 0.90,
            outer: 1.16,
            centerSlope: 1.12,
            innerSlope: 0.38,
            exitSlope: 0.86,
            visibleRange: 2.18,
        };
    }

    return {
        inner: 0.82,
        outer: 1.06,
        centerSlope: 1.05,
        innerSlope: 0.35,
        exitSlope: 0.85,
        visibleRange: 2.20,
    };
};

const hermite = (
    start: number,
    end: number,
    startSlope: number,
    endSlope: number,
    t: number,
) => {
    const t2 = t * t;
    const t3 = t2 * t;

    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;

    return (
        h00 * start
        + h10 * startSlope
        + h01 * end
        + h11 * endSlope
    );
};

const mapRelativeToSlot = (
    relativePosition: number,
    viewportWidth: number,
) => {
    if (relativePosition === 0) {
        return 0;
    }

    const layout = getSlotLayout(viewportWidth);
    const direction = Math.sign(relativePosition);
    const distance = Math.abs(relativePosition);

    let mappedDistance: number;

    if (distance <= 1) {
        mappedDistance = hermite(
            0,
            layout.inner,
            layout.centerSlope,
            layout.innerSlope,
            distance,
        );
    } else if (distance <= 2) {
        const t = distance - 1;
        const eased = t * (2 - t);

        mappedDistance =
            layout.inner
            + (layout.outer - layout.inner) * eased;
    } else {
        mappedDistance =
            layout.outer
            + (distance - 2) * layout.exitSlope;
    }

    return direction * mappedDistance;
};

const getGalleryDepth = (relativePosition: number) =>
    Math.min(
        Math.abs(relativePosition) * 7,
        11.5,
    );

/* ============================================
   COMPONENT-LOCAL STYLES
============================================ */

const Section = styled('section')({
    position: 'relative',
    width: '100%',
    height: '100svh',
    overflow: 'hidden',
    background: '#fff',
    isolation: 'isolate',

    '@media (prefers-reduced-motion: reduce)': {
        height: 'auto',
        padding: '60px 0',
    },
});

const CanvasWrapper = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',

    '& canvas': {
        display: 'block',
        width: '100% !important',
        height: '100% !important',
    },

    '@media (prefers-reduced-motion: reduce)': {
        display: 'none',
    },
});

const DomStage = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    overflow: 'hidden',
    pointerEvents: 'none',

    '@media (prefers-reduced-motion: reduce)': {
        position: 'relative',
        overflowX: 'auto',
    },
});

const DomTrack = styled('div')({
    position: 'absolute',
    top: '17svh',
    left: 0,
    display: 'flex',
    gap: '8.75vw',
    width: 'max-content',
    pointerEvents: 'none',

    '@media (max-width: 1100px)': {
        top: '18svh',
        gap: '8vw',
    },

    '@media (max-width: 767px)': {
        top: '22svh',
        gap: '10vw',
    },

    '@media (prefers-reduced-motion: reduce)': {
        position: 'relative',
        top: 'auto',
        transform: 'none !important',
        paddingInline: '20px',
    },
});

const DomCard = styled('a')({
    position: 'relative',
    flex: '0 0 auto',
    width: 'clamp(460px, 52vw, 1020px)',
    aspectRatio: '1.64 / 1',
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    pointerEvents: 'auto',
    willChange: 'transform',

    '&:focus-visible': {
        outline: 'none',
    },

    '&:focus-visible [data-dom-media="true"]': {
        opacity: 1,
    },

    '&:focus-visible::after': {
        content: '""',
        position: 'absolute',
        inset: '-4px',
        border: '2px solid #111',
        borderRadius: '24px',
    },

    '@media (max-width: 1100px)': {
        width: '64vw',
    },

    '@media (max-width: 767px)': {
        width: '82vw',
        aspectRatio: '1.38 / 1',
    },

    '@media (prefers-reduced-motion: reduce)': {
        transform: 'none !important',
    },
});

const DomMedia = styled('div')({
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius: 'clamp(14px, 1.1vw, 22px)',
    opacity: 0,

    '& img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        userSelect: 'none',
        pointerEvents: 'none',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
    },
});

const WebglFallback = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: '#fff',
    color: 'rgba(0, 0, 0, 0.35)',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '12px',
    letterSpacing: '0.05em',
});

/* ============================================
   SHADERS
============================================ */

/*
 * Keeps original curved gallery geometry/orientation:
 * - original Z depth
 * - original side Y rotation/perspective
 * - original deterministic wring
 * - original subtle centre bow
 *
 * Horizontal lane placement now lives in one continuous screen-space mapping
 * shared by DOM and WebGL card centres. This prevents projected overlap and
 * avoids the original far-side X clamp that stacked multiple cards together.
 *
 * Intentionally NOT restored:
 * - ripple displacement / UV ripple
 * - flag-wave deformation
 *
 * Restored from original:
 * - deterministic side wring driven only by each card's live distance from
 *   centre. No time-based motion is involved.
 */
const CARD_VERTEX_SHADER = /* glsl */ `
  uniform float uRelativePosition;

  varying vec2 vUv;
  varying float vGalleryDistance;

  void main() {
    vUv = uv;

    vec4 worldPosition =
      modelMatrix * vec4(position, 1.0);

    float cardCenterX = modelMatrix[3][0];
    float cardCenterY = modelMatrix[3][1];

    float localX = worldPosition.x - cardCenterX;
    float localY = worldPosition.y - cardCenterY;

    float relativeDistance = abs(uRelativePosition);
    float sideSign = uRelativePosition < 0.0 ? -1.0 : 1.0;

    /*
     * Position itself is mapped in the DOM/scene driver so projected lanes and
     * clickable card centres share one source of truth. Geometry deformation
     * remains continuous and is driven by actual carousel progress.
     *
     * The original shader's useful deformation range ended around 1.28.
     * Capping only deformation strength (not X position) lets FAR cards become
     * strongly compressed without collapsing multiple cards to one coordinate.
     */
    float deformationDistance =
      min(relativeDistance, 1.28);

    /*
     * Original curve depth continues increasing through the outer lane.
     * Angle/wring strength caps separately so geometry never approaches the
     * unstable near-90-degree state rejected in the original implementation.
     */
    float galleryDepth =
      min(relativeDistance * 7.0, 11.5);

    float angleProgress =
      smoothstep(0.0, 1.28, deformationDistance);

    /* Original side-card perspective rotation. */
    float galleryAngle =
      sideSign *
      1.34 *
      angleProgress *
      angleProgress;

    /*
     * Original deterministic side wring.
     * No time, random motion, ripple or flag-wave input exists.
     */
    float sideAmount =
      smoothstep(0.28, 1.15, deformationDistance);

    float vertical =
      (uv.y - 0.5) * 2.0;

    float waistProfile =
      1.0 - pow(abs(vertical), 1.45);

    float waistScale =
      1.0 -
      sideAmount *
      waistProfile *
      0.24;

    float wringShear =
      sideSign *
      vertical *
      sideAmount *
      0.11;

    float wrungX =
      localX * waistScale +
      wringShear;

    float wrungZ =
      -localX *
      vertical *
      sideSign *
      sideAmount *
      0.075;

    /*
     * Reference-matched centre bow, adapted from the original static bow.
     *
     * Original used sin(uv.x * PI) * sin(uv.y * PI) * 0.040, which creates
     * a small dome concentrated around the card centre. The reference behaves
     * like a shallow vertical cylinder instead: curvature is horizontal and
     * stays consistent from top to bottom.
     *
     * Scale depth from the actual world-space card width so the bow remains
     * proportional across desktop/tablet/mobile without changing card size.
     * UVs stay untouched, so the screenshot texture wraps naturally.
     */
    const float PI = 3.14159265359;
    float centreFacing = 1.0 - sideAmount;
    float cardWorldWidth = length(modelMatrix[0].xyz);
    float centreBowStrength = cardWorldWidth * 0.115;
    float horizontalBow = sin(uv.x * PI);

    wrungZ +=
      horizontalBow *
      centreBowStrength *
      centreFacing;

    /* Whole-card curved-gallery Y rotation happens last. */
    float cosA = cos(galleryAngle);
    float sinA = sin(galleryAngle);

    float rotatedX =
      wrungX * cosA +
      wrungZ * sinA;

    float rotatedZ =
      -wrungX * sinA +
      wrungZ * cosA;

    worldPosition.x = cardCenterX + rotatedX;
    worldPosition.y = cardCenterY + localY;
    worldPosition.z = -galleryDepth + rotatedZ;

    vGalleryDistance = relativeDistance;

    gl_Position =
      projectionMatrix *
      viewMatrix *
      worldPosition;
  }
`;

const CARD_FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTextureAspect;
  uniform float uPlaneAspect;
  uniform vec2 uTexelSize;

  varying vec2 vUv;
  varying float vGalleryDistance;

  vec2 coverUv(
    vec2 uv,
    float planeAspect,
    float textureAspect
  ) {
    vec2 scale = vec2(1.0);

    if (textureAspect > planeAspect) {
      scale.x = planeAspect / textureAspect;
    } else {
      scale.y = textureAspect / planeAspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  float roundedMask(
    vec2 uv,
    float aspect,
    float radius
  ) {
    vec2 p = uv - 0.5;
    p.x *= aspect;

    vec2 halfSize = vec2(aspect * 0.5, 0.5);
    vec2 q = abs(p) - halfSize + radius;

    float sdf =
      length(max(q, 0.0)) +
      min(max(q.x, q.y), 0.0) -
      radius;

    return 1.0 - smoothstep(-0.003, 0.003, sdf);
  }

  void main() {
    vec2 imageUv =
      coverUv(
        vUv,
        uPlaneAspect,
        uTextureAspect
      );

    float mask =
      roundedMask(
        vUv,
        uPlaneAspect,
        0.034
      );

    if (mask < 0.5) {
      discard;
    }

    vec3 color =
      texture2D(
        uTexture,
        imageUv
      ).rgb;

    /* Preserve original progressive side-card blur. */
    float blurStrength =
      smoothstep(
        0.35,
        1.65,
        vGalleryDistance
      );

    float blurRadius =
      blurStrength * 7.0;

    vec2 blurStep =
      uTexelSize *
      blurRadius;

    vec3 blurredColor =
      texture2D(
        uTexture,
        imageUv
      ).rgb * 0.227027;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv + vec2(blurStep.x, 0.0)
      ).rgb * 0.1945946;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv - vec2(blurStep.x, 0.0)
      ).rgb * 0.1945946;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv + vec2(0.0, blurStep.y)
      ).rgb * 0.1216216;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv - vec2(0.0, blurStep.y)
      ).rgb * 0.1216216;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv + blurStep
      ).rgb * 0.035135;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv - blurStep
      ).rgb * 0.035135;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv + vec2(blurStep.x, -blurStep.y)
      ).rgb * 0.035135;

    blurredColor +=
      texture2D(
        uTexture,
        imageUv + vec2(-blurStep.x, blurStep.y)
      ).rgb * 0.035135;

    color =
      mix(
        color,
        blurredColor,
        blurStrength
      );

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
  }
`;

const GRID_VERTEX_SHADER = /* glsl */ `
  uniform float uCurveStrength;

  varying float vDepth;
  varying float vEdge;

  void main() {
    vec4 worldPosition =
      modelMatrix * vec4(position, 1.0);

    float normalizedX =
      clamp(
        worldPosition.x / 30.0,
        -1.0,
        1.0
      );

    float curve =
      normalizedX * normalizedX;

    worldPosition.y -=
      curve * uCurveStrength;

    worldPosition.z -=
      curve * 1.75;

    vDepth = -worldPosition.z;
    vEdge = abs(normalizedX);

    gl_Position =
      projectionMatrix *
      viewMatrix *
      worldPosition;
  }
`;

const GRID_FRAGMENT_SHADER = /* glsl */ `
  varying float vDepth;
  varying float vEdge;

  void main() {
    float depthFade =
      1.0 -
      smoothstep(
        8.0,
        42.0,
        vDepth
      );

    float edgeFade =
      1.0 -
      smoothstep(
        0.72,
        1.0,
        vEdge
      );

    float alpha =
      0.20 *
      depthFade *
      edgeFade;

    gl_FragColor =
      vec4(
        vec3(0.52),
        alpha
      );

    #include <colorspace_fragment>
  }
`;

/* ============================================
   DOM TRACK DRIVER
============================================ */

/*
 * One continuous RIGHT -> CENTER -> LEFT sequence.
 *
 * Increasing ScrollTrigger progress increases current index. For any fixed
 * card, relativeIndex decreases continuously, so that same physical card
 * moves from right to centre to left. There is no shortest-path wrapping,
 * static side-card layer or content replacement.
 *
 * DOM layout still owns responsive card dimensions, but centre positions use
 * a reference-driven continuous five-lane map. Inner side cards sit outside
 * the centre card's projected bounds; far cards sit at/just beyond viewport
 * edges. Mesh X is then compensated for its Z-depth projection, preventing
 * perspective from pulling side cards back underneath the centre card. Cards
 * outside ±2 accelerate offscreen instead of leaving slivers.
 */
function DomTrackDriver({
    cardRefs,
    trackRef,
    rectsRef,
    scrollRef,
    projectCount,
}: DomTrackDriverProps) {
    const { size } = useThree();

    const metricsRef = useRef<TrackMetrics>({
        step: 0,
        top: 0,
        cards: [],
    });

    const cacheMetrics = useCallback(() => {
        const track = trackRef.current;
        const cards = cardRefs.current;

        if (!track || !cards[0]) {
            return;
        }

        const firstCard = cards[0];
        const secondCard = cards[1] ?? null;

        const step = secondCard
            ? secondCard.offsetLeft - firstCard.offsetLeft
            : firstCard.offsetWidth;

        metricsRef.current = {
            step,
            top: track.offsetTop,
            cards: cards.map((card) => ({
                offsetLeft: card?.offsetLeft ?? 0,
                width: card?.offsetWidth ?? 0,
                height: card?.offsetHeight ?? 0,
            })),
        };
    }, [cardRefs, trackRef]);

    useEffect(() => {
        const frameId =
            window.requestAnimationFrame(cacheMetrics);

        window.addEventListener(
            'resize',
            cacheMetrics,
            { passive: true },
        );

        ScrollTrigger.addEventListener(
            'refresh',
            cacheMetrics,
        );

        return () => {
            window.cancelAnimationFrame(frameId);

            window.removeEventListener(
                'resize',
                cacheMetrics,
            );

            ScrollTrigger.removeEventListener(
                'refresh',
                cacheMetrics,
            );
        };
    }, [cacheMetrics]);

    useFrame(() => {
        const track = trackRef.current;
        const { step, top, cards } = metricsRef.current;

        if (
            !track
            || projectCount === 0
            || step === 0
            || size.width <= 0
            || size.height <= 0
        ) {
            return;
        }

        /*
         * Lock rendered carousel to measured ScrollTrigger progress.
         * No independent damping/state that can fall behind pin progress.
         */
        scrollRef.current.current =
            scrollRef.current.target;

        track.style.transform = 'none';

        const snapshots: RectSnapshot[] = [];

        for (
            let index = 0;
            index < cards.length;
            index++
        ) {
            const metric = cards[index];
            const cardElement =
                cardRefs.current[index];

            if (
                !metric
                || !cardElement
                || metric.width <= 0
            ) {
                continue;
            }

            const relativeIndex =
                index - scrollRef.current.current;

            const normalizedSlot =
                mapRelativeToSlot(
                    relativeIndex,
                    size.width,
                );

            const desiredCenter =
                size.width / 2
                + normalizedSlot * size.width / 2;

            const desiredLeft =
                desiredCenter
                - metric.width / 2;

            const translateX =
                desiredLeft - metric.offsetLeft;

            cardElement.style.transform =
                `translate3d(${translateX}px, 0, 0)`;

            snapshots[index] = {
                left: desiredLeft,
                top,
                width: metric.width,
                height: metric.height,
            };
        }

        rectsRef.current = snapshots;
    }, -100);

    return null;
}

/* ============================================
   WEBGL CARD
============================================ */

function MirroredCard({
    project,
    index,
    rectsRef,
    scrollRef,
}: MirroredCardProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    const texture = useTexture(project.image);
    const { size, viewport, gl, camera } = useThree();

    useEffect(() => {
        texture.colorSpace =
            THREE.SRGBColorSpace;

        texture.anisotropy = Math.min(
            8,
            gl.capabilities.getMaxAnisotropy(),
        );

        texture.minFilter =
            THREE.LinearMipmapLinearFilter;

        texture.magFilter =
            THREE.LinearFilter;

        texture.needsUpdate = true;
    }, [texture, gl]);

    const textureAspect = useMemo(() => {
        const image =
            texture.image as HTMLImageElement | undefined;

        if (
            !image?.naturalWidth
            || !image?.naturalHeight
        ) {
            return 1.64;
        }

        return (
            image.naturalWidth
            / image.naturalHeight
        );
    }, [texture]);

    const textureTexelSize = useMemo(() => {
        const image =
            texture.image as HTMLImageElement | undefined;

        if (
            !image?.naturalWidth
            || !image?.naturalHeight
        ) {
            return new THREE.Vector2(
                1 / 1024,
                1 / 1024,
            );
        }

        return new THREE.Vector2(
            1 / image.naturalWidth,
            1 / image.naturalHeight,
        );
    }, [texture]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: CARD_VERTEX_SHADER,
            fragmentShader: CARD_FRAGMENT_SHADER,

            uniforms: {
                uTexture: {
                    value: texture,
                },

                uTextureAspect: {
                    value: textureAspect,
                },

                uTexelSize: {
                    value: textureTexelSize,
                },

                uPlaneAspect: {
                    value: 1.64,
                },

                uRelativePosition: {
                    value: 0,
                },
            },

            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
            transparent: false,
            toneMapped: false,
        });
    }, [
        texture,
        textureAspect,
        textureTexelSize,
    ]);

    useEffect(() => {
        return () => {
            material.dispose();
        };
    }, [material]);

    useFrame(() => {
        const mesh = meshRef.current;
        const rect = rectsRef.current[index];

        if (
            !mesh
            || !rect
            || rect.width <= 0
            || rect.height <= 0
            || size.width <= 0
            || size.height <= 0
        ) {
            if (mesh) {
                mesh.visible = false;
            }

            return;
        }

        const relativePosition =
            index - scrollRef.current.current;

        const { visibleRange } =
            getSlotLayout(size.width);

        if (Math.abs(relativePosition) > visibleRange) {
            mesh.visible = false;
            return;
        }

        mesh.visible = true;

        const pixelToWorldX =
            viewport.width / size.width;

        const pixelToWorldY =
            viewport.height / size.height;

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const projectedX =
            (centerX - size.width / 2)
            * pixelToWorldX;

        const y =
            -(centerY - size.height / 2)
            * pixelToWorldY;

        /*
         * Pushing a mesh backward in Z also pulls its projected X toward the
         * screen centre. Compensate the mesh centre before the shader applies
         * depth so DOM lane positions remain the actual projected lane centres.
         * Without this, side cards drift under the centre card even when their
         * pre-depth X coordinates look correctly spaced.
         */
        const galleryDepth =
            getGalleryDepth(relativePosition);

        const cameraDistance =
            Math.abs(camera.position.z);

        const perspectiveCompensation =
            cameraDistance > 0
                ? (cameraDistance + galleryDepth)
                / cameraDistance
                : 1;

        const x =
            projectedX * perspectiveCompensation;

        mesh.position.set(x, y, 0);

        mesh.scale.set(
            rect.width * pixelToWorldX,
            rect.height * pixelToWorldY,
            1,
        );

        material.uniforms.uPlaneAspect.value =
            rect.width / rect.height;

        material.uniforms.uRelativePosition.value =
            relativePosition;
    });

    return (
        <mesh
            ref={meshRef}
            frustumCulled={false}
        >
            {/*
             * Original side wring is vertex-driven, so subdivisions are
             * required. Match original geometry density exactly.
             */}
            <planeGeometry args={[1, 1, 96, 48]} />

            <primitive
                object={material}
                attach="material"
            />
        </mesh>
    );
}

/* ============================================
   ORIGINAL CURVED GRID / HORIZON
============================================ */

function PerspectiveGrid() {
    const geometry = useMemo(() => {
        const positions: number[] = [];

        const minX = -32;
        const maxX = 32;
        const frontZ = 6;
        const backZ = -52;
        const floorY = -2.58;

        for (
            let x = minX;
            x <= maxX;
            x += 1.35
        ) {
            positions.push(
                x,
                floorY,
                frontZ,
            );

            positions.push(
                x,
                floorY,
                backZ,
            );
        }

        for (
            let z = frontZ;
            z >= backZ;
            z -= 1.22
        ) {
            positions.push(
                minX,
                floorY,
                z,
            );

            positions.push(
                maxX,
                floorY,
                z,
            );
        }

        const buffer =
            new THREE.BufferGeometry();

        buffer.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(
                positions,
                3,
            ),
        );

        return buffer;
    }, []);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader:
                GRID_VERTEX_SHADER,

            fragmentShader:
                GRID_FRAGMENT_SHADER,

            uniforms: {
                uCurveStrength: {
                    value: 0.72,
                },
            },

            transparent: true,
            depthWrite: false,
            depthTest: true,
        });
    }, []);

    useEffect(() => {
        return () => {
            geometry.dispose();
            material.dispose();
        };
    }, [geometry, material]);

    return (
        <lineSegments
            geometry={geometry}
            material={material}
            frustumCulled={false}
        />
    );
}

function Horizon() {
    return (
        <mesh position={[0, -2.53, -25]}>
            <planeGeometry args={[65, 0.012]} />

            <meshBasicMaterial
                color="#b8b8b8"
                transparent
                opacity={0.24}
                depthWrite={false}
            />
        </mesh>
    );
}

function CurvedProjectsContinuousScene({
    projects,
    cardRefs,
    trackRef,
    rectsRef,
    scrollRef,
}: CurvedProjectsSceneProps) {
    return (
        <>
            <PerspectiveGrid />
            <Horizon />

            <DomTrackDriver
                cardRefs={cardRefs}
                trackRef={trackRef}
                rectsRef={rectsRef}
                scrollRef={scrollRef}
                projectCount={projects.length}
            />

            {projects.map((project, index) => (
                <MirroredCard
                    key={`${project.href}-${index}`}
                    project={project}
                    index={index}
                    rectsRef={rectsRef}
                    scrollRef={scrollRef}
                />
            ))}
        </>
    );
}

/* ============================================
   SECTION
============================================ */

export default function CurvedProjectsContinuous({
    projects,
    sectionLabel = 'Featured projects',
}: CurvedProjectsContinuousProps) {
    const projectCount = projects.length;

    const leadingBufferCount =
        projectCount > 1
            ? Math.min(
                LEADING_BUFFER_COUNT,
                projectCount,
            )
            : 0;

    const loopedProjects = useMemo(() => {
        if (projectCount <= 1) {
            return projects;
        }

        const leadingProjects = Array.from(
            { length: leadingBufferCount },
            (_, index) => {
                const sourceIndex =
                    projectCount
                    - leadingBufferCount
                    + index;

                return projects[sourceIndex];
            },
        );

        const trailingProjects = Array.from(
            {
                length:
                    LOOP_CENTER_COUNT
                    + LOOKAHEAD_BUFFER_COUNT,
            },
            (_, index) =>
                projects[index % projectCount],
        );

        return [
            ...leadingProjects,
            ...projects,
            ...trailingProjects,
        ];
    }, [
        projects,
        projectCount,
        leadingBufferCount,
    ]);

    const startIndex =
        leadingBufferCount;

    const endIndex =
        projectCount > 1
            ? startIndex
            + projectCount
            + LOOP_CENTER_COUNT
            - 1
            : 0;

    const scrollSteps =
        Math.max(
            endIndex - startIndex,
            0,
        );

    const sectionRef =
        useRef<HTMLElement>(null);

    const trackRef =
        useRef<HTMLDivElement>(null);

    const cardRefs =
        useRef<(HTMLAnchorElement | null)[]>([]);

    const rectsRef =
        useRef<RectSnapshot[]>([]);

    const scrollRef =
        useRef<ScrollState>({
            target: startIndex,
            current: startIndex,
            velocity: 0,
        });

    useEffect(() => {
        const section =
            sectionRef.current;

        cardRefs.current.length =
            loopedProjects.length;

        if (!section || projectCount === 0) {
            return;
        }

        scrollRef.current.target = startIndex;
        scrollRef.current.current = startIndex;
        scrollRef.current.velocity = 0;

        if (
            window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches
        ) {
            return;
        }

        let refreshFrameOne = 0;
        let refreshFrameTwo = 0;

        const context = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',

                end: () => {
                    const projectDistance =
                        window.innerHeight
                        * Math.max(scrollSteps, 1)
                        * SCROLL_PER_CARD_VH;

                    const minimumDistance =
                        window.innerHeight * 3;

                    return `+=${Math.max(
                        projectDistance,
                        minimumDistance,
                    )}`;
                },

                pin: true,
                pinSpacing: true,
                anticipatePin: 1,

                /*
                 * Preserve project pin ordering:
                 * AnimationSection = 30
                 * CurvedProjects = 20
                 * Testimonials = 10
                 */
                refreshPriority: 20,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                    scrollRef.current.target =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.velocity =
                        self.getVelocity();
                },

                onRefresh: (self) => {
                    const syncedIndex =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.target = syncedIndex;
                    scrollRef.current.current = syncedIndex;
                    scrollRef.current.velocity = 0;
                },

                onEnter: (self) => {
                    const syncedIndex =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.target = syncedIndex;
                    scrollRef.current.current = syncedIndex;
                },

                onEnterBack: (self) => {
                    const syncedIndex =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.target = syncedIndex;
                    scrollRef.current.current = syncedIndex;
                },

                onLeave: () => {
                    scrollRef.current.target = endIndex;
                    scrollRef.current.current = endIndex;
                    scrollRef.current.velocity = 0;
                },

                onLeaveBack: () => {
                    scrollRef.current.target = startIndex;
                    scrollRef.current.current = startIndex;
                    scrollRef.current.velocity = 0;
                },
            });
        }, section);

        /*
         * Wait for neighboring effects/sections to mount their triggers before
         * one ordered global refresh, preserving pin measurement order.
         */
        refreshFrameOne =
            window.requestAnimationFrame(() => {
                refreshFrameTwo =
                    window.requestAnimationFrame(() => {
                        ScrollTrigger.sort();
                        ScrollTrigger.refresh();
                    });
            });

        return () => {
            window.cancelAnimationFrame(
                refreshFrameOne,
            );

            window.cancelAnimationFrame(
                refreshFrameTwo,
            );

            context.revert();
        };
    }, [
        loopedProjects.length,
        projectCount,
        startIndex,
        endIndex,
        scrollSteps,
    ]);

    return (
        <Section
            ref={sectionRef}
            aria-label={sectionLabel}
        >
            {/*
             * Invisible DOM cards remain responsive layout, link and focus
             * source. WebGL mirrors their dimensions/linear track positions.
             */}
            <DomStage>
                <DomTrack ref={trackRef}>
                    {loopedProjects.map(
                        (project, index) => (
                            <DomCard
                                key={`${project.href}-${index}`}
                                ref={(element) => {
                                    cardRefs.current[index] =
                                        element;
                                }}
                                href={project.href}
                                aria-label={`View ${project.title}`}
                            >
                                <DomMedia data-dom-media="true">
                                    <img
                                        src={project.image}
                                        alt=""
                                        draggable={false}
                                        loading={
                                            Math.abs(
                                                index - startIndex,
                                            ) <= 2
                                                ? 'eager'
                                                : 'lazy'
                                        }
                                        decoding="async"
                                    />
                                </DomMedia>
                            </DomCard>
                        ),
                    )}
                </DomTrack>
            </DomStage>

            <CanvasWrapper aria-hidden="true">
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 8.5],
                        fov: 45,
                        near: 0.1,
                        far: 90,
                    }}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: 'high-performance',
                    }}
                    fallback={(
                        <WebglFallback>
                            WebGL unavailable.
                        </WebglFallback>
                    )}
                >
                    <color
                        attach="background"
                        args={['#ffffff']}
                    />

                    <Suspense fallback={null}>
                        <CurvedProjectsContinuousScene
                            projects={loopedProjects}
                            cardRefs={cardRefs}
                            trackRef={trackRef}
                            rectsRef={rectsRef}
                            scrollRef={scrollRef}
                        />
                    </Suspense>
                </Canvas>
            </CanvasWrapper>
        </Section>
    );
}
