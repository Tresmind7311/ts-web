'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';

interface FaqItem {
    question: string;
    answer: string;
}

const FAQS: FaqItem[] = [
    {
        question: 'What services do you offer?',
        answer:
            'We provide product design, web and app development, AI solutions, branding, and digital experiences tailored to your business goals.',
    },
    {
        question: 'How long does a typical project take?',
        answer:
            'Timelines depend on scope and complexity. After discovery, we provide a clear roadmap, milestones, and delivery schedule before work begins.',
    },
    {
        question: 'Do you work with companies outside the USA?',
        answer:
            'Yes. We work with businesses and teams globally and collaborate remotely across different time zones.',
    },
    {
        question: 'How do you charge for projects?',
        answer:
            'Pricing depends on the project scope, timeline, and engagement model. We provide a clear proposal before the project starts.',
    },
];

const Root = styled(Box)(({ theme }) => ({
    minWidth: 0,
    padding: '8px 0',

    [theme.breakpoints.down('md')]: {
        padding: 0,
    },
}));

const FaqHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '520px',
    textTransform: 'none',
    lineHeight: 1.04,
    letterSpacing: '-0.045em',

    [theme.breakpoints.down('sm')]: {
        lineHeight: 1.08,
    },
}));

const Intro = styled(Typography)(({ theme }) => ({
    maxWidth: '470px',
    marginTop: '8px',
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: tokens.color.neutral600,

    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
    },
}));

const FaqList = styled(Box)({
    display: 'grid',
    gap: '12px',
    marginTop: '28px',
});

const FaqCard = styled(Box)({
    overflow: 'hidden',
    border: `1px solid ${alpha(tokens.color.ink900, 0.16)}`,
    borderRadius: '12px',
    backgroundColor: tokens.color.neutral0,
});

const SummaryButton = styled('button')(({ theme }) => ({
    width: '100%',
    minHeight: '58px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: '18px',
    padding: '0 18px',
    border: 0,
    outline: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: tokens.font.body,
    fontSize: '15px',
    fontWeight: 500,
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
})<{ open: boolean }>(({ open }) => ({
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
}));

const Answer = styled(Box)(({ theme }) => ({
    padding: '0 18px 18px',

    [theme.breakpoints.down('sm')]: {
        padding: '0 16px 16px',
    },
}));

const AnswerText = styled(Typography)({
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: tokens.color.neutral600,
});

const FooterPrompt = styled(Box)({
    marginTop: '24px',
});

const FooterPromptTitle = styled(Typography)({
    fontFamily: tokens.font.display,
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 1.3,
    color: tokens.color.uv800,
});

const FooterPromptText = styled(Typography)({
    marginTop: '3px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: tokens.color.neutral600,

    '& a': {
        color: tokens.color.uv300,
        textDecoration: 'none',
        fontWeight: 600,
    },

    '& a:focus-visible': {
        outline: `2px solid ${tokens.color.uv300}`,
        outlineOffset: '2px',
    },
});

export default function ContactFaq() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleFaq = (index: number) => {
        setOpenIndex((current) => (current === index ? -1 : index));
    };

    return (
        <Root aria-labelledby="contact-faq-heading">
            <FaqHeading
                id="contact-faq-heading"
                variant="h2"
            >
                Got Questions?
            </FaqHeading>

            <Intro component="p">
                Here are some quick answers to the most common questions.
            </Intro>

            <FaqList>
                {FAQS.map((item, index) => {
                    const isOpen = openIndex === index;
                    const panelId = `contact-faq-panel-${index}`;
                    const buttonId = `contact-faq-button-${index}`;

                    return (
                        <FaqCard key={item.question}>
                            <SummaryButton
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggleFaq(index)}
                            >
                                <span>{item.question}</span>
                                <Chevron open={isOpen} aria-hidden="true">
                                    +
                                </Chevron>
                            </SummaryButton>

                            <Collapse
                                in={isOpen}
                                timeout={280}
                                unmountOnExit={false}
                            >
                                <Answer
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                >
                                    <AnswerText component="p">
                                        {item.answer}
                                    </AnswerText>
                                </Answer>
                            </Collapse>
                        </FaqCard>
                    );
                })}
            </FaqList>

            <FooterPrompt>
                <FooterPromptTitle component="p">
                    Still you have questions?
                </FooterPromptTitle>
                <FooterPromptText component="p">
                    Feel free to <a href="#contact-form">reach out</a>. We&apos;re happy to help!
                </FooterPromptText>
            </FooterPrompt>
        </Root>
    );
}
