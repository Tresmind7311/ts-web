'use client';
import { useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

// ─── Data ───────────────────────────────────────────────────────────────────
// First entry is the "hero" card — larger, matches the initial screenshot
// (text left, one big image right). Everything after it is the horizontal
// gallery revealed as the user keeps scrolling. Swap `image` for real
// assets anytime — width/height/offsetY control each card's size and the
// scattered vertical stagger from the reference.
const EXPERIMENTS = [
  {
    id: 0,
    code: 'EXP—0142',
    status: 'ACTIVE',
    image: 'Labsection/elderly-man-question-mark-collage.jpg',
    width: 640,
    height: 440,
    offsetY: 0,
  },
  {
    id: 1,
    code: 'EXP—0131',
    status: 'CONCEPT',
    image: 'Labsection/black-arch-gate-desert-moon.jpg',
    width: 300,
    height: 390,
    // offsetY: -50,
  },
  {
    id: 2,
    code: 'EXP—0120',
    status: 'LIVE TEST',
    image: 'Labsection/girl-skateboard-mini-planet-world.jpg',
    width: 560,
    height: 340,
    // offsetY: 70,
  },
  {
    id: 3,
    code: 'EXP—0118',
    status: 'GENERATIVE',
    image: 'Labsection/glowing-rose-in-lightbulb.jpg',
    width: 330,
    height: 410,
    // offsetY: -30,
  },
  {
    id: 4,
    code: 'EXP—0107',
    status: 'PROTOTYPE',
    image: 'Labsection/glass-globe-pendant-lamp-golden-swirl.jpg',
    width: 520,
    height: 350,
    // offsetY: 40,
  },
  {
    id: 5,
    code: 'EXP—0094',
    status: 'ARCHIVED',
    image: 'Labsection/stone-hand-washing-machine-flowers-rocks.jpg',
    width: 320,
    height: 400,
    // offsetY: -60,
  },
  {
    id: 6,
    code: 'EXP—0094',
    status: 'ARCHIVED',
    image: 'Labsection/red-cube-clouds-dark-room.jpg',
    width: 520,
    height: 400,
    // offsetY: 40,
  },
  {
    id: 7,
    code: 'EXP—0094',
    status: 'ARCHIVED',
    image: 'Labsection/woman-vr-headset-blue-floral.jpg',
    width: 320,
    height: 400,
    // offsetY: -60,
  },
];

// ─── Layout constants ───────────────────────────────────────────────────────
const TEXT_PANEL_WIDTH = 'clamp(320px, 38vw, 520px)'; // reserved space before first card
const CARD_GAP = 40;
// Text panel fades out over this fraction of total scroll progress (0–1).
const TEXT_FADE_END = 0.16;

// ═══════════════════════════════════════════════════════════════════
// Styled components
// ═══════════════════════════════════════════════════════════════════

const SectionWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh', // GSAP pin adds the scroll-distance spacer automatically
  background: tokens.color.neutral0,
  overflow: 'hidden',
});

const StickyFrame = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
});

const GridBackground = styled(Box)({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  backgroundImage: [
    'linear-gradient(to right,  rgba(0,0,0,0.05) 1px, transparent 1px)',
    'linear-gradient(to bottom, rgba(2,2,2,0.05) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '68px 68px',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 0%, #000 55%, transparent 100%)',
  maskImage: 'radial-gradient(ellipse 80% 65% at 50% 0%, #000 55%, transparent 100%)',
  pointerEvents: 'none',
});

const TextPanel = styled(Box)({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: TEXT_PANEL_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 clamp(24px, 5vw, 72px)',
  zIndex: 5,
  // A soft fade so the gallery track doesn't hard-cut behind the text
  background: `linear-gradient(90deg, ${tokens.color.neutral0} 75%, ${alpha(tokens.color.neutral0, 0)} 100%)`,
  pointerEvents: 'none',
});

const Eyebrow = styled('p')({
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: tokens.color.neutral500,
  margin: '0 0 20px',
});

const Heading = styled('h2')({
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: 'clamp(36px, 5.2vw, 64px)',
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
  color: tokens.color.ink900,
  margin: '0 0 24px',
});

const SubCopy = styled('p')({
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
  fontSize: 'clamp(14px, 1.2vw, 16px)',
  lineHeight: 1.65,
  color: tokens.color.neutral500,
  maxWidth: '360px',
  margin: 0,
});

// The scrolling track — width: max-content so scrollWidth reflects the
// true total width of all cards, exactly like the reference implementation.
const GalleryTrack = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  width: 'max-content',
  willChange: 'transform',
});

// Leading spacer reserves room for TextPanel so the first card starts at
// the correct x position on load — matches the initial screenshot exactly.
const LeadSpacer = styled(Box)({
  flexShrink: 0,
  width: TEXT_PANEL_WIDTH,
});

const CardWrap = styled(Box)<{ offsety: number }>(({ offsety }) => ({
  position: 'relative',
  flexShrink: 0,
  marginRight: `${CARD_GAP}px`,
  transform: `translateY(${offsety}px)`,
}));

const CardLabel = styled('p')({
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  fontSize: '10px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: tokens.color.neutral500,
  margin: '0 0 10px',
  whiteSpace: 'nowrap',
});

const CardImage = styled('img')({
  display: 'block',
  objectFit: 'cover',
  borderRadius: '4px',
  boxShadow: '0 20px 48px rgba(0,0,0,0.10)',
  userSelect: 'none',
});

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function LabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // ── Same horizontal-scroll technique as the reference file ────────
      // getScrollAmount / paused tween / ScrollTrigger pin+scrub with an
      // `end` computed from that same amount — identical structure, just
      // applied to the gallery track instead of giant text.
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => getScrollAmount(),
        ease: 'none',
        paused: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Text panel fades + lifts slightly over the first slice of
          // scroll progress, then stays hidden — matches the second
          // screenshot, where the gallery has taken the full width.
          const t = Math.min(1, self.progress / TEXT_FADE_END);
          const el = textRef.current;
          if (el) {
            el.style.opacity = String(1 - t);
            el.style.transform = `translateY(${-t * 24}px)`;
            el.style.pointerEvents = t > 0.9 ? 'none' : '';
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper ref={sectionRef} id="lab">
      <StickyFrame>
        <GridBackground />

        <TextPanel ref={textRef}>
          <Eyebrow>Creative Lab — Design in Motion</Eyebrow>
          <Heading>Where ideas become experiences.</Heading>
          <SubCopy>
            We explore motion, interaction, branding, AI, product design and
            immersive digital experiences to shape the future of creative work.
          </SubCopy>
        </TextPanel>

        <GalleryTrack ref={trackRef}>
          <LeadSpacer />
          {EXPERIMENTS.map((item) => (
            <CardWrap key={item.id} offsety={item.offsetY}>
              <CardLabel>{item.code} · {item.status}</CardLabel>
              <CardImage
                src={item.image}
                alt={item.code}
                draggable={false}
                style={{ width: `${item.width}px`, height: `${item.height}px` }}
              />
            </CardWrap>
          ))}
        </GalleryTrack>

      </StickyFrame>
    </SectionWrapper>
  );
}