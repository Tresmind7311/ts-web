'use client';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { PrimaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';
const Card = styled('div')(({ theme }) => ({
    padding: 32, borderRadius: 24, backgroundColor: tokens.color.neutral0, marginTop: 28, '& h3': {
        fontFamily: tokens.font.display, fontSize: 24, margin: '24px 0 12px', color: tokens.color.ink900
    }, '& p': {
        fontFamily: tokens.font.body, fontSize: 14, lineHeight: 1.5, margin: '0 0 24px'
    }, [theme.breakpoints.down('sm')]: {
        padding: 24
    }
}));
export default function ContactProcess() {
    return <Card><Image src="/images/contact-faq-avatar.png" alt="" width={64} height={64} style={{
            borderRadius: '50%', objectFit: 'cover'
        }}/><h3>Book a 15 min call</h3><p>If you have any questions, just book a 15-minute call with us before subscribing.</p><PrimaryButton component="a" href="#contact-form" sx={{
            width: '100%', minHeight: 46, fontSize: 14
        }}>Book a Free Call!</PrimaryButton></Card>;
}
