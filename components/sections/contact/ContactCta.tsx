'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Heading from '@/components/common/Heading';
import { styled } from '@mui/material/styles';
import { PrimaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';
const Section = styled('section')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    backgroundColor: tokens.color.neutral0,
    padding: '54px 0 52px',
    [theme.breakpoints.down('md')]: {
        padding: '44px 0',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '32px 0',
    },
}));
const CtaCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '1196px',
    margin: '0 auto',
    minHeight: '331px',
    overflow: 'hidden',
    borderRadius: '32px',
    backgroundColor: tokens.color.uv800,
    backgroundImage: "url('/images/CTA-Bg.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '64px 32px 48px',
    [theme.breakpoints.down('md')]: {
        minHeight: '330px',
        borderRadius: '26px',
        padding: '56px 28px 42px',
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '320px',
        borderRadius: '22px',
        padding: '46px 20px 36px',
        backgroundPosition: 'center center',
    },
}));
const Content = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1050px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    },
}));
const CtaHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '100%',
    color: tokens.color.neutral0,
    fontSize: '48px',
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: '-0.045em',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
        maxWidth: '560px',
        fontSize: 'clamp(38px, 5vw, 50px)',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '330px',
        fontSize: 'clamp(32px, 9vw, 42px)',
        lineHeight: 1.02,
    },
}));
const Subtitle = styled('p')(({ theme }) => ({
    margin: '24px 0 0',
    fontFamily: tokens.font.body,
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: tokens.color.neutral0,
    [theme.breakpoints.down('sm')]: {
        marginTop: '22px',
        fontSize: '17px',
    },
}));
const ButtonWrap = styled(Box)(({ theme }) => ({
    marginTop: '34px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        marginTop: '30px',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '28px',
        maxWidth: '320px',
    },
}));
export default function ContactCta() {
    return (<Section aria-labelledby="contact-cta-heading">
            <Container maxWidth="lg">
                <CtaCard>
                    <Content>
                        <CtaHeading id="contact-cta-heading" variant="h2" gradient={false} sx={{
            color: tokens.color.neutral0,
            fontWeight: 600,
        }}>
                            Have a challenge worth solving?
                        </CtaHeading>

                        <Subtitle>
                            Let&apos;s turn it into a clear plan.
                        </Subtitle>

                        <ButtonWrap>
                            <PrimaryButton component="a" href="#contact-form" sx={{
            fontSize: {
                md: '20px',
                sm: '18px',
            },
        }}>
                                Start a Conversation&nbsp;&nbsp;→
                            </PrimaryButton>
                        </ButtonWrap>
                    </Content>
                </CtaCard>
            </Container>
        </Section>);
}
