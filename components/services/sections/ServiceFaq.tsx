'use client';

import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import type { ServiceFaqData } from '@/data/services/types';
import { tokens } from '@/theme/theme';

const Section = styled('section')(({ theme }) => ({
    padding: '80px 24px',
    backgroundColor: tokens.color.neutral0,
    [theme.breakpoints.down('sm')]: { padding: '56px 16px' },
}));

const Question = styled('summary')({
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: 1.4,
});

const Item = styled('details')({
    borderBottom: `1px solid ${tokens.color.neutral100}`,
    padding: '20px 0',
    '& p': { margin: '12px 0 0', lineHeight: 1.6 },
});

export default function ServiceFaq({ data }: { data: ServiceFaqData }) {
    return (
        <Section aria-labelledby="service-faq-heading">
            <Container maxWidth="lg">
                <Heading id="service-faq-heading" variant="h2">{data.title}</Heading>
                {data.items.map((item) => (
                    <Item key={item.question}>
                        <Question>{item.question}</Question>
                        <p>{item.answer}</p>
                    </Item>
                ))}
            </Container>
        </Section>
    );
}
