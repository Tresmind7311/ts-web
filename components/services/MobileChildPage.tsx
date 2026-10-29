'use client';

import Link from 'next/link';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import ServiceCapabilities from './sections/ServiceCapabilities';
import ServiceEcosystemSection from './sections/ServiceEcosystemSection';
import ServiceFaq from './sections/ServiceFaq';
import ServiceProcess from './sections/ServiceProcess';
import ServiceShowcase from './sections/ServiceShowcase';
import type { ServiceData, ServiceProcessData } from '@/data/services/types';
import { tokens } from '@/theme/theme';

type ChildServicePage = NonNullable<ServiceData['detail']>;

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
        display: 'flex', flexWrap: 'wrap', gap: '8px', padding: 0,
        margin: '0 0 72px', listStyle: 'none', fontSize: '14px',
        '@media (max-width: 599px)': { marginBottom: '48px' },
    },
    '& li:not(:last-child)::after': {
        content: "'/'", paddingLeft: '8px', color: tokens.color.neutral600,
    },
    '& a': { color: tokens.color.uv800, textUnderlineOffset: '3px' },
});

const leadStyles = {
    maxWidth: '780px', fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.65,
};

const HeroContent = styled('div')({ maxWidth: '820px', '& p': leadStyles });
const Lead = styled('p')(leadStyles);
const Actions = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '32px' });

const buttonStyles = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '48px', padding: '10px 22px', borderRadius: '12px',
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
    '& a': { color: tokens.color.uv800, textUnderlineOffset: '3px' },
});

export default function MobileChildPage({ page }: { page: ChildServicePage }) {
    return (
        <Page>
            <Hero aria-labelledby="child-service-title">
                <Container>
                    <Breadcrumbs aria-label="Breadcrumb">
                        <ol>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            {page.parentPath !== '/services' && <li><Link href={page.parentPath}>{page.parentName}</Link></li>}
                            <li aria-current="page">{page.name}</li>
                        </ol>
                    </Breadcrumbs>
                    <HeroContent>
                        <Heading id="child-service-title" variant="h1">{page.hero.title}</Heading>
                        <p>{page.hero.description}</p>
                        <Actions>
                            <PrimaryButton href="/contact">{page.hero.cta}</PrimaryButton>
                            <SecondaryButton href={page.parentPath}>Explore {page.parentName.toLowerCase()}</SecondaryButton>
                        </Actions>
                    </HeroContent>
                </Container>
            </Hero>

            <ServiceShowcase data={{
                title: page.introduction.title,
                description: page.introduction.text,
                columns: page.cards.flatMap(card => card.image
                    ? [{ images: [{ src: card.image.src, alt: '' }] }]
                    : []),
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
                        <p>These are topics to define in the project scope; exact deliverables depend on the agreed work.</p>
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
                    <ExplainerVisual aria-hidden="true" />
                </ExplainerLayout>
            </WhiteSection>

            <ServiceProcess
                data={{
                    title: 'Our process',
                    description: '',
                    steps: page.process.map((step, index) => {
                        const isMobile =
                            page.parentPath ===
                            '/services/mobile-app-development';
                        const hasProcessArt = ![
                            '/services',
                            '/services/staff-augmentation',
                            '/services/blockchain-development',
                            '/services/digital-marketing',
                        ].includes(page.parentPath);
                        return {
                            id: `${page.slug}-process-${index}`,
                            number: String(index + 1).padStart(2, '0'),
                            title: step,
                            description: '',
                            ...(hasProcessArt && { backgroundImage: {
                                src: isMobile
                                    ? '/images/services/mobile-app-development/process-bg.jpg'
                                    : '/images/services/software-development/Requirements-Discovery-bg.png',
                                alt: '',
                            } }),
                            ...(hasProcessArt && { foregroundImage: {
                                src: isMobile
                                    ? '/images/services/mobile-app-development/process-01.png'
                                    : '/images/services/software-development/Requirements-Discovery.png',
                                alt: '',
                            } }),
                        };
                    }),
                } satisfies ServiceProcessData}
            />

            <ServiceEcosystemSection data={{
                title: page.why.title,
                description: page.why.text,
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
