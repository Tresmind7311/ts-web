'use client';

import Image from 'next/image';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { PrimaryButton, SecondaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';

const Section = styled('section')({
    backgroundColor: '#eef8fc',
    backgroundImage: 'url("/images/services/Main/hero-background.jpg")',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
});

// Navbar already reserves its measured height on this inner page.
const Content = styled('div')(({ theme }) => ({
    maxWidth: 1000,
    margin: '0 auto',
    padding: '72px 24px 30px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: { padding: '56px 24px 32px' },
    [theme.breakpoints.down('sm')]: { padding: '40px 20px 28px' },
}));

const HeroHeading = styled(Heading)(({ theme }) => ({
    fontFamily: 'var(--font-display)',
    fontSize: 76,
    fontWeight: 600,
    lineHeight: '83px',
    letterSpacing: '-0.045em',
    textTransform: 'none',
    color: '#000',
    [theme.breakpoints.down('md')]: { fontSize: 56, lineHeight: 1.1 },
    [theme.breakpoints.down('sm')]: { fontSize: 'clamp(32px, 8.5vw, 44px)', lineHeight: 1.12 },
}));

const Description = styled('p')(({ theme }) => ({
    margin: '22px 0 0',
    fontFamily: 'var(--font-body)',
    fontSize: 18,
    lineHeight: 1.5,
    color: tokens.color.neutral700,
    [theme.breakpoints.down('sm')]: { fontSize: 16, marginTop: 18 },
}));

const Actions = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    marginTop: 32,
    '& a': { minHeight: 75, padding: '18px 30px', borderRadius: 14, fontSize: 24 },
    [theme.breakpoints.down('md')]: { '& a': { minHeight: 60, fontSize: 20 } },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: 12,
        maxWidth: 360,
        margin: '24px auto 0',
        '& a': { minHeight: 54, padding: '14px 18px', fontSize: 17 },
    },
}));

const Cards = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '325fr 210fr 210fr 210fr 325fr',
    alignItems: 'end',
    gap: 20,
    width: '100%',
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 40px 40px',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: 16,
        padding: '0 24px 32px',
        '& > *': { gridColumn: 'span 2' },
        '& > :nth-of-type(4), & > :nth-of-type(5)': { gridColumn: 'span 3' },
    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 14,
        padding: '0 20px 28px',
        '& > *': { gridColumn: 'span 1' },
        '& > :first-of-type': { gridColumn: '1 / -1', maxWidth: 325, width: '100%', justifySelf: 'center' },
        '& > :nth-of-type(4)': { gridColumn: '1 / -1', width: '100%', maxWidth: 210, justifySelf: 'center' },
        '& > :nth-of-type(5)': { gridColumn: '1 / -1' },
    },
}));

const Card = styled('article')({
    minWidth: 0,
    borderRadius: 20,
    overflow: 'hidden',
});

const Artwork = styled(Image)({ display: 'block', width: '100%', height: 'auto' });

function ImageCard({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
    return (
        <Card>
            <Artwork src={src} alt={alt} width={width} height={height}
                sizes="(max-width: 639px) 50vw, (max-width: 959px) 33vw, 25vw" />
        </Card>
    );
}

const GradientCard = styled(Card)({
    background: `linear-gradient(100deg, ${tokens.color.uv800}, ${tokens.color.uv300})`,
    color: tokens.color.neutral0,
    fontFamily: 'var(--font-hero-body)',
});

const Clients = styled(GradientCard)(({ theme }) => ({
    aspectRatio: '210 / 258',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: { minHeight: 258, aspectRatio: 'auto' },
    [theme.breakpoints.down('sm')]: { minHeight: 220, padding: 16 },
}));

const Number = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: { fontSize: 36 },
}));

const CardDescription = styled('p')({
    margin: '4px 0 0',
    fontSize: 16,
    lineHeight: 1.4,
    color: 'rgba(255, 255, 255, 0.75)',
});

function ClientsCard() {
    return (
        <Clients>
            <Number>200+</Number>
            <CardDescription>Our Esteemed<br />Clients and<br />Partners</CardDescription>
        </Clients>
    );
}

const Global = styled(GradientCard)(({ theme }) => ({
    aspectRatio: '325 / 338',
    padding: 24,
    [theme.breakpoints.down('md')]: { minHeight: 258, aspectRatio: 'auto' },
    [theme.breakpoints.down('sm')]: { minHeight: 240, padding: 24 },
}));

const Countries = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 20,
    '& span': {
        padding: '11px 16px',
        borderRadius: tokens.radius.full,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fontSize: 16,
        lineHeight: 1.3,
    },
});

function GlobalCard() {
    return (
        <Global>
            <Number>20+</Number>
            <CardDescription>Global Enterprise drives innovation</CardDescription>
            <Countries><span>Mexico</span><span>Australia</span></Countries>
        </Global>
    );
}

export default function PortfolioHero() {
    return (
        <Section aria-labelledby="portfolio-hero-heading">
            <Content>
                <HeroHeading id="portfolio-hero-heading" variant="h1" gradient={false}>
                    Fueling the Next<br />Generation of Brands
                </HeroHeading>
                <Description>Powering bold ideas with strategy, creativity, and growth.</Description>
                <Actions>
                    <PrimaryButton component="a" href="/contact">Start Your Project</PrimaryButton>
                    <SecondaryButton component="a" href="/contact">Schedule a Consultation</SecondaryButton>
                </Actions>
            </Content>
            <Cards>
                <ImageCard src="/images/Portfolio/Next-Generation.png" alt="Two colleagues reviewing ideas on a tablet" width={325} height={338} />
                <ClientsCard />
                <ImageCard src="/images/Portfolio/Transparent-Growth.png" alt="Trusted & Transparent Growth — shield and lock" width={210} height={211} />
                <ImageCard src="/images/Portfolio/Trusted-Growth.png" alt="Trusted & Transparent Growth — rising growth chart" width={210} height={258} />
                <GlobalCard />
            </Cards>
        </Section>
    );
}
