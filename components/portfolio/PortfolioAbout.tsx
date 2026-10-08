'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { PrimaryButton } from '@/components/common/Button';
import { gsap } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

const Section = styled('section')(({ theme }) => ({
    backgroundColor: '#f2fdff',
    padding: '78px 40px 80px',
    [theme.breakpoints.down('md')]: { padding: '64px 24px' },
    [theme.breakpoints.down('sm')]: { padding: '48px 20px' },
}));

const Inner = styled('div')({
    width: '100%',
    maxWidth: 1284,
    margin: '0 auto',
});

const Intro = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.84fr) minmax(0, 1fr)',
    alignItems: 'start',
    gap: 40,
    [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 24 },
}));

const Title = styled(Heading)(({ theme }) => ({
    fontFamily: 'var(--font-display)',
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.2,
    textTransform: 'none',
    [theme.breakpoints.down('md')]: { fontSize: 40 },
    [theme.breakpoints.down('sm')]: { fontSize: 34 },
}));

const Description = styled('p')(({ theme }) => ({
    margin: 0,
    minWidth: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '0.02em',
    textAlign: 'justify',
    color: tokens.color.neutral700,
    [theme.breakpoints.down('sm')]: { fontSize: 16, lineHeight: 1.6, textAlign: 'left', letterSpacing: 'normal' },
}));

const Gallery = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 442fr) minmax(0, 442fr) minmax(0, 364fr)',
    alignItems: 'end',
    gap: 18,
    marginTop: 96,
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 20,
        marginTop: 48,
    },
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: 24, marginTop: 32 },
}));

const ImageFrame = styled('div')({
    minWidth: 0,
    overflow: 'hidden',
    borderRadius: 20,
});

const Photo = styled(Image)({
    display: 'block',
    width: '100%',
    height: 'auto',
});

const Callout = styled('div')(({ theme }) => ({
    minWidth: 0,
    [theme.breakpoints.down('md')]: { gridColumn: '1 / -1' },
}));

const CalloutTitle = styled('p')({
    margin: '0 0 22px',
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '33px',
    color: tokens.color.neutral700,
});

export default function PortfolioAbout() {
    const sectionRef = useRef<HTMLElement>(null);
    const played = useRef(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const media = gsap.matchMedia();
        media.add({
            reduced: '(prefers-reduced-motion: reduce)',
            animated: '(prefers-reduced-motion: no-preference)',
        }, (context) => {
            // Content is visible by default, including without JavaScript.
            if (context.conditions?.reduced) {
                played.current = true;
                return;
            }
            if (played.current) return;

            const text = section.querySelectorAll('[data-about-text]');
            const images = section.querySelectorAll('[data-about-image]');
            gsap.timeline({
                scrollTrigger: { trigger: section, start: 'top 85%', once: true },
                onComplete: () => { played.current = true; },
            })
                .from(text, { autoAlpha: 0, y: 16, duration: 0.65, stagger: 0.1, ease: 'power2.out' })
                .from(images, { autoAlpha: 0, y: 20, scale: 1.015, duration: 0.85, stagger: 0.12, ease: 'power2.out' }, 0.15);
        });

        return () => media.revert();
    }, []);

    return (
        <Section ref={sectionRef} aria-labelledby="portfolio-about-heading">
            <Inner>
                <Intro>
                    <Title id="portfolio-about-heading" variant="h2" data-about-text>About Tresmind</Title>
                    <Description data-about-text>
                        At Tresmind Solution, we believe marketing isn&apos;t about selling it&apos;s about connecting. We&apos;re a full-service marketing agency built to help brands grow with purpose and data-driven precision. From crafting compelling stories to executing campaigns that convert, we blend strategy to turn attention into action.
                    </Description>
                </Intro>
                <Gallery>
                    <ImageFrame>
                        <Photo data-about-image src="/images/Portfolio/portfolio-about-1.png" alt="A team member collaborating with a colleague" width={442} height={358} sizes="(max-width: 639px) 100vw, (max-width: 959px) 50vw, 33vw" />
                    </ImageFrame>
                    <ImageFrame>
                        <Photo data-about-image src="/images/Portfolio/portfolio-about-2.png" alt="Team members discussing ideas around a meeting table" width={442} height={358} sizes="(max-width: 639px) 100vw, (max-width: 959px) 50vw, 33vw" />
                    </ImageFrame>
                    <Callout>
                        <CalloutTitle data-about-text>Our Bold and<br />Brilliant Thinkers</CalloutTitle>
                        <div data-about-text>
                            <PrimaryButton component="a" href="/services" sx={{ minHeight: 52, borderRadius: '14px', fontSize: { xs: 20, md: 24 }, padding: '10px 30px' }}>
                                Learn More&nbsp; <span aria-hidden="true">→</span>
                            </PrimaryButton>
                        </div>
                    </Callout>
                </Gallery>
            </Inner>
        </Section>
    );
}
