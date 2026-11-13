'use client';

import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import ServiceCapabilities from './sections/ServiceCapabilities';
import ServiceEcosystemSection from './sections/ServiceEcosystemSection';
import ServiceFaq from './sections/ServiceFaq';
import ServiceProcess from './sections/ServiceProcess';
import ServiceShowcase from './sections/ServiceShowcase';
import ServiceHero from './sections/ServiceHero';
import type { ServiceData, ServiceProcessData } from '@/data/services/types';
import { tokens } from '@/theme/theme';

type ChildServicePage = NonNullable<ServiceData['detail']> & { processForegroundImage?: { src: string; alt: string } };

const processArtByParent: Record<string, {
    backgroundImage: string;
    foregroundImage: string;
    foregroundAlt: string;
    showcaseImages: { src: string; alt: string }[];
    explainerImage: { src: string; alt: string };
}> = {
    '/services/mobile-app-development': {
        backgroundImage: '/images/services/mobile-app-development/process-bg.jpg',
        foregroundImage: '/images/services/mobile-app-development/process-01.png',
        foregroundAlt: 'Mobile application development process',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/mobile-app-development/mob-dev-${n}.png`, alt: `Mobile app interface concept ${n}` })),
        explainerImage: { src: '/images/services/mobile-app-development/API-Backend.jpg', alt: 'Mobile application connected to an API and backend' },
    },
    '/services/software-development': {
        backgroundImage: '/images/services/software-development/Requirements-Discovery-bg.png',
        foregroundImage: '/images/services/software-development/Requirements-Discovery.png',
        foregroundAlt: 'Software requirements discovery',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/software-development/Software-DEVELOPMENT-${n}.png`, alt: `Software development concept ${n}` })),
        explainerImage: { src: '/images/services/software-development/Dashboard.png', alt: 'Business software dashboard interface' },
    },
    '/services/web-development': {
        backgroundImage: '/images/services/software-development/Requirements-Discovery-bg.png',
        foregroundImage: '/images/services/software-development/Requirements-Discovery.png',
        foregroundAlt: 'Website requirements discovery',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/web-development/web-dev-${n}.png`, alt: `Web development concept ${n}` })),
        explainerImage: { src: '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png', alt: 'Website and web application design' },
    },
    '/services/ai-development': {
        backgroundImage: '/images/services/ai-development/process-bg.png',
        foregroundImage: '/images/services/ai-development/Requirements-Discovery.png',
        foregroundAlt: 'AI use case discovery',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/ai-development/ai-development-${n}.png`, alt: `AI development concept ${n}` })),
        explainerImage: { src: '/images/services/ai-development/AI-Feature.png', alt: 'Artificial intelligence feature interface' },
    },
    '/services/cloud-consulting': {
        backgroundImage: '/images/services/cloud-consulting/process-bg.png',
        foregroundImage: '/images/services/cloud-consulting/Cloud-Computing-process.png',
        foregroundAlt: 'Cloud consulting process',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/cloud-consulting/Cloud-computing-${n}.png`, alt: `Cloud computing concept ${n}` })),
        explainerImage: { src: '/images/services/cloud-consulting/Cloud-computing-hero.png', alt: 'Cloud infrastructure architecture' },
    },
    '/services/graphic-designing': {
        backgroundImage: '/images/services/graphic-designing/process-bg.png',
        foregroundImage: '/images/services/graphic-designing/process-img.png',
        foregroundAlt: 'Graphic design process',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/graphic-designing/graphic-designing-${n}.png`, alt: `Graphic design concept ${n}` })),
        explainerImage: { src: '/images/services/graphic-designing/graphic-designing-hero.png', alt: 'Graphic design composition' },
    },
    '/services/staff-augmentation': {
        backgroundImage: '/images/services/software-development/Requirements-Discovery-bg.png',
        foregroundImage: '/images/services/software-development/Requirements-Discovery.png',
        foregroundAlt: 'Team requirements and role discovery',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/software-development/Software-DEVELOPMENT-${n}.png`, alt: `Software team work concept ${n}` })),
        explainerImage: { src: '/images/services/software-development/Dashboard.png', alt: 'Software team working with a business dashboard' },
    },
    '/services/blockchain-development': {
        backgroundImage: '/images/services/ai-development/process-bg.png',
        foregroundImage: '/images/services/ai-development/Requirements-Discovery.png',
        foregroundAlt: 'Technology project requirements discovery',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/ai-development/ai-development-${n}.png`, alt: `Technology concept ${n}` })),
        explainerImage: { src: '/images/services/ai-development/AI-Feature.png', alt: 'Digital technology interface concept' },
    },
    '/services/digital-marketing': {
        backgroundImage: '/images/services/graphic-designing/process-bg.png',
        foregroundImage: '/images/services/graphic-designing/process-img.png',
        foregroundAlt: 'Digital content planning process',
        showcaseImages: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/images/services/graphic-designing/graphic-designing-${n}.png`, alt: `Digital creative concept ${n}` })),
        explainerImage: { src: '/images/services/graphic-designing/graphic-designing-hero.png', alt: 'Digital campaign creative design' },
    },
};

const iosProcessForegroundImages = Array.from({ length: 5 }, (_, index) => ({
    src: `/images/services/mobile-app-development/ios-development/ios-process-foreground-${index + 1}.png`,
    alt: `iOS app development process step ${index + 1}`,
}));

const androidProcessForegroundImages = Array.from({ length: 5 }, (_, index) => ({
    src: `/images/services/mobile-app-development/android-development/android-process-foreground-${index + 1}.png`,
    alt: `Android app development process step ${index + 1}`,
}));

const crossPlatformProcessForegroundImages = Array.from({ length: 5 }, (_, index) => ({
    src: `/images/services/mobile-app-development/cross-platform-development/cross-platform-process-foreground-${index + 1}.png`,
    alt: `Cross-platform app development process step ${index + 1}`,
}));

const iosShowcaseImages = Array.from({ length: 13 }, (_, index) => ({
    src: `/images/services/mobile-app-development/ios-development/ios-app-development-${index + 1}.jpg`,
    alt: `iOS app development showcase ${index + 1}`,
}));

const iosShowcaseColumns = [
    { images: iosShowcaseImages.slice(0, 4) },
    { images: iosShowcaseImages.slice(4, 7) },
    { images: iosShowcaseImages.slice(7, 10) },
    { images: iosShowcaseImages.slice(10, 13) },
];

const androidShowcaseImages = Array.from({ length: 13 }, (_, index) => ({
    src: `/images/services/mobile-app-development/android-development/android-app-development-${index + 1}.jpg`,
    alt: `Android app development showcase ${index + 1}`,
}));

const androidShowcaseColumns = [
    { images: androidShowcaseImages.slice(0, 4) },
    { images: androidShowcaseImages.slice(4, 7) },
    { images: androidShowcaseImages.slice(7, 10) },
    { images: androidShowcaseImages.slice(10, 13) },
];

const crossPlatformShowcaseImages = Array.from({ length: 13 }, (_, index) => ({
    src: `/images/services/mobile-app-development/cross-platform-development/cross-platform-app-development-${index + 1}.jpg`,
    alt: `Cross-platform app development showcase ${index + 1}`,
}));

const crossPlatformShowcaseColumns = [
    { images: crossPlatformShowcaseImages.slice(0, 4) },
    { images: crossPlatformShowcaseImages.slice(4, 7) },
    { images: crossPlatformShowcaseImages.slice(7, 10) },
    { images: crossPlatformShowcaseImages.slice(10, 13) },
];

const containerStyles = {
    width: 'min(100% - 48px, 1200px)',
    marginInline: 'auto',
    '@media (max-width: 599px)': { width: 'min(100% - 32px, 1200px)' },
};

const Page = styled('main')({
    color: tokens.color.ink900,
    '& a:focus-visible': { outline: `2px solid ${tokens.color.uv800}`, outlineOffset: '4px' },
});

const Container = styled('div')(containerStyles);

const Hero = styled('section')({
    background: "#f7fafc url('/images/services/Main/hero-background.jpg') center / cover no-repeat",
    padding: '48px 0 96px',
    '@media (max-width: 599px)': { padding: '28px 0 64px' },
});

const Breadcrumbs = styled('nav')({
    '& ol': {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        columnGap: '8px',
        rowGap: '4px',
        padding: 0,
        margin: '0 0 72px',
        listStyle: 'none',
        fontSize: '14px',

        '@media (max-width: 599px)': {
            marginBottom: '48px',
        },
    },

    '& li': {
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '44px',
        lineHeight: 1.5,
    },

    '& li:not(:last-child)::after': {
        content: "'/'",
        paddingLeft: '8px',
        color: tokens.color.neutral600,
    },

    '& a': {
        display: 'inline-flex',
        alignItems: 'center',
        minWidth: '44px',
        minHeight: '44px',
        color: tokens.color.uv800,
        textUnderlineOffset: '3px',
    },
});

const leadStyles = {
    maxWidth: '780px', fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.65,
};

const HeroContent = styled('div')({ maxWidth: '820px', '& p': leadStyles });
const Lead = styled('p')(leadStyles);
const Actions = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '32px' });

const buttonStyles = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '52px', padding: '12px 24px', borderRadius: tokens.radius.md,
    textDecoration: 'none', fontWeight: 600,
};

const PrimaryButton = styled(Link)({
    ...buttonStyles,
    background: 'linear-gradient(100deg, #10136c 0%, #04b6d8 80%)',
    color: tokens.color.neutral0,
});

const SecondaryButton = styled(Link)({
    ...buttonStyles, border: `1px solid ${tokens.color.uv800}`, color: tokens.color.uv800,
});

const Section = styled('section')({
    padding: 'clamp(64px, 7vw, 96px) 0',
    background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff',
    '& h2': { maxWidth: '950px' },
    '& p': { lineHeight: 1.65 },
    '& ul': { paddingLeft: '22px', lineHeight: 1.8 },
    '& li': { marginBottom: '10px' },
});

const WhiteSection = styled(Section)({ background: tokens.color.neutral0 });

const ExplainerLayout = styled(Container)({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
    alignItems: 'center',
    gap: 'clamp(40px, 6vw, 88px)',
    '@media (max-width: 767px)': {
        gridTemplateColumns: '1fr',
        gap: '36px',
    },
});

const ExplainerCopy = styled('div')({
    '& h2': { maxWidth: '650px' },
    '& p': { marginBottom: 0 },
});

const ExplainerVisual = styled('div')({
    position: 'relative',
    minHeight: 'clamp(280px, 32vw, 390px)',
    overflow: 'hidden',
    borderRadius: '28px',
    background: `radial-gradient(circle at 78% 25%, #dff6fd 0%, transparent 45%), ${tokens.color.neutral0} url('/images/services/Main/hero-background.jpg') center / cover no-repeat`,
    border: `1px solid ${tokens.color.neutral100}`,
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: '14% 15% 19% 12%',
        borderRadius: '24px',
        background: tokens.color.neutral0,
        boxShadow: '0 24px 60px rgba(16, 19, 108, 0.12)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        inset: '26% 8% 11% 31%',
        borderRadius: '22px',
        border: `1px solid ${tokens.color.neutral100}`,
        background: 'linear-gradient(145deg, rgba(4, 182, 216, 0.14), rgba(16, 19, 108, 0.08))',
        boxShadow: '0 16px 40px rgba(16, 19, 108, 0.08)',
    },
    '&:has(img)::before, &:has(img)::after': { display: 'none' },
    '& img': { objectFit: 'cover' },
    '@media (max-width: 767px)': { minHeight: '280px' },
});

