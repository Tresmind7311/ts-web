'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import ContactProcess from './ContactProcess';
import { styled } from '@mui/material/styles';
import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';
interface FaqItem {
    question: string;
    answer: string;
}
const FAQS: FaqItem[] = [
    {
        question: 'What does your agency specialize in?',
        answer: 'We specialize in helping startups design, build, and scale AI-powered products. Our expertise includes AI strategy, UX/UI design, automation tools, and product development for SaaS, tech, and data-driven businesses.',
    },
    {
        question: 'Do you work with early-stage startups?', answer: 'We help teams define their product, prioritize features, and build a roadmap that fits their goals and budget.'
    },
    {
        question: 'How long does a typical project take?',
        answer: 'Timelines depend on scope and complexity. After discovery, we provide a clear roadmap, milestones, and delivery schedule before work begins.',
    },
    {
        question: 'Can you integrate AI into my existing product?', answer: 'We assess your existing product and workflows to identify practical AI integrations and a clear implementation plan.'
    },
    {
        question: 'What do you need from me to get started?', answer: 'Share your goals, current challenges, timeline, and any existing product materials through the contact form.'
    },
    {
        question: 'How do you ensure quality?', answer: 'We agree on milestones and review the design and implementation with you throughout the project.'
    },
];
const Root = styled('section')(({ theme }) => ({
    background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff', padding: '140px 0 84px', [theme.breakpoints.down('md')]: {
        padding: '72px 0'
    }, [theme.breakpoints.down('sm')]: {
        padding: '48px 0'
    }
}));
const Layout = styled(Container)(({ theme }) => ({
    display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 48, [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr', gap: 32
    }, [theme.breakpoints.down('sm')]: {
        paddingInline: 16
    }
}));
const Eyebrow = styled('p')({
    margin: '0 0 32px', fontFamily: tokens.font.body, fontSize: 14, fontWeight: 600, color: tokens.color.uv800, '&::before': {
        content: '""', display: 'inline-block', width: 8, height: 8, marginRight: 12, background: tokens.color.uv300, borderRadius: '50%'
    }
});
const FaqHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '520px',
    textTransform: 'none',
    lineHeight: 1.25,
    letterSpacing: '-0.045em',
    [theme.breakpoints.down('sm')]: {
        lineHeight: 1.08,
    },
}));
const FaqList = styled(Box)({
    display: 'grid',
    gap: '16px',
});
const FaqCard = styled(Box)({
    overflow: 'hidden',
    borderRadius: '24px',
    backgroundColor: tokens.color.neutral0,
});
const SummaryButton = styled('button')(({ theme }) => ({
    width: '100%',
    minHeight: '64px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: '18px',
    padding: '18px 24px',
    border: 0,
    outline: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 1.35,
    color: tokens.color.ink900,
    '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv500}`,
        outlineOffset: '-3px',
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '56px',
        padding: '0 16px',
        fontSize: '14px',
    },
}));
const Chevron = styled('span', {
    shouldForwardProp: (prop) => prop !== 'open',
})<{
    open: boolean;
}>(({ open }) => ({
    display: 'grid',
    placeItems: 'center',
    width: '18px',
    height: '18px',
    flexShrink: 0,
    fontSize: '18px',
    lineHeight: 1,
    color: tokens.color.ink900,
    transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
    transition: `transform ${tokens.motion.fast} ${tokens.motion.ease}`,
    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none'
    },
}));
const Answer = styled(Box)(({ theme }) => ({
    padding: '0 24px 24px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 16px 16px',
    },
}));
const AnswerText = styled('p')({
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: tokens.color.neutral600,
});
export default function ContactFaq() {
    const [openIndex, setOpenIndex] = useState(0);
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const toggleFaq = (index: number) => {
        setOpenIndex((current) => (current === index ? -1 : index));
    };
    return (<Root aria-labelledby="contact-faq-heading">
            <Layout maxWidth={false} sx={{
        maxWidth: 1328
    }}><div><Eyebrow>FAQs</Eyebrow>
            <FaqHeading id="contact-faq-heading" variant="h2">
                Frequently Asked<br />Questions
            </FaqHeading>

            <ContactProcess />

            </div><div><FaqList>
                {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `contact-faq-panel-${index}`;
            const buttonId = `contact-faq-button-${index}`;
            return (<FaqCard key={item.question}>
                            <SummaryButton id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggleFaq(index)}>
                                <span>{item.question}</span>
                                <Chevron open={isOpen} aria-hidden="true">
                                    +
                                </Chevron>
                            </SummaryButton>

                            <Collapse in={isOpen} timeout={reducedMotion ? 0 : 280} unmountOnExit={false}>
                                <Answer id={panelId} role="region" aria-labelledby={buttonId}>
                                    <AnswerText>
                                        {item.answer}
                                    </AnswerText>
                                </Answer>
                            </Collapse>
                        </FaqCard>);
        })}
            </FaqList></div></Layout>
        </Root>);
}
