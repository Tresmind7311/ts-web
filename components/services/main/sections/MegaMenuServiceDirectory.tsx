'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import { alpha, keyframes, styled } from '@mui/material/styles';
import { serviceList } from '@/data/services';

const FEATURED_SLUGS = new Set([
    'mobile-app-development',
    'ai-development',
    'software-development',
    'web-development',
    'graphic-designing',
    'cloud-consulting',
]);

const categories = [
    { name: 'App Development', description: 'Mobile experiences, made for people.' },
    { name: 'Business Solutions', description: 'Connected systems for better work.' },
    { name: 'Web Development', description: 'Websites, stores and web applications.' },
    { name: 'AI Development', description: 'Useful intelligence, built responsibly.' },
    { name: 'Cloud Solutions', description: 'Cloud foundations that scale.' },
    { name: 'Staff Augmentation', description: 'The skills your team needs, when needed.' },
    { name: 'Blockchain & Emerging Tech', description: 'Explore new digital possibilities.' },
    { name: 'Digital Marketing', description: 'Build reach and meaningful visibility.' },
];

const riseIn = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Section = styled('section')(({ theme }) => ({
    position: 'relative',
    padding: 'clamp(72px, 9vw, 124px) 0',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #f7f9ff 0%, #ffffff 72%)',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        top: '5%',
        right: '-240px',
        background: alpha('#0DB0DC', 0.08),
        filter: 'blur(8px)',
        pointerEvents: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '68px 0',
    },
}));

const Intro = styled(Box)({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '24px',
    marginBottom: '42px',
    '@media (max-width: 640px)': {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginBottom: '28px',
    },
});

const Eyebrow = styled(Typography)({
    color: '#0788b3',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    marginBottom: '14px',
});

const Heading = styled(Typography)(({ theme }) => ({
    maxWidth: '760px',
    color: '#101735',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(34px, 4.3vw, 58px)',
    fontWeight: 800,
    lineHeight: 1.04,
    letterSpacing: '-.055em',
    '& span': {
        background: 'linear-gradient(100deg, #071463 0%, #0DB0DC 95%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(32px, 9vw, 44px)',
    },
});

const Lead = styled(Typography)({
    maxWidth: '540px',
    marginTop: '16px',
    color: '#657089',
    fontSize: '16px',
    lineHeight: 1.75,
});

const CountPill = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    flexShrink: 0,
    border: '1px solid #e2e8f4',
    borderRadius: '999px',
    background: 'rgba(255,255,255,.8)',
    padding: '10px 15px',
    color: '#38435e',
    fontSize: '12px',
    fontWeight: 600,
    '& strong': { color: '#071463', fontSize: '17px' },
});

const CategoryGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: '14px',
    },
}));

const CategoryCard = styled(Box)({
    position: 'relative',
    minWidth: 0,
    padding: '25px 25px 20px',
    border: '1px solid #e7ebf4',
    borderRadius: '20px',
    background: 'rgba(255,255,255,.92)',
    boxShadow: '0 8px 26px rgba(16,23,53,.035)',
    animation: `${riseIn} 550ms cubic-bezier(.16,1,.3,1) both`,
    transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: '#b9e7f2',
        boxShadow: '0 18px 44px rgba(16,23,53,.08)',
    },
    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
        transition: 'none',
        '&:hover': { transform: 'none' },
    },
    '@media (max-width: 640px)': {
        padding: '21px 18px 16px',
    },
});

const CardTop = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '14px',
    marginBottom: '18px',
});

const CategoryTitle = styled(Typography)({
    color: '#111832',
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: 750,
    lineHeight: 1.25,
    letterSpacing: '-.035em',
});

const CategoryDescription = styled(Typography)({
    marginTop: '6px',
    color: '#788198',
    fontSize: '12px',
    lineHeight: 1.6,
});

const CategoryNumber = styled('span')({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    flexShrink: 0,
    borderRadius: '11px',
    background: 'linear-gradient(135deg, #eef1ff, #e4f9ff)',
    color: '#071463',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 700,
});

const LinkList = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '7px',
    '@media (max-width: 440px)': {
        gridTemplateColumns: '1fr',
    },
});

const ServiceLink = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    minHeight: '42px',
    padding: '9px 10px',
    borderRadius: '9px',
    background: '#f7f9fc',
    color: '#47516a',
    fontSize: '12px',
    fontWeight: 550,
    lineHeight: 1.4,
    textDecoration: 'none',
    transition: 'background 160ms ease, color 160ms ease',
    '& svg': {
        flexShrink: 0,
        color: '#9aa5ba',
        transition: 'transform 160ms ease, color 160ms ease',
    },
    '&:hover': {
        background: '#eefaff',
        color: '#071463',
        '& svg': {
            color: '#079cc3',
            transform: 'translate(2px, -2px)',
        },
    },
    '&:focus-visible': {
        outline: '2px solid #0DB0DC',
        outlineOffset: '2px',
    },
});

export default function MegaMenuServiceDirectory() {
    const additionalServices = serviceList.filter(
        (service) => !FEATURED_SLUGS.has(service.slug),
    );

    return (
        <Section id="all-services">
            <Container maxWidth="xl">
                <Intro>
                    <Box>
                        <Eyebrow>Built around your goals</Eyebrow>
                        <Heading component="h2">
                            One partner. <span>More ways forward.</span>
                        </Heading>
                        <Lead>
                            Explore our specialist services, from mobile and web products to AI,
                            cloud, emerging technology and digital growth.
                        </Lead>
                    </Box>
                    <CountPill>
                        <strong>{additionalServices.length + 6}</strong>
                        services to explore
                    </CountPill>
                </Intro>

                <CategoryGrid>
                    {categories.map((category, index) => {
                        const items = additionalServices.filter(
                            (service) => service.hero.eyebrow === category.name,
                        );

                        if (!items.length) return null;

                        return (
                            <CategoryCard key={category.name} style={{ animationDelay: `${index * 55}ms` }}>
                                <CardTop>
                                    <Box>
                                        <CategoryTitle component="h3">{category.name}</CategoryTitle>
                                        <CategoryDescription>{category.description}</CategoryDescription>
                                    </Box>
                                    <CategoryNumber>{String(index + 1).padStart(2, '0')}</CategoryNumber>
                                </CardTop>
                                <LinkList>
                                    {items.map((service) => (
                                        <ServiceLink key={service.slug} href={`/services/${service.slug}`}>
                                            <span>{service.name}</span>
                                            <ArrowOutwardRounded sx={{ fontSize: 16 }} />
                                        </ServiceLink>
                                    ))}
                                </LinkList>
                            </CategoryCard>
                        );
                    })}
                </CategoryGrid>
            </Container>
        </Section>
    );
}