const Split = styled('div')({
    ...containerStyles,
    display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px',
    '@media (max-width: 767px)': { gridTemplateColumns: '1fr' },
    '@media (max-width: 599px)': containerStyles['@media (max-width: 599px)'],
});

const DetailCard = styled('div')(({ theme }) => ({
    minWidth: 0,
    padding: 'clamp(28px, 3vw, 44px)',
    borderRadius: '24px',
    border: `1px solid ${tokens.color.neutral100}`,
    background: tokens.color.neutral0,
    boxShadow: tokens.shadow.sm,
    '& h2': { marginBottom: '20px' },
    '& p': { marginBottom: '24px', color: tokens.color.neutral700 },
    [theme.breakpoints.down('sm')]: { borderRadius: '20px' },
}));

const DetailList = styled('ul')({
    '&&': { listStyle: 'none', padding: 0, margin: 0 },
});

const DetailItem = styled('li')({
    '&&': {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        margin: 0,
        padding: '14px 0',
    },
    '&:not(:last-child)': { borderBottom: `1px solid ${tokens.color.neutral100}` },
    '&::before': {
        content: '"✓"',
        display: 'grid',
        flex: '0 0 22px',
        placeItems: 'center',
        width: '22px',
        height: '22px',
        marginTop: '3px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${tokens.color.uv800}, #04b6d8)`,
        color: tokens.color.neutral0,
        fontSize: '13px',
        lineHeight: 1,
    },
});

