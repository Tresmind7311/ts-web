'use client';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, styled } from '@mui/material/styles';
import ContactLocations from './ContactLocations';
import Heading from '@/components/common/Heading';
import { PrimaryButton, SecondaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';
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
const HeroSection = styled('section')({
    position: 'relative', background: "url('/images/contact-hero-background.jpg') center top / cover", color: tokens.color.ink900
});
const HeroIntro = styled('div')(({ theme }) => ({
    position: 'relative', minHeight: 590, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '200px 24px 50px', [theme.breakpoints.down('md')]: {
        minHeight: 540, padding: '130px 24px 80px'
    }, [theme.breakpoints.down('sm')]: {
        minHeight: 520, padding: '110px 16px 64px'
    }
}));
const Eyebrow = styled('p')(({ theme }) => ({
    margin: '0 0 18px', fontFamily: tokens.font.display, fontSize: 36, fontWeight: 600, color: tokens.color.uv800, [theme.breakpoints.down('sm')]: {
        fontSize: 24
    }
}));
const HeroHeading = styled(Heading)(({ theme }) => ({
    lineHeight: 1.1, fontSize: 60, [theme.breakpoints.down('md')]: {
        fontSize: 48
    }, [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(32px, 9vw, 42px)'
    }
}));
const Description = styled('p')(({ theme }) => ({
    maxWidth: 620, margin: '24px 0', fontFamily: tokens.font.body, fontSize: 20, lineHeight: 1.4, [theme.breakpoints.down('sm')]: {
        fontSize: 16
    }
}));
const Actions = styled('div')(({ theme }) => ({
    display: 'flex', gap: 26, flexWrap: 'wrap', justifyContent: 'center', '& a': {
        minHeight: 66, borderRadius: 14, fontSize: 24
    }, [theme.breakpoints.down('sm')]: {
        width: '100%', maxWidth: 360, gap: 12, '& a': {
            minHeight: 54, fontSize: 17
        }
    }
}));
const ContactStrip = styled(Container)(({ theme }) => ({
    display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24, paddingTop: 28, paddingBottom: 48, [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 28
    }, [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr', paddingInline: 24
    }
}));
const ContactLink = styled('a')({
    display: 'flex', alignItems: 'center', gap: 20, color: 'inherit', textDecoration: 'none', minWidth: 0, '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv300}`, outlineOffset: 4
    }, '& strong': {
        display: 'block', fontFamily: tokens.font.display, fontSize: 20, color: tokens.color.uv800, marginBottom: 6
    }, '& span': {
        fontFamily: tokens.font.body, fontSize: 16, overflowWrap: 'anywhere'
    }
});
const FormSection = styled('section')(({ theme }) => ({
    background: "url('/images/contact-hero-background.jpg') center / cover", borderRadius: '60px 60px 0 0', padding: '126px 24px 56px', [theme.breakpoints.down('md')]: {
        padding: '72px 24px 48px', borderRadius: '40px 40px 0 0'
    }, [theme.breakpoints.down('sm')]: {
        padding: '48px 16px 32px', borderRadius: '28px 28px 0 0'
    }
}));
const FormCard = styled('form')(({ theme }) => ({
    width: '100%',
    maxWidth: '1074px',
    margin: '0 auto',
    padding: '28px 40px 22px',
    border: `1px solid ${alpha(tokens.color.ink900, 0.16)}`,
    borderRadius: '16px',
    backgroundColor: tokens.color.neutral0,
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.down('sm')]: {
        padding: '22px 18px 18px',
        borderRadius: '14px',
    },
}));
const FormTitle = styled('h2')(({ theme }) => ({
    margin: 0,
    fontFamily: tokens.font.display,
    textAlign: 'center',
    fontSize: '40px',
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
const FormIntro = styled('p')(({ theme }) => ({
    margin: '22px 0 0',
    textAlign: 'center',
    fontFamily: tokens.font.body,
    fontSize: '22px',
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
    fontSize: '20px',
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
const FieldInput = styled('input')(({ theme }) => ({
    ...fieldBase,
    height: '58px',
    padding: '0 14px 0 38px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '16px'
    },
}));
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
    minHeight: '228px',
    padding: '14px 14px 14px 38px',
    resize: 'vertical',
    [theme.breakpoints.down('sm')]: {
        minHeight: '160px',
        fontSize: '16px',
    },
}));
const PrivacyText = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '10px',
    fontFamily: tokens.font.body,
    fontSize: '18px',
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
    return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 13c.35-2.35 2.05-3.7 4.5-3.7s4.15 1.35 4.5 3.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>);
}
function LockIcon() {
    return (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="10.2" r=".75" fill="currentColor" />
    </svg>);
}
export default function ContactHero() {
    return (<>
        <HeroSection aria-labelledby="contact-hero-heading">
            <ContactLocations />
            <HeroIntro><Eyebrow>LET’S CONNECT</Eyebrow><HeroHeading id="contact-hero-heading" variant="h1">FIND US HERE</HeroHeading><Description>Whether you’re nearby or reaching out from across the world, our team is always within reach. Explore where we’re based, drop us a message, and let’s start a conversation.</Description><Actions><PrimaryButton component="a" href="#contact-form">Start Your Project</PrimaryButton><SecondaryButton component="a" href="#contact-form">Schedule a Consultation</SecondaryButton></Actions></HeroIntro>
            <ContactStrip maxWidth={false} sx={{
                maxWidth: 1328
            }}>{CONTACT_ITEMS.map(item => <ContactLink key={item.label} href={item.href} aria-label={item.label + ': ' + item.value + '. ' + item.action}><Image src="/images/send-icon.svg" alt="" width={48} height={48} /><span><strong>{item.label}</strong>{item.value.replace('\n', ' ')}</span></ContactLink>)}</ContactStrip>
        </HeroSection><FormSection aria-labelledby="contact-form-heading">                    <FormCard id="contact-form" onSubmit={(event) => {
            event.preventDefault();
        }}>
            <FormTitle id="contact-form-heading">
                Send{' '}
                <FormTitleGradient>
                    Us a Message
                </FormTitleGradient>
            </FormTitle>

            <FormIntro>
                We&apos;re here to help and answer any question you might have.
            </FormIntro>

            <FormFields>
                <FieldControl>
                    <FieldIconWrap>
                        <UserIcon />
                    </FieldIconWrap>
                    <FieldInput name="name" type="text" placeholder="Full Name" autoComplete="name" aria-label="Full Name" />
                </FieldControl>

                <FieldControl>
                    <FieldIconWrap>
                        <UserIcon />
                    </FieldIconWrap>
                    <FieldInput name="email" type="email" placeholder="Email Address" autoComplete="email" aria-label="Email Address" />
                </FieldControl>

                <FieldControl>
                    <FieldIconWrap>
                        <UserIcon />
                    </FieldIconWrap>
                    <FieldInput name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" aria-label="Phone Number" />
                </FieldControl>

                <FieldControl>
                    <FieldIconWrap>
                        <UserIcon />
                    </FieldIconWrap>
                    <FieldInput name="subject" type="text" placeholder="Subject" aria-label="Subject" />
                </FieldControl>

                <MessageControl>
                    <MessageIconWrap>
                        <UserIcon />
                    </MessageIconWrap>
                    <MessageField name="message" placeholder="Tell us about your project" aria-label="Tell us about your project" />
                </MessageControl>
            </FormFields>

            <PrimaryButton type="submit" sx={{
                width: '100%',
                minHeight: {
                    xs: '54px', sm: '66px'
                },
                mt: '26px',
                fontSize: {
                    xs: '18px', sm: '24px'
                },
            }}>
                Send Message
            </PrimaryButton>

            <PrivacyText>
                <LockIcon />
                <span>
                    We never share your information with anyone.
                </span>
            </PrivacyText>
        </FormCard>
        </FormSection></>);
}
