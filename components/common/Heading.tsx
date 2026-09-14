import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';

export type HeadingVariant = 'h1' | 'h2' | 'h4';

export interface HeadingProps extends Omit<TypographyProps, 'component' | 'variant'> {
    /** Semantic heading level and matching default size. */
    variant?: HeadingVariant;
    /** Custom text gradient. Set to false to use color or sx color instead. */
    gradient?: string | false;
}

interface StyledHeadingProps {
    headingVariant: HeadingVariant;
    gradient: string | false;
}

const DEFAULT_GRADIENT = `linear-gradient(
    90deg,
    ${tokens.color.uv800} 20%,
    ${tokens.color.uv300} 80%
)`;

const FONT_SIZES: Record<HeadingVariant, {
    desktop: string;
    tablet: string;
    mobile: string;
}> = {
    h1: {
        desktop: '58px',
        tablet: '45px',
        mobile: '38px',
    },
    h2: {
        desktop: '48px',
        tablet: '40px',
        mobile: '32px',
    },
    h4: {
        desktop: '28px',
        tablet: '20px',
        mobile: '18px',
    },
};

const StyledHeading = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'headingVariant' && prop !== 'gradient',
})<StyledHeadingProps>(({ theme, headingVariant, gradient }) => {
    const fontSizes = FONT_SIZES[headingVariant];

    return {
        margin: 0,
        fontFamily: tokens.font.display,
        fontSize: fontSizes.desktop,
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: '-0.045em',
        textTransform: 'uppercase',
        ...(gradient !== false && {
            background: gradient,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }),
        [theme.breakpoints.down('md')]: {
            fontSize: fontSizes.tablet,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: fontSizes.mobile,
        },
    };
});

export default function Heading({
    variant = 'h2',
    gradient = DEFAULT_GRADIENT,
    children,
    ...props
}: HeadingProps) {
    return (
        <StyledHeading
            component={variant}
            variant={variant}
            headingVariant={variant}
            gradient={gradient}
            {...props}
        >
            {children}
        </StyledHeading>
    );
}
