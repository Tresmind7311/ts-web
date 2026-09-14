'use client';

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import type { ServiceShowcaseData } from '@/data/services/types';
import { tokens } from '@/theme/theme';
import Heading from '@/components/common/Heading';

interface ServiceShowcaseProps {
    data: ServiceShowcaseData;
}

/*
 * Content animation intentionally preserved.
 * Only collage/image-card animations have been removed.
 */
const contentReveal = keyframes`
    from {
        opacity: 0;
        transform: translateY(22px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.color.neutral0,
    paddingTop: 0,
    paddingBottom: '110px',

    [theme.breakpoints.down('md')]: {
        paddingBottom: '80px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingBottom: '64px',
    },
}));

/*
 * Reference collage is almost full viewport width.
 * maxWidth is disabled on the JSX Container below so MUI's lg max-width
 * no longer compresses the collage.
 */
const CollageViewport = styled(Container)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',

    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 20,
        width: 'clamp(55px, 7vw, 110px)',
        pointerEvents: 'none',
    },

    '&::before': {
        left: 0,
        background: `
            linear-gradient(
                90deg,
                ${tokens.color.neutral0} 0%,
                rgba(255, 255, 255, 0.92) 22%,
                rgba(255, 255, 255, 0.42) 62%,
                rgba(255, 255, 255, 0) 100%
            )
        `,
    },

    '&::after': {
        right: 0,
        background: `
            linear-gradient(
                270deg,
                ${tokens.color.neutral0} 0%,
                rgba(255, 255, 255, 0.92) 22%,
                rgba(255, 255, 255, 0.42) 62%,
                rgba(255, 255, 255, 0) 100%
            )
        `,
    },

    [theme.breakpoints.down('md')]: {
        '&::before, &::after': {
            width: '50px',
        },
    },

    [theme.breakpoints.down('sm')]: {
        '&::before, &::after': {
            width: '30px',
        },
    },
}));

const TopFade = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 15,
    height: '105px',
    pointerEvents: 'none',
    background: `
        linear-gradient(
            180deg,
            ${tokens.color.neutral0} 0%,
            rgba(255, 255, 255, 0.82) 20%,
            rgba(255, 255, 255, 0.38) 58%,
            rgba(255, 255, 255, 0) 100%
        )
    `,

    [theme.breakpoints.down('md')]: {
        height: '85px',
    },

    [theme.breakpoints.down('sm')]: {
        height: '65px',
    },
}));

/*
 * Desktop reference geometry:
 * - 9 columns
 * - ~167px cards around a 1729px viewport
 * - ~11px gaps
 * - collage spans ~92% of viewport, capped near reference width
 * - enough height for the two-card outer columns to continue beside heading
 */
const CollageStage = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
    alignItems: 'start',
    gap: '11px',
    width: '92vw',
    maxWidth: '1590px',
    height: '616px',
    margin: '0 auto',
    overflow: 'hidden',

    [theme.breakpoints.down('lg')]: {
        width: '94vw',
        gap: '10px',
        height: '560px',
    },

    [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: 'none',
        gap: '12px',
        height: '340px',
        paddingInline: '18px',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x proximity',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    [theme.breakpoints.down('sm')]: {
        height: '285px',
        gap: '10px',
        paddingInline: '14px',
    },
}));

/*
 * No translateY offsets.
 * Reference columns all begin on the same top baseline.
 * Vertical variation comes from placeholder height, not column movement.
 */
const Column = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    gap: '11px',

    [theme.breakpoints.down('md')]: {
        flex: '0 0 122px',
        scrollSnapAlign: 'start',
    },

    [theme.breakpoints.down('sm')]: {
        flexBasis: '102px',
        gap: '9px',
    },
}));

/*
 * #BFBFBF is the requested placeholder colour.
 * Reference uses it very softly over white, so opacity stays intentionally low.
 *
 * Each column supplies a different aspect-ratio to reproduce the varying
 * placeholder heights visible in the reference.
 */
const PlaceholderCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    aspectRatio: 'var(--placeholder-aspect)',
    borderRadius: '20px',
    backgroundColor: '#BFBFBF',
    opacity: 0.1,
    pointerEvents: 'none',

    [theme.breakpoints.down('sm')]: {
        borderRadius: '15px',
    },
}));

/*
 * Static cards: no opacity reveal, keyframes, delay or transform animation.
 * 0.79 width/height ratio matches the taller reference cards.
 */
const ImageCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    aspectRatio: '0.79 / 1',
    overflow: 'hidden',
    borderRadius: '20px',
    backgroundColor: tokens.color.neutral100,
    opacity: 1,

    [theme.breakpoints.down('sm')]: {
        borderRadius: '15px',
    },
}));

const CardImage = styled(Image)({
    objectFit: 'cover',
    objectPosition: 'center',
});

/*
 * Desktop stage is intentionally taller than the original.
 * Negative top margin lets outer collage columns continue downward beside
 * the centered copy, matching the reference composition.
 */
const ContentContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 25,
    marginTop: 'clamp(-105px, -6vw, -82px)',
    textAlign: 'center',
    opacity: 0,

    '&[data-visible="true"]': {
        animation: `${contentReveal} 720ms ${tokens.motion.ease} 700ms forwards`,
    },

    [theme.breakpoints.down('md')]: {
        marginTop: '8px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
        animation: 'none !important',
    },
}));

const Description = styled(Typography)(({ theme }) => ({
    maxWidth: '620px',
    margin: '22px auto 0',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.neutral700,

    [theme.breakpoints.down('md')]: {
        maxWidth: '580px',
        fontSize: '16px',
    },

    [theme.breakpoints.down('sm')]: {
        maxWidth: '92%',
        marginTop: '16px',
        fontSize: '15px',
    },
}));

interface CollageColumnLayout {
    /*
     * CSS aspect-ratio = width / height.
     * Lower value => taller placeholder.
     */
    placeholderAspect: number;
    imageIndexes: number[];
}

/*
 * Reference composition, left -> right.
 *
 * Image pool order is based on first unique occurrence in data.columns.
 * With the supplied/current data this resolves to:
 *   0 = purple/blue product image
 *   1 = food/AI image
 *   2 = cyan/mobile image
 *
 * This produces:
 *   C1  placeholder + image 0 + image 1
 *   C2  short placeholder + image 1 + image 2
 *   C3  tall placeholder + image 0
 *   C4  short placeholder + image 2
 *   C5  medium placeholder + image 0
 *   C6  short placeholder + image 1
 *   C7  tall placeholder + image 0
 *   C8  short placeholder + image 2 + image 1
 *   C9  medium/tall placeholder + image 1 + image 0
 *
 * Placeholder ratios were matched to the supplied reference screenshot.
 */
const COLLAGE_LAYOUT: CollageColumnLayout[] = [
    { placeholderAspect: 0.98, imageIndexes: [0, 1] },
    { placeholderAspect: 1.65, imageIndexes: [1, 2] },
    { placeholderAspect: 0.88, imageIndexes: [0] },
    { placeholderAspect: 1.52, imageIndexes: [2] },
    { placeholderAspect: 1.04, imageIndexes: [0] },
    { placeholderAspect: 1.52, imageIndexes: [1] },
    { placeholderAspect: 0.88, imageIndexes: [0] },
    { placeholderAspect: 1.66, imageIndexes: [2, 1] },
    { placeholderAspect: 0.96, imageIndexes: [1, 0] },
];

export default function ServiceShowcase({
    data,
}: ServiceShowcaseProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    /*
     * Build a stable pool of unique images while preserving their first
     * appearance order from existing data.
     *
     * Existing data API is preserved; no service data structure change needed.
     */
    const imagePool = useMemo(() => {
        const images = data.columns.flatMap((column) => column.images);
        const seen = new Set<string>();

        return images.filter((image) => {
            const key = String(image.src);

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
            return true;
        });
    }, [data.columns]);

    /*
     * Kept only for existing heading/description reveal.
     * Image cards no longer depend on IntersectionObserver.
     */
    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setInView(true);
                observer.disconnect();
            },
            {
                threshold: 0.18,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <Section
            ref={sectionRef}
            component="section"
            aria-labelledby="service-showcase-heading"
        >
            <CollageViewport
                maxWidth="lg"
                disableGutters
            >
                <TopFade aria-hidden="true" />

                <CollageStage>
                    {COLLAGE_LAYOUT.map((column, columnIndex) => (
                        <Column
                            key={columnIndex}
                            style={
                                {
                                    '--placeholder-aspect':
                                        String(column.placeholderAspect),
                                } as CSSProperties
                            }
                        >
                            <PlaceholderCard aria-hidden="true" />

                            {column.imageIndexes.map((imageIndex, imagePosition) => {
                                if (imagePool.length === 0) {
                                    return null;
                                }

                                const image =
                                    imagePool[imageIndex % imagePool.length];

                                return (
                                    <ImageCard
                                        key={`${String(image.src)}-${columnIndex}-${imagePosition}`}
                                    >
                                        <CardImage
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="
                                                (max-width: 600px) 102px,
                                                (max-width: 960px) 122px,
                                                (max-width: 1400px) 10vw,
                                                167px
                                            "
                                        />
                                    </ImageCard>
                                );
                            })}
                        </Column>
                    ))}
                </CollageStage>
            </CollageViewport>

            <ContentContainer
                maxWidth="lg"
                data-visible={inView ? 'true' : 'false'}
            >
                <Heading
                    id="service-showcase-heading"
                    variant="h2"
                    sx={{
                        width: 'min(100%, 700px)',
                        margin: '0 auto',
                    }}
                >
                    {data.title}
                </Heading>

                <Description component="p">
                    {data.description}
                </Description>
            </ContentContainer>
        </Section>
    );
}
