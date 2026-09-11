'use client';
import { useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

// ─── Data ───────────────────────────────────────────────────────────────────
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
const TEXT_PANEL_WIDTH = 'clamp(320px, 38vw, 520px)';
const CARD_GAP = 40;

// ═══════════════════════════════════════════════════════════════════
// Styled components
// ═══════════════════════════════════════════════════════════════════

const SectionWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh',
  background: tokens.color.ink900,
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
    'linear-gradient(to right,  rgba(248, 239, 239, 0.05) 1px, transparent 1px)',
    'linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '68px 68px',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 0%, #ffffff 55%, transparent 100%)',
  maskImage: 'radial-gradient(ellipse 80% 65% at 50% 0%, #ffffff 55%, transparent 100%)',
  pointerEvents: 'none',
});

// TextPanel is now a flex item inside GalleryTrack so it scrolls with the
// cards instead of fading out as an absolute overlay.
const TextPanel = styled(Box)({
  flexShrink: 0,
  width: TEXT_PANEL_WIDTH,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 clamp(24px, 5vw, 72px)',
  marginRight: `${CARD_GAP}px`,
  zIndex: 5,
});

const Eyebrow = styled('p')({
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: tokens.color.neutral200,
  margin: '0 0 20px',
});

const Heading = styled('h2')({
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: 'clamp(36px, 5.2vw, 64px)',
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
  color: tokens.color.neutral100,
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

const GalleryTrack = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  width: 'max-content',
  willChange: 'transform',
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

// Closing column — final horizontal item after all cards.
// Content and layout match the reference screenshot.
const ClosingColumn = styled(Box)({
  flexShrink: 0,
  width: 'clamp(480px, 50vw, 720px)',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 clamp(48px, 6vw, 96px)',
  marginLeft: `${CARD_GAP}px`,
});

const ClosingHeading = styled('h2')({
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: 'clamp(48px, 6.5vw, 96px)',
  lineHeight: 1.0,
  letterSpacing: '-0.04em',
  color: tokens.color.neutral100,
  margin: '0 0 28px',
});

const ClosingSubCopy = styled('p')({
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
  fontSize: 'clamp(14px, 1.15vw, 17px)',
  lineHeight: 1.7,
  color: tokens.color.neutral500,
  maxWidth: '440px',
  margin: '0 0 40px',
});

const ClosingCta = styled('a')({
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: tokens.color.neutral300,
  textDecoration: 'none',
  borderBottom: `1px solid ${alpha(tokens.color.neutral300, 0.4)}`,
  paddingBottom: '4px',
  alignSelf: 'flex-start',
  transition: 'color 200ms, border-color 200ms',
  '&:hover': {
    color: tokens.color.neutral0,
    borderColor: tokens.color.neutral0,
  },
});

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function LabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
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
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper ref={sectionRef} id="lab">
      <StickyFrame>
        <GridBackground />

        <GalleryTrack ref={trackRef}>

          {/* TextPanel is the first horizontal item — scrolls with the track */}
          <TextPanel>
            <Eyebrow>Creative Lab — Design in Motion</Eyebrow>
            <Heading>Where ideas become experiences.</Heading>
            <SubCopy>
              We explore motion, interaction, branding, AI, product design and
              immersive digital experiences to shape the future of creative work.
            </SubCopy>
          </TextPanel>

          {EXPERIMENTS.map((item) => (
            <CardWrap key={item.id} offsety={item.offsetY ?? 0}>
              <CardLabel>{item.code} · {item.status}</CardLabel>
              <CardImage
                src={item.image}
                alt={item.code}
                draggable={false}
                style={{ width: `${item.width}px`, height: `${item.height}px` }}
              />
            </CardWrap>
          ))}

          {/* Closing column — enters after the last card */}
          <ClosingColumn>
            <ClosingHeading>We never stop exploring.</ClosingHeading>
            <ClosingSubCopy>
              Innovation is not a department. It&rsquo;s our mindset.
            </ClosingSubCopy>
            <ClosingCta href="#contact">Explore More &rarr;</ClosingCta>
          </ClosingColumn>

        </GalleryTrack>

      </StickyFrame>
    </SectionWrapper>
  );
}