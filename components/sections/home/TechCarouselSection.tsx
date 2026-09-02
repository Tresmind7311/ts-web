'use client';

import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import gsap from 'gsap';

const WORDS = [
  'MERN', 'Shopify', 'WordPress',
  'Squarespace', 'Webflow', 'Contentful',
  'Joomla', 'Drupal', 'Storyblok',
  'Vue.js', 'Node.js', 'Bootstrap'
];

const FACES_PER_DIE = 3;
const CLONE_COUNT = 19;
const ROTS = [
  { ry: 270, a: 0.5 },
  { ry: 0, a: 0.85 },
  { ry: 90, a: 0.4 },
  { ry: 180, a: 0.0 }
];

// ─── Styles ──────────────────────────────────────────────────────────

const Section = styled('section')({
  position: 'relative',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  background: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const GridBg = styled('div')({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  perspective: '600px',
  perspectiveOrigin: '50% 50%',
  background: '#ffffff',
  '&::before': {
    content: '""',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(2,27,120,0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(2,27,120,0.12) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    backgroundPosition: 'center center',
    transform: 'rotateX(60deg)',
    transformOrigin: 'bottom center',
  },
});

const Pov = styled('div')({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Tray = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px', // match spacing
});

const Die = styled('div')({
  width: '400px',
  height: '55px',
  paddingBottom: '9px',
  perspective: '999px',
});

const Cube = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
});

const Face = styled('div')<{ faceIndex: number }>(({ faceIndex }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backfaceVisibility: 'hidden',
  fontSize: faceIndex === 0 ? '42px' : faceIndex === 1 ? '30px' : '28px',
  color: faceIndex === 0 ? '#19B6DE' : faceIndex === 1 ? '#021b78' : '#19B6DE',
  whiteSpace: 'nowrap',
  transform: `rotateY(${ROTS[faceIndex].ry}deg) translateZ(200px)`,
  transformOrigin: '50% 50% -201px',
}));

// ─── Component ─────────────────────────────────────────────────────

export default function TechCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const dieRefs = useRef<HTMLDivElement[]>([]);
  const cubeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cubes = cubeRefs.current;
      if (!cubes.length) return;

      // Set initial text and colors for each die
      cubes.forEach((cube, idx) => {
        const faces = cube.querySelectorAll('.face');
        const start = (idx * FACES_PER_DIE) % WORDS.length;
        faces.forEach((face, j) => {
          const wordIdx = (start + j) % WORDS.length;
          face.textContent = WORDS[wordIdx];
        });
      });

      // Animate each cube: rotate back and forth
      cubes.forEach((cube, i) => {
        gsap.timeline({
          repeat: -1,
          yoyo: true,
          defaults: { ease: 'power1.inOut', duration: 3 }
        })
          .fromTo(cube, { rotateY: -90 }, { rotateY: 90 })
          .progress(i / CLONE_COUNT);
      });

      // Tray-level animations
      const tray = trayRef.current;
      if (tray) {
        gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power1.inOut' } })
          .fromTo(tray, { yPercent: -3 }, { yPercent: 3, duration: 2 })
          .fromTo(tray, { rotate: -15 }, { rotate: 15, duration: 4 }, 0)
          .fromTo(tray, { scale: 1 }, { scale: 1.2, duration: 2, ease: 'power3.inOut' }, 0);

        // Stagger opacity
        gsap.from('.die', { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: 'power1.in' } });
      }

      // Resize handler – scale POV to fit viewport
      const resize = () => {
        const h = CLONE_COUNT * 56; // approximate height
        const pov = document.querySelector('.pov') as HTMLElement;
        if (pov) {
          gsap.set(pov, { scale: window.innerHeight / h });
        }
      };
      resize();
      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Build dies
  const dies = Array.from({ length: CLONE_COUNT }, (_, i) => i);

  return (
    <Section ref={sectionRef}>
      <GridBg />
      <Pov className="pov">
        <Tray ref={trayRef}>
          {dies.map((i) => (
            <Die
              key={i}
              className="die"
              ref={(el) => { if (el) dieRefs.current[i] = el; }}
            >
              <Cube
                ref={(el) => { if (el) cubeRefs.current[i] = el; }}
                className="cube"
              >
                {[0, 1, 2].map((faceIdx) => (
                  <Face key={faceIdx} faceIndex={faceIdx} className="face" />
                ))}
              </Cube>
            </Die>
          ))}
        </Tray>
      </Pov>
    </Section>
  );
}