'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { PrimaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';

const TRUST_ITEMS = [
    {
        title: 'Quick Response',
        description: 'We respond to all inquiries within 24 business hours.',
    },
    {
        title: 'Secure & Confidential',
        description: 'Your information is safe with us. We respect your privacy.',
    },
] as const;

const CONTACT_ITEMS = [
    {
        label: 'Our Location',
        value: '123 street, 12\nTech City, USA',
        action: 'View on Map',
        href: '#contact-locations',
    },
    {
        label: 'Call Us',
        value: '+1 (234) 567 8900',
        action: 'Mon - Fri  (9AM to 6PM)',
        href: 'tel:+12345678900',
    },
    {
        label: 'Email Us',
        value: 'hello@tresmind.com',
        action: 'We will reply soon',
        href: 'mailto:hello@tresmind.com',
    },
    {
        label: 'Live Chat',
        value: 'Chat with our team',
        action: 'Start Chat',
        href: '#contact-form',
    },
] as const;

const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    marginTop: '-60px',
    overflow: 'hidden',
    backgroundColor: '#f7fbfd',
    backgroundImage: "url('/images/contact-hero-background.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    padding: '220px 0 58px',

    [theme.breakpoints.down('md')]: {
        marginTop: 0,
        padding: '126px 0 50px',
        backgroundPosition: 'center top',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '104px 0 34px',
        backgroundPosition: '40% top',
    },
}));

const HeroContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
        paddingInline: '16px',
    },
}));

const HeroGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.96fr) minmax(0, 1.04fr)',
    alignItems: 'center',
    gap: 'clamp(44px, 6vw, 84px)',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '46px',
    },
}));

const IntroColumn = styled(Box)(({ theme }) => ({
    minWidth: 0,

    [theme.breakpoints.down('md')]: {
        maxWidth: '720px',
        margin: '0 auto',
    },
}));

const HeroHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '610px',
    lineHeight: 1.04,
    letterSpacing: '-0.045em',

    [theme.breakpoints.down('md')]: {
        maxWidth: '660px',
    },

    [theme.breakpoints.down('sm')]: {
        lineHeight: 1.08,
    },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
    maxWidth: '610px',
    marginTop: '22px',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        marginTop: '18px',
        fontSize: '16px',
    },
}));

const TrustList = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: '26px',
    marginTop: '48px',

    [theme.breakpoints.down('sm')]: {
        gap: '20px',
        marginTop: '34px',
    },
}));

const TrustItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    minWidth: 0,
});

const TrustIcon = styled(Image)(({ theme }) => ({
    width: '44px',
    height: '44px',
    flexShrink: 0,
    objectFit: 'contain',

    [theme.breakpoints.down('sm')]: {
        width: '40px',
        height: '40px',
    },
}));

const TrustTitle = styled(Typography)({
    margin: 0,
    fontFamily: tokens.font.display,
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: tokens.color.uv800,
});

const TrustDescription = styled(Typography)({
    maxWidth: '300px',
    marginTop: '4px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: tokens.color.ink900,
});

const FormCard = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '24px 34px 18px',
    border: `1px solid ${alpha(tokens.color.ink900, 0.75)}`,
    borderRadius: '16px',
    backgroundColor: alpha(tokens.color.neutral0, 0.56),
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.down('sm')]: {
        padding: '22px 18px 18px',
        borderRadius: '14px',
    },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
    margin: 0,
    fontFamily: tokens.font.display,
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.035em',
    color: tokens.color.uv800,

    [theme.breakpoints.down('sm')]: {
        fontSize: '27px',
    },
}));

const FormTitleGradient = styled('span')({
    background: `linear-gradient(
        90deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv500} 48%,
        ${tokens.color.uv300} 100%
    )`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
});

const FormIntro = styled(Typography)(({ theme }) => ({
    marginTop: '6px',
    fontFamily: tokens.font.body,
    fontSize: '15px',
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
    marginTop: '30px',

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
    left: '14px',
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
    border: `1px solid ${alpha(tokens.color.ink900, 0.28)}`,
    borderRadius: '9px',
    outline: 'none',
    backgroundColor: alpha(tokens.color.neutral0, 0.42),
    fontFamily: tokens.font.body,
    fontSize: '15px',
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
    height: '52px',
    padding: '0 14px 0 38px',
});

const MessageControl = styled(FieldControl)({
    gridColumn: '1 / -1',
});

const MessageIconWrap = styled(FieldIconWrap)({
    top: '17px',
    transform: 'none',
});

const MessageField = styled('textarea')(({ theme }) => ({
    ...fieldBase,
    display: 'block',
    minHeight: '190px',
    padding: '14px 14px 14px 38px',
    resize: 'vertical',

    [theme.breakpoints.down('sm')]: {
        minHeight: '160px',
    },
}));

const PrivacyText = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '10px',
    fontFamily: tokens.font.body,
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: tokens.color.neutral600,

    [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        fontSize: '12px',
        textAlign: 'center',
    },
}));

const ContactStrip = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    marginTop: '64px',
    padding: '28px 30px',
    border: `1px solid ${alpha(tokens.color.ink900, 0.68)}`,
    borderRadius: '18px',
    backgroundColor: alpha(tokens.color.neutral0, 0.72),
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        padding: '26px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        marginTop: '40px',
        padding: '10px 20px',
        borderRadius: '16px',
    },
}));

const ContactStripItem = styled(Box)(({ theme }) => ({
    minWidth: 0,
    padding: '0 24px',
    borderLeft: `1px solid ${alpha(tokens.color.ink900, 0.28)}`,

    '&:first-of-type': {
        paddingLeft: 0,
        borderLeft: 0,
    },

    [theme.breakpoints.down('md')]: {
        padding: '18px 20px',

        '&:nth-of-type(odd)': {
            paddingLeft: 0,
            borderLeft: 0,
        },
    },

    [theme.breakpoints.down('sm')]: {
        padding: '22px 0',
        borderLeft: 0,
        borderTop: `1px solid ${alpha(tokens.color.ink900, 0.18)}`,

        '&:first-of-type': {
            borderTop: 0,
        },
    },
}));

const ContactStripIcon = styled(Image)({
    display: 'block',
    width: '40px',
    height: '40px',
    objectFit: 'contain',
});

const ContactStripLabel = styled(Typography)({
    marginTop: '14px',
    fontFamily: tokens.font.display,
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: tokens.color.uv800,
});

const ContactStripValue = styled(Typography)({
    marginTop: '7px',
    whiteSpace: 'pre-line',
    fontFamily: tokens.font.body,
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: tokens.color.ink900,
});

const ContactStripAction = styled('a')({
    display: 'inline-block',
    marginTop: '18px',
    fontFamily: tokens.font.body,
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: 1.4,
    color: tokens.color.uv800,
    textDecoration: 'none',

    '&:hover': {
        color: tokens.color.uv300,
    },

    '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv300}`,
        outlineOffset: '3px',
    },
});

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
                <HeroGrid>
                    <IntroColumn>
                        <HeroHeading
                            id="contact-hero-heading"
                            variant="h1"
                        >
                            Let&apos;s Build
                            <br />
                            Something Great
                        </HeroHeading>

                        <HeroDescription component="p">
                            Have a project in mind or just want to say hello? We&apos;d love to
                            hear from you. Fill out the form and our team will get back to
                            you as soon as possible.
                        </HeroDescription>

                        <TrustList>
                            {TRUST_ITEMS.map((item) => (
                                <TrustItem key={item.title}>
                                    <TrustIcon
                                        src="/images/send-icon.svg"
                                        alt=""
                                        width={44}
                                        height={44}
                                        aria-hidden="true"
                                    />

                                    <Box>
                                        <TrustTitle component="h2">
                                            {item.title}
                                        </TrustTitle>
                                        <TrustDescription component="p">
                                            {item.description}
                                        </TrustDescription>
                                    </Box>
                                </TrustItem>
                            ))}
                        </TrustList>
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
                                minHeight: '56px',
                                mt: '26px',
                                fontSize: '18px',
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
                </HeroGrid>

                <ContactStrip>
                    {CONTACT_ITEMS.map((item) => (
                        <ContactStripItem key={item.label}>
                            <ContactStripIcon
                                src="/images/send-icon.svg"
                                alt=""
                                width={40}
                                height={40}
                                aria-hidden="true"
                            />

                            <ContactStripLabel component="h3">
                                {item.label}
                            </ContactStripLabel>

                            <ContactStripValue component="p">
                                {item.value}
                            </ContactStripValue>

                            <ContactStripAction href={item.href}>
                                {item.action} →
                            </ContactStripAction>
                        </ContactStripItem>
                    ))}
                </ContactStrip>
            </HeroContainer>
        </HeroSection>
    );
}