const Cta = styled(Section)({
    background: `${tokens.color.uv800} url('/footer-bg.jpg') top center / cover no-repeat`,
    color: tokens.color.neutral0,
    '& h2': { color: tokens.color.neutral0 },
    '& a': { background: tokens.color.neutral0, color: tokens.color.uv800 },
    '& a:focus-visible': { outlineColor: tokens.color.neutral0 },
});

const Related = styled('nav')({
    ...containerStyles,
    display: 'flex', flexWrap: 'wrap', gap: '20px', paddingBlock: '20px 64px',
    '& a': { display: 'inline-flex', alignItems: 'center', minWidth: '44px', minHeight: '44px', color: tokens.color.uv800, textUnderlineOffset: '3px' },
});

export default function MobileChildPage({ page }: { page: ChildServicePage }) {
    const iosChild = page.slug === 'ios-app-development';
    const androidChild = page.slug === 'android-app-development';
    const crossPlatformChild = page.slug === 'cross-platform-app-development';
    const generativeAiChild = page.slug === 'generative-ai';
    const graphicDesignChild = page.parentPath === '/services/graphic-designing';
    const processArt = graphicDesignChild ? undefined : processArtByParent[page.parentPath] ??
        processArtByParent[`/services/${page.slug}`];
    const showcaseImages = processArt?.showcaseImages ?? [];
    const graphicShowcaseImages = [page.introduction.image, ...page.cards.map(card => card.image)]
        .filter((image): image is NonNullable<typeof image> => Boolean(image));
    const explainerImage = page.explainer.image ?? processArt?.explainerImage;

    const breadcrumbs = (
        <Breadcrumbs aria-label="Breadcrumb">
            <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                {page.parentPath !== '/services' && <li><Link href={page.parentPath}>{page.parentName}</Link></li>}
                <li aria-current="page">{page.name}</li>
            </ol>
        </Breadcrumbs>
    );

    return (
        <Page>
            {iosChild || androidChild || crossPlatformChild || generativeAiChild ? (
                <ServiceHero
                    headingId="child-service-title"
                    breadcrumbs={breadcrumbs}
                    data={{
                        title: page.hero.title,
                        description: page.hero.description,
                        primaryCta: { label: page.hero.cta, href: '/contact' },
                        secondaryCta: { label: `Explore ${page.parentName.toLowerCase()}`, href: page.parentPath },
                        image: page.hero.image ?? {
                            src: iosChild
                                ? '/images/services/mobile-app-development/ios-development/ios-hero.png'
                                : androidChild
                                    ? '/images/services/mobile-app-development/android-development/android-hero.png'
                                    : '/images/services/mobile-app-development/cross-platform-development/cross-platform-hero.png',
                            alt: iosChild
                                ? 'iOS app interface displayed across Apple devices'
                                : androidChild
                                    ? 'Android app interface displayed across mobile devices'
                                    : 'Hand holding a phone with cross-platform app and app store visuals',
                        },
                    }}
                />
            ) : <Hero aria-labelledby="child-service-title">
                <Container>
                    {breadcrumbs}
                    <HeroContent>
                        <Heading id="child-service-title" variant="h1">{page.hero.title}</Heading>
                        <p>{page.hero.description}</p>
                        <Actions>
                            <PrimaryButton href="/contact">{page.hero.cta}</PrimaryButton>
                            <SecondaryButton href={page.parentPath}>Explore {page.parentName.toLowerCase()}</SecondaryButton>
                        </Actions>
                    </HeroContent>
                </Container>
            </Hero>}

            <ServiceShowcase data={{
                title: page.introduction.title,
                description: page.introduction.text,
                columns: page.slug === 'ios-app-development'
                    ? iosShowcaseColumns
                    : page.slug === 'android-app-development'
                    ? androidShowcaseColumns
                    : page.slug === 'cross-platform-app-development'
                    ? crossPlatformShowcaseColumns
                    : page.showcaseImages
                    ? page.showcaseImages.map(images => ({ images }))
                    : graphicDesignChild
                    ? graphicShowcaseImages.map(image => ({ images: [image] }))
                    : page.cards.map((card, index) => ({ images: [card.image ?? showcaseImages[index % Math.max(showcaseImages.length, 1)]].filter((image): image is NonNullable<typeof image> => Boolean(image)) })),
            }} />

            <ServiceCapabilities data={{
                eyebrow: 'Our Expertise',
                title: 'What We Build',
                description: page.capabilitiesDescription,
                items: page.cards.map((card, index) => ({
                    id: `${page.slug}-${index}`,
                    title: card.title,
                    description: card.description,
                    image: card.image,
                })),
            }} />

            <Section aria-labelledby="child-deliverables">
                <Split>
                    <DetailCard>
                        <Heading id="child-deliverables" variant="h2">What you get</Heading>
                        <DetailList>{page.deliverables.map(item => <DetailItem key={item}>{item}</DetailItem>)}</DetailList>
                    </DetailCard>
                    <DetailCard>
                        <Heading id="child-use-cases" variant="h2">{page.useCases.title}</Heading>
                        <DetailList>{page.useCases.items.map(item => <DetailItem key={item}>{item}</DetailItem>)}</DetailList>
                    </DetailCard>
                </Split>
            </Section>

            <WhiteSection aria-labelledby="child-explainer">
                <ExplainerLayout>
                    <ExplainerCopy>
                        <Heading id="child-explainer" variant="h2">{page.explainer.title}</Heading>
                        <Lead>{page.explainer.text}</Lead>
                    </ExplainerCopy>
                    {explainerImage ? <ExplainerVisual>
                        <Image src={explainerImage.src} alt={explainerImage.alt} fill sizes="(max-width: 767px) calc(100vw - 32px), 45vw" loading="lazy" />
                    </ExplainerVisual> : <ExplainerVisual aria-hidden="true" />}
                </ExplainerLayout>
            </WhiteSection>

            <ServiceProcess
                data={{
                    title: 'Our process',
                    description: '',
                    steps: page.process.map((step, index) => {
                        return {
                            id: `${page.slug}-process-${index}`,
                            number: String(index + 1).padStart(2, '0'),
                            title: step,
                            description: '',
                            ...((page.processImage || processArt) && {
                                backgroundImage: {
                                    src: page.processImage?.src ?? processArt!.backgroundImage,
                                    alt: '',
                                }
                            }),
                            ...((iosChild || page.processForegroundImage || processArt) && {
                                foregroundImage: {
                                    src: iosChild
                                        ? iosProcessForegroundImages[index]?.src ?? processArt!.foregroundImage
                                        : androidChild
                                            ? androidProcessForegroundImages[index]?.src ?? processArt!.foregroundImage
                                            : crossPlatformChild
                                                ? crossPlatformProcessForegroundImages[index]?.src ?? processArt!.foregroundImage
                                                : page.processForegroundImages?.[index]?.src ?? page.processForegroundImage?.src ?? processArt!.foregroundImage,
                                    alt: iosChild
                                        ? iosProcessForegroundImages[index]?.alt ?? processArt!.foregroundAlt
                                        : androidChild
                                            ? androidProcessForegroundImages[index]?.alt ?? processArt!.foregroundAlt
                                            : crossPlatformChild
                                                ? crossPlatformProcessForegroundImages[index]?.alt ?? processArt!.foregroundAlt
                                                : page.processForegroundImages?.[index]?.alt ?? page.processForegroundImage?.alt ?? processArt!.foregroundAlt,
                                }
                            }),
                        };
                    }),
                } satisfies ServiceProcessData}
            />

            <ServiceEcosystemSection data={{
                title: page.why.title,
                description: page.why.text,
                ...(page.why.image ? { image: page.why.image } : processArt && {
                    image: page.parentPath === '/services/mobile-app-development'
                        ? { src: '/images/services/mobile-app-development/mobile-ecosystem.png', alt: 'Mobile application, API and backend ecosystem illustration' }
                        : processArt.explainerImage
                }),
            }} />

            <ServiceFaq data={page.faq} />

            <Cta aria-labelledby="child-contact">
                <Container>
                    <Heading id="child-contact" variant="h2" gradient={false}>{page.closing.title}</Heading>
                    <Lead>{page.closing.text}</Lead>
                    <PrimaryButton href="/contact">{page.hero.cta}</PrimaryButton>
                </Container>
            </Cta>

            <Related aria-label={`Related ${page.parentName.toLowerCase()} services`}>
                <Link href={page.parentPath}>{page.parentName}</Link>
                {page.related.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </Related>
        </Page>
    );
}
