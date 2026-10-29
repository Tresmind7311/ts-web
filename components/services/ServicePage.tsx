import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

import ServiceHero from './sections/ServiceHero';
import ServiceCapabilities from './sections/ServiceCapabilities';
import type { ServiceData } from '@/data/services/types';
import ServiceShowcase from './sections/ServiceShowcase';
import ServiceProcess from './sections/ServiceProcess';
import ServiceEcosystemSection from './sections/ServiceEcosystemSection';
import ServiceFaq from './sections/ServiceFaq';
import { tokens } from '@/theme/theme';
import Heading from '@/components/common/Heading';

interface ServicePageProps {
    service: ServiceData;
}

const TechnologySection = styled(Box)(({ theme }) => ({
    padding: '88px 24px',
    background: '#f7f9ff',
    [theme.breakpoints.down('md')]: { padding: '68px 20px' },
    [theme.breakpoints.down('sm')]: { padding: '52px 16px' },
}));

const TechnologyGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '14px',
    marginTop: '34px',
    [theme.breakpoints.down('md')]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    [theme.breakpoints.down('sm')]: { gap: '10px', marginTop: '24px' },
}));

const TechnologyItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    minHeight: '66px',
    padding: '16px 18px',
    border: '1px solid #e2e8f5',
    borderRadius: '14px',
    background: '#fff',
    color: tokens.color.uv800,
    fontFamily: tokens.font.body,
    fontSize: '15px',
    fontWeight: 600,
    boxShadow: '0 8px 24px rgba(20, 42, 100, 0.04)',
});

const ContactSection = styled(Box)(({ theme }) => ({
    padding: '90px 24px',
    color: '#fff',
    textAlign: 'center',
    background: 'linear-gradient(125deg, #071963 0%, #075db6 58%, #08a8d1 100%)',
    [theme.breakpoints.down('md')]: { padding: '70px 20px' },
    [theme.breakpoints.down('sm')]: { padding: '54px 16px' },
}));

const ContactLink = styled(Link)({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50px',
    marginTop: '28px',
    padding: '0 25px',
    borderRadius: '999px',
    background: '#fff',
    color: '#071963',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 30px rgba(0,0,0,.18)',
    },
});

export default function ServicePage({ service }: ServicePageProps) {
    return (
        <main>
            <ServiceHero data={service.hero} />

            {service.showcase ? <ServiceShowcase data={service.showcase} /> : null}

            {service.capabilities ? <ServiceCapabilities data={service.capabilities} /> : null}

            {service.process ? <ServiceProcess data={service.process} /> : null}

            {service.technologyStack ? (
                <TechnologySection component="section" aria-labelledby="technology-stack-heading">
                    <Container maxWidth="lg">
                        <Typography
                            component="p"
                            sx={{ mb: 1.5, color: tokens.color.uv500, fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                        >
                            Tools & technologies
                        </Typography>
                        <Heading id="technology-stack-heading" variant="h2">
                            {service.technologyStack.title}
                        </Heading>
                        <Typography component="p" sx={{ maxWidth: 760, mt: 2, color: tokens.color.neutral700, lineHeight: 1.7 }}>
                            {service.technologyStack.description}
                        </Typography>
                        <TechnologyGrid>
                            {service.technologyStack.items.map((item) => (
                                <TechnologyItem key={item}>{item}</TechnologyItem>
                            ))}
                        </TechnologyGrid>
                    </Container>
                </TechnologySection>
            ) : null}

            {service.ecosystem ? <ServiceEcosystemSection data={service.ecosystem} /> : null}

            {service.faq ? <ServiceFaq data={service.faq} /> : null}

            <ContactSection component="section" id="contact" aria-labelledby="service-contact-heading">
                <Container maxWidth="md">
                    <Typography component="p" sx={{ mb: 1.5, fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.78)' }}>
                        Let’s build something useful
                    </Typography>
                    <Typography id="service-contact-heading" component="h2" sx={{ fontSize: 'clamp(32px, 5vw, 58px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.04em' }}>
                        Ready to discuss your {service.name.toLowerCase()} project?
                    </Typography>
                    <Typography component="p" sx={{ maxWidth: 650, mx: 'auto', mt: 2, color: 'rgba(255,255,255,.82)', lineHeight: 1.7 }}>
                        Tell us what you are trying to achieve. We’ll help you map out a practical next step for your team and your customers.
                    </Typography>
                    <ContactLink href="/contact">Talk to our team <span aria-hidden="true" style={{ marginLeft: 10 }}>↗</span></ContactLink>
                </Container>
            </ContactSection>
        </main>
    );
}
