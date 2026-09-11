'use client';

import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import type { ElementType } from 'react';

import { tokens } from '@/theme/theme';

export interface AppButtonProps extends ButtonProps {
    component?: ElementType;
    target?: string;
    rel?: string;
}

const StyledPrimaryButton = styled(Button)(({ theme }) => ({
    minHeight: '52px',
    padding: '12px 24px',
    borderRadius: '10px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    textTransform: 'none',
    color: tokens.color.neutral0,
    background: `linear-gradient(
        100deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv500} 62%,
        ${tokens.color.uv300} 100%
    )`,
    boxShadow: '0 12px 30px rgba(7, 20, 99, 0.16)',

    '&:hover': {
        background: `linear-gradient(
            100deg,
            ${tokens.color.uv800} 0%,
            ${tokens.color.uv500} 62%,
            ${tokens.color.uv300} 100%
        )`,
        boxShadow: '0 16px 38px rgba(7, 20, 99, 0.22)',
        transform: 'translateY(-1px)',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const StyledSecondaryButton = styled(Button)(({ theme }) => ({
    minHeight: '52px',
    padding: '12px 24px',
    borderRadius: '10px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    textTransform: 'none',
    color: tokens.color.neutral700,
    borderColor: 'rgba(7, 20, 99, 0.28)',
    background: 'rgba(255, 255, 255, 0.48)',

    '&:hover': {
        borderColor: tokens.color.uv500,
        background: 'rgba(255, 255, 255, 0.72)',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

export function PrimaryButton({
    variant = 'contained',
    ...props
}: AppButtonProps) {
    return <StyledPrimaryButton variant={variant} {...(props as ButtonProps)} />;
}

export function SecondaryButton({
    variant = 'outlined',
    ...props
}: AppButtonProps) {
    return <StyledSecondaryButton variant={variant} {...(props as ButtonProps)} />;
}
