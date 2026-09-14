'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import {
    PrimaryButton,
    SecondaryButton,
} from '@/components/common/Button';
import { tokens } from '@/theme/theme';

const CONTACT_ITEMS = [
    {
        label: 'Our Location',
        value: '123 street, 12  Tech City, USA',
    },
    {
        label: 'Call Us',
        value: '+1 (234) 567 8900',
        href: 'tel:+12345678900',
    },
    {
        label: 'Email Us',
        value: 'hello@tresmind.com',
        href: 'mailto:hello@tresmind.com',
    },
    {
        label: 'Live Chat',
        value: 'Chat with our team',
    },
] as const;

const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: 'calc(100svh - var(--nav-height, 72px))',
    marginTop: 'var(--nav-height, 72px)',
    overflow: 'hidden',
    backgroundColor: tokens.color.neutral0,
    backgroundImage: "url('/images/contact-hero-background.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    padding: 'clamp(92px, 9vw, 132px) 0 clamp(72px, 7vw, 104px)',

    [theme.breakpoints.down('md')]: {
        minHeight: 'auto',
        padding: '72px 0 80px',
        backgroundPosition: 'center top',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '48px 0 64px',
        backgroundPosition: '38% top',
    },
}));

const HeroContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.94fr) minmax(0, 1.06fr)',
    alignItems: 'start',
    gap: 'clamp(36px, 3.4vw, 52px)',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '56px',
    },

    [theme.breakpoints.down('sm')]: {
        gap: '44px',
    },
}));

const IntroColumn = styled(Box)(({ theme }) => ({
    minWidth: 0,
    paddingTop: '2px',

    [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
    },
}));

const HeroHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '610px',
    lineHeight: 1.22,

    [theme.breakpoints.down('md')]: {
        maxWidth: '680px',
        marginInline: 'auto',
    },

    [theme.breakpoints.down('sm')]: {
        lineHeight: 1.18,
    },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
    maxWidth: '590px',
    marginTop: '20px',
    fontFamily: tokens.font.body,
    fontSize: 'clamp(16px, 1.25vw, 20px)',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.ink900,

    [theme.breakpoints.down('md')]: {
        marginInline: 'auto',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '16px',
        fontSize: '15px',
    },
}));

const Actions = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '18px',
    marginTop: '30px',

    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },

    [theme.breakpoints.down('sm')]: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '12px',
        width: '100%',
        maxWidth: '420px',
        margin: '26px auto 0',
    },
}));

const ContactList = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: '26px',
    width: '100%',
    maxWidth: '430px',
    marginTop: '60px',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        maxWidth: '680px',
        marginInline: 'auto',
        textAlign: 'left',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: '20px',
        maxWidth: '360px',
        marginTop: '42px',
    },
}));

const ContactItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '22px',
    minWidth: 0,
});

const SendIcon = styled(Image)(({ theme }) => ({
    display: 'block',
    flexShrink: 0,
    width: '48px',
    height: '48px',
    objectFit: 'contain',

    [theme.breakpoints.down('sm')]: {
        width: '44px',
        height: '44px',
    },
}));

const ContactText = styled(Box)({
    minWidth: 0,
});

const ContactLabel = styled(Typography)({
    margin: 0,
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 1.25,
    color: tokens.color.uv800,
});

const ContactValue = styled(Typography)({
    display: 'block',
    marginTop: '6px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: tokens.color.ink900,
    textDecoration: 'none',
    overflowWrap: 'anywhere',
});

const FormCard = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '24px 40px 20px',
    border: `1px solid ${tokens.color.ink900}`,
    borderRadius: tokens.radius.lg,
    backgroundColor: alpha(tokens.color.neutral0, 0.20),

    [theme.breakpoints.down('lg')]: {
        paddingInline: '32px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '24px 18px 20px',
        borderRadius: '14px',
    },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
    margin: 0,
    fontFamily: tokens.font.display,
    fontSize: 'clamp(28px, 2.35vw, 34px)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.035em',
    color: tokens.color.uv800,

    [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
    },
}));

const FormTitleGradient = styled('span')({
    background: `linear-gradient(
        90deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv500} 52%,
        ${tokens.color.uv300} 100%
    )`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
});

const FormIntro = styled(Typography)(({ theme }) => ({
    marginTop: '6px',
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
    },
}));

const FormFields = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '10px',
    marginTop: '32px',

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

const FieldControl = styled(Box)({
    position: 'relative',
    minWidth: 0,
});

const FieldIconWrap = styled('span')({
    position: 'absolute',
    top: '50%',
    left: '17px',
    zIndex: 1,
    display: 'grid',
    placeItems: 'center',
    width: '16px',
    height: '16px',
    color: tokens.color.neutral600,
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
});

