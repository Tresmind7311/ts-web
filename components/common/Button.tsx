'use client';

import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import { keyframes, styled } from '@mui/material/styles';
import type { CSSObject, Theme } from '@mui/material/styles';
import type { ElementType } from 'react';

import { tokens } from '@/theme/theme';

/* Add once at the top level of globals.css:
@property --button-border-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}
*/

export interface AppButtonProps extends ButtonProps {
    component?: ElementType;
    target?: string;
    rel?: string;
    textColor?: string;
    hoverTextColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    gradientBorderStart?: string;
    gradientBorderEnd?: string;

    /** Backward-compatible aliases; gradientBorder* takes precedence. */
    hoverBorderStart?: string;
    hoverBorderEnd?: string;
}

export interface SecondaryButtonProps extends AppButtonProps {}

const primaryGradient = `linear-gradient(
    100deg,
    ${tokens.color.uv800} 0%,
    ${tokens.color.uv500} 62%,
    ${tokens.color.uv300} 100%
)`;

const borderRotate = keyframes`
    from { --button-border-angle: 0deg; }
    to { --button-border-angle: 360deg; }
`;

const clickPulse = keyframes`
    0% {
        box-shadow:
            0 0 0 0 rgba(13, 176, 220, 0.24),
            var(--button-rest-shadow);
    }
    100% {
        box-shadow:
            0 0 0 10px rgba(13, 176, 220, 0),
            var(--button-rest-shadow);
    }
`;

const filteredProps = new Set<PropertyKey>([
    'ownerState', 'theme', 'sx', 'as',
    'textColor', 'hoverTextColor', 'borderColor',
    'backgroundColor', 'hoverBackgroundColor',
    'gradientBorderStart', 'gradientBorderEnd',
    'hoverBorderStart', 'hoverBorderEnd',
]);

const shouldForwardProp = (prop: PropertyKey) => !filteredProps.has(prop);
const solid = (color: string) => `linear-gradient(${color}, ${color})`;

const hover = '&:hover:not(.Mui-disabled)';
const active = '&:active:not(.Mui-disabled)';
const interaction = `${hover}, ${active}`;

function buttonStyles(
    theme: Theme,
    props: AppButtonProps,
    primary: boolean,
): CSSObject {
    const text = props.textColor ?? (primary ? tokens.color.neutral0 : '#343434');
    const border = props.borderColor ?? (primary ? 'transparent' : '#071463');
    const start = props.gradientBorderStart ?? props.hoverBorderStart ?? '#071463';
    const end = props.gradientBorderEnd ?? props.hoverBorderEnd ?? '#0DB0DC';

    const fill = props.backgroundColor === undefined
        ? (primary ? primaryGradient : solid('transparent'))
        : solid(props.backgroundColor);
    const hoverFill = props.hoverBackgroundColor === undefined
        ? fill
        : solid(props.hoverBackgroundColor);

    // Only 36 degrees carry the highlight; the rest stays transparent.
    const streak = `conic-gradient(
        from var(--button-border-angle),
        transparent 0deg,
        ${start} 10deg,
        ${end} 24deg,
        transparent 36deg,
        transparent 360deg
    )`;

    const rotation = `${borderRotate} 1.6s linear infinite`;
    const pulse = `${clickPulse} 420ms ease-out`;

    // The original opaque primary fill can cover border-box layers safely.
    // Transparent/custom fills require border-area to avoid center bleed.
    const opaquePrimary = primary
        && props.backgroundColor === undefined
        && props.hoverBackgroundColor === undefined;

    const fallbackHover: CSSObject = opaquePrimary
        ? {
            borderColor: 'transparent',
            background: `${hoverFill} padding-box,
                ${streak} border-box, ${solid(border)} border-box`,
        }
        : { background: `${hoverFill} padding-box` };

    return {
        '--button-border-angle': '0deg',
        '--button-rest-shadow': primary
            ? '0 12px 30px rgba(7, 20, 99, 0.16)'
            : '0 0 0 0 transparent',

        position: 'relative',
        minHeight: '52px',
        padding: '12px 24px',
        border: `2px solid ${border}`,
        borderRadius: '10px',
        fontFamily: tokens.font.body,
        fontSize: 'clamp(14px, 0.8vw, 18px)',
        fontWeight: 600,
        lineHeight: 1,
        textTransform: 'none',
        color: text,
        background: `${fill} padding-box`,
        boxShadow: 'var(--button-rest-shadow)',
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1), color 180ms ease, box-shadow 180ms ease',

        [interaction]: {
            ...fallbackHover,
            color: props.hoverTextColor ?? text,
        },
        [hover]: {
            transform: 'translateY(-1px)',
            boxShadow: primary
                ? '0 16px 38px rgba(7, 20, 99, 0.22)'
                : 'var(--button-rest-shadow)',
            animation: opaquePrimary ? rotation : 'none',
        },
        [active]: {
            transform: 'translateY(1px) scale(0.97)',
            animation: opaquePrimary ? `${rotation}, ${pulse}` : pulse,
        },

        // Clip both border layers to the actual rounded border ring.
        // The center stays transparent even over images or gradients.
        '@supports (background-clip: border-area)': {
            [interaction]: {
                borderColor: 'transparent',
                backgroundImage: `${streak}, ${solid(border)}, ${hoverFill}`,
                backgroundColor: 'transparent',
                backgroundOrigin: 'border-box, border-box, padding-box',
                backgroundClip: 'border-area, border-area, padding-box',
                backgroundRepeat: 'no-repeat',
            },
            [hover]: { animation: rotation },
            [active]: { animation: `${rotation}, ${pulse}` },
        },

        // An outline remains visible while the pulse animates box-shadow.
        '&.Mui-focusVisible': {
            outline: `2px solid ${end}`,
            outlineOffset: '3px',
        },
        '&.Mui-disabled': {
            color: text,
            borderColor: border,
            background: `${fill} padding-box`,
            opacity: 0.5,
            boxShadow: 'none',
            transform: 'none',
            animation: 'none',
        },

        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
            [interaction]: {
                '--button-border-angle': '0deg',
                animation: 'none',
                transform: 'none',
            },
        },
        '@media (forced-colors: active)': {
            '&, &:hover, &:active, &.Mui-disabled': {
                background: 'none',
                borderColor: 'ButtonText',
                color: 'ButtonText',
                boxShadow: 'none',
                animation: 'none',
            },
            '&.Mui-focusVisible': { outlineColor: 'Highlight' },
        },
        [theme.breakpoints.down('sm')]: { width: '100%' },
    };
}

const StyledPrimaryButton = styled(Button, { shouldForwardProp })<AppButtonProps>(
    ({ theme, ...props }) => buttonStyles(theme, props, true),
);

const StyledSecondaryButton = styled(Button, { shouldForwardProp })<SecondaryButtonProps>(
    ({ theme, ...props }) => buttonStyles(theme, props, false),
);

export function PrimaryButton({ variant = 'contained', ...props }: AppButtonProps) {
    return (
        <StyledPrimaryButton
            {...props}
            variant={variant}
            disableRipple
            disableTouchRipple
            disableElevation
        />
    );
}

export function SecondaryButton({ variant = 'text', ...props }: SecondaryButtonProps) {
    return (
        <StyledSecondaryButton
            {...props}
            variant={variant}
            disableRipple
            disableTouchRipple
            disableElevation
        />
    );
}
