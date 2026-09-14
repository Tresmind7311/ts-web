'use client';

import { useState } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { PrimaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';

interface FaqItem {
    question: string;
    answer: string;
}

const FAQS: FaqItem[] = [
    {
        question: 'What does your agency specialize in?',
        answer:
            'We specialize in helping startups design, build, and scale AI-powered products. Our expertise includes AI strategy, UX/UI design, automation tools, and product development for SaaS, tech, and data-driven businesses.',
    },
    {
        question: 'Do you work with early-stage startups?',
        answer:
            'Yes. We work with early-stage startups as well as growing teams, helping shape ideas into clear product strategies, polished experiences, and scalable digital products.',
    },
    {
        question: 'How long does a typical project take?',
        answer:
            'Project timelines depend on scope and complexity. After discovery, we provide a clear roadmap, milestones, and realistic delivery schedule before development begins.',
    },
    {
        question: 'Can you integrate AI into my existing product?',
        answer:
            'Yes. We can evaluate your current product, identify useful AI opportunities, and integrate them in a way that supports your existing architecture and user experience.',
    },
    {
        question: 'What do you need from me to get started?',
        answer:
            'A short overview of your goals, current challenges, audience, and any existing product or brand materials is enough to begin the discovery process.',
    },
    {
        question: 'How do you ensure quality?',
        answer:
            'We combine clear planning, iterative reviews, design and engineering standards, testing, and regular communication throughout the project.',
    },
];

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.color.neutral0,
    padding: '128px 0 132px',

    '&::before': {
        content: '""',
        position: 'absolute',
        left: '20%',
        top: '10%',
        width: '72vw',
        height: '58vw',
        maxWidth: '1080px',
        maxHeight: '760px',
        borderRadius: '50%',
        background: `radial-gradient(
            circle,
            ${alpha(tokens.color.uv300, 0.10)} 0%,
            ${alpha(tokens.color.uv100, 0.2)} 10%,
            ${alpha(tokens.color.uv300, 0.4)} 76%,
            transparent 74%
        )`,
        filter: 'blur(136px)',
        pointerEvents: 'none',
    },

    [theme.breakpoints.down('md')]: {
        padding: '88px 0 96px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '64px 0 72px',

        '&::before': {
            left: '-30%',
            top: '18%',
            width: '150vw',
            height: '150vw',
        },
    },
}));

const Layout = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.08fr)',
    alignItems: 'start',
    gap: '48px',

    [theme.breakpoints.down('lg')]: {
        gap: '36px',
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '56px',
    },

    [theme.breakpoints.down('sm')]: {
        gap: '42px',
        paddingInline: '18px',
    },
}));

const LeftColumn = styled(Box)(({ theme }) => ({
    minWidth: 0,
    paddingRight: '16px',

    [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        paddingRight: 0,
    },
}));

const Eyebrow = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: 1,
    color: tokens.color.ink900,
});

const EyebrowDot = styled('span')({
    display: 'block',
    width: '8px',
    height: '8px',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: tokens.color.uv500,
});

const FaqHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '560px',
    marginTop: '34px',
    color: tokens.color.ink900,
    textTransform: 'none',
    lineHeight: 1.05,
    letterSpacing: '-0.045em',

    [theme.breakpoints.down('md')]: {
        maxWidth: '620px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '24px',
        lineHeight: 1.08,
    },
}));

const BookingCard = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '615px',
    marginTop: '38px',
    padding: '32px',
    borderRadius: '18px',
    backgroundColor: tokens.color.neutral0,
    boxShadow: '0 18px 50px rgba(7, 20, 99, 0.06)',

    [theme.breakpoints.down('sm')]: {
        marginTop: '30px',
        padding: '24px 20px 22px',
        borderRadius: '16px',
    },
}));

const Avatar = styled(Image)(({ theme }) => ({
    display: 'block',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',

    [theme.breakpoints.down('sm')]: {
        width: '58px',
        height: '58px',
    },
}));

const BookingTitle = styled(Typography)(({ theme }) => ({
    marginTop: '20px',
    fontFamily: tokens.font.display,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.025em',
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        fontSize: '21px',
    },
}));

const BookingText = styled(Typography)(({ theme }) => ({
    maxWidth: '520px',
    marginTop: '12px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.neutral600,

    [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
    },
}));

const FaqList = styled(Box)({
    display: 'grid',
    gap: '14px',
    minWidth: 0,
});

const FaqCard = styled(Box)({
    overflow: 'hidden',
    borderRadius: '20px',
    backgroundColor: tokens.color.neutral0,
    boxShadow: '0 12px 36px rgba(7, 20, 99, 0.045)',
});

const SummaryButton = styled('button')(({ theme }) => ({
    width: '100%',
    minHeight: '78px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: '24px',
    padding: '0 32px',
    border: 0,
    outline: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: tokens.font.display,
    fontSize: '17px',
    fontWeight: 700,
    lineHeight: 1.35,
    color: tokens.color.ink900,

    '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv500}`,
        outlineOffset: '-3px',
    },

    [theme.breakpoints.down('sm')]: {
        minHeight: '70px',
        padding: '0 20px',
        gap: '16px',
        fontSize: '15px',
    },
}));

const Plus = styled('span')({
    display: 'grid',
    placeItems: 'center',
    width: '22px',
    height: '22px',
    flexShrink: 0,
    fontFamily: tokens.font.body,
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: 1,
    color: tokens.color.ink900,
});

const Answer = styled(Box)(({ theme }) => ({
    padding: '0 32px 30px',

    [theme.breakpoints.down('sm')]: {
        padding: '0 20px 22px',
    },
}));

const AnswerText = styled(Typography)(({ theme }) => ({
    maxWidth: '590px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.7,
    color: tokens.color.neutral600,

    [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
        lineHeight: 1.65,
    },
}));

export default function ContactFaq() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index: number) => {
        setOpenIndex((current) => (current === index ? -1 : index));
    };

    return (
        <Section
            component="section"
            aria-labelledby="contact-faq-heading"
        >
            <Layout maxWidth="lg">
                <LeftColumn>
                    <Eyebrow>
                        <EyebrowDot aria-hidden="true" />
                        <span>FAQs</span>
                    </Eyebrow>

                    <FaqHeading
                        id="contact-faq-heading"
                        variant="h1"
                        gradient={false}
                    >
                        Frequently Asked
                        <br />
                        Questions
                    </FaqHeading>

                    <BookingCard>
                        <Avatar
                            src="/images/contact-faq-avatar.png"
                            alt=""
                            width={64}
                            height={64}
                            aria-hidden="true"
                        />

                        <BookingTitle component="h3">
                            Book a 15 min call
                        </BookingTitle>

                        <BookingText component="p">
                            If you have any questions, just book a 15-minute call with us before subscribing
                        </BookingText>

                        <PrimaryButton
                            component="a"
                            href="#contact-form"
                            sx={{
                                width: '100%',
                                minHeight: '48px',
                                mt: '20px',
                                fontSize: '14px',
                            }}
                        >
                            Book a Free Call!!
                        </PrimaryButton>
                    </BookingCard>
                </LeftColumn>

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
                                    <Plus aria-hidden="true">+</Plus>
                                </SummaryButton>

                                <Collapse
                                    in={isOpen}
                                    timeout={320}
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
            </Layout>
        </Section>
    );
}