const fieldBase = {
    width: '100%',
    border: `1px solid ${alpha(tokens.color.ink900, 0.34)}`,
    borderRadius: tokens.radius.md,
    outline: 'none',
    backgroundColor: alpha(tokens.color.neutral0, 0.18),
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: tokens.color.ink900,
    transition: `border-color ${tokens.motion.fast} ${tokens.motion.ease},
                 box-shadow ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&::placeholder': {
        color: tokens.color.neutral600,
        opacity: 1,
    },
    '&:focus': {
        borderColor: tokens.color.uv500,
        boxShadow: `0 0 0 3px ${alpha(tokens.color.uv300, 0.12)}`,
    },
} as const;

const FieldInput = styled('input')({
    ...fieldBase,
    height: '58px',
    padding: '0 16px 0 40px',
});

const MessageControl = styled(FieldControl)({
    gridColumn: '1 / -1',
});

const MessageIconWrap = styled(FieldIconWrap)({
    top: '20px',
    transform: 'none',
});

const MessageField = styled('textarea')(({ theme }) => ({
    ...fieldBase,
    display: 'block',
    minHeight: '228px',
    padding: '15px 16px 15px 40px',
    resize: 'vertical',

    [theme.breakpoints.down('md')]: {
        minHeight: '200px',
    },

    [theme.breakpoints.down('sm')]: {
        minHeight: '170px',
    },
}));

const PrivacyText = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '12px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: tokens.color.neutral600,

    [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        fontSize: '12px',
        textAlign: 'center',
    },
}));

function UserIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="8"
                cy="5"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <path
                d="M3.5 13c.35-2.35 2.05-3.7 4.5-3.7s4.15 1.35 4.5 3.7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <rect
                x="3.5"
                y="7"
                width="9"
                height="6.5"
                rx="1.2"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <path
                d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            <circle cx="8" cy="10.2" r=".75" fill="currentColor" />
        </svg>
    );
}

export default function ContactHero() {
    return (
        <HeroSection
            component="section"
            aria-labelledby="contact-hero-heading"
        >
            <HeroContainer maxWidth="lg">
                <IntroColumn>
                    <HeroHeading
                        id="contact-hero-heading"
                        variant="h1"
                    >
                        <Box component="span" sx={{ display: 'block' }}>
                            Let&apos;s Build
                        </Box>
                        <Box component="span" sx={{ display: 'block' }}>
                            Something Great
                        </Box>
                    </HeroHeading>

                    <HeroDescription component="p">
                        Have a project in mind or just want to say hello? We&apos;d love to
                        hear from you. Fill out the form and our team will get back to
                        you as soon as possible.
                    </HeroDescription>

                    <Actions>
                        <PrimaryButton
                            component="a"
                            href="#contact-form"
                            sx={{
                                minHeight: '64px',
                                px: '28px',
                                fontSize: '18px',
                            }}
                        >
                            Start Your Project
                        </PrimaryButton>

                        <SecondaryButton
                            component="a"
                            href="#contact-form"
                            textColor={tokens.color.uv800}
                            borderColor={tokens.color.uv800}
                            backgroundColor={tokens.color.transparent0}
                            hoverBackgroundColor={alpha(tokens.color.neutral0, 0.30)}
                            sx={{
                                minHeight: '64px',
                                px: '28px',
                                borderWidth: '1px',
                                fontSize: '18px',
                            }}
                        >
                            Schedule a Consultation
                        </SecondaryButton>
                    </Actions>

                    <ContactList>
                        {CONTACT_ITEMS.map((item) => (
                            <ContactItem key={item.label}>
                                <SendIcon
                                    src="/images/send-icon.svg"
                                    alt=""
                                    width={48}
                                    height={48}
                                    aria-hidden="true"
                                />

                                <ContactText>
                                    <ContactLabel>
                                        {item.label}
                                    </ContactLabel>

                                    {item.href ? (
                                        <ContactValue
                                            component="a"
                                            href={item.href}
                                        >
                                            {item.value}
                                        </ContactValue>
                                    ) : (
                                        <ContactValue component="span">
                                            {item.value}
                                        </ContactValue>
                                    )}
                                </ContactText>
                            </ContactItem>
                        ))}
                    </ContactList>
                </IntroColumn>

                <FormCard
                    id="contact-form"
                    component="form"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <FormTitle component="h2">
                        Send{' '}
                        <FormTitleGradient>
                            Us a Message
                        </FormTitleGradient>
                    </FormTitle>

                    <FormIntro component="p">
                        We&apos;re here to help and answer any question you might have.
                    </FormIntro>

                    <FormFields>
                        <FieldControl>
                            <FieldIconWrap>
                                <UserIcon />
                            </FieldIconWrap>
                            <FieldInput
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                autoComplete="name"
                                aria-label="Full Name"
                            />
                        </FieldControl>

                        <FieldControl>
                            <FieldIconWrap>
                                <UserIcon />
                            </FieldIconWrap>
                            <FieldInput
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                autoComplete="email"
                                aria-label="Email Address"
                            />
                        </FieldControl>

                        <FieldControl>
                            <FieldIconWrap>
                                <UserIcon />
                            </FieldIconWrap>
                            <FieldInput
                                name="phone"
                                type="tel"
                                placeholder="Phone Number"
                                autoComplete="tel"
                                aria-label="Phone Number"
                            />
                        </FieldControl>

                        <FieldControl>
                            <FieldIconWrap>
                                <UserIcon />
                            </FieldIconWrap>
                            <FieldInput
                                name="subject"
                                type="text"
                                placeholder="Subject"
                                aria-label="Subject"
                            />
                        </FieldControl>

                        <MessageControl>
                            <MessageIconWrap>
                                <UserIcon />
                            </MessageIconWrap>
                            <MessageField
                                name="message"
                                placeholder="Tell us about your project"
                                aria-label="Tell us about your project"
                            />
                        </MessageControl>
                    </FormFields>

                    <PrimaryButton
                        type="submit"
                        sx={{
                            width: '100%',
                            minHeight: '64px',
                            mt: '32px',
                            fontSize: '20px',
                        }}
                    >
                        Send Message
                    </PrimaryButton>

                    <PrivacyText>
                        <LockIcon />
                        <span>
                            We never share your information with anyone.
                        </span>
                    </PrivacyText>
                </FormCard>
            </HeroContainer>
        </HeroSection>
    );
}
