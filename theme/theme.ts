import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// ─── Raw design tokens ────────────────────────────────────────────
// Source: design-system token files (colors-*.html, type-*.html, etc.)
export const tokens = {

    // ── Colors ──────────────────────────────────────────────────────
    color: {
        // Ultraviolet — primary, 30% of palette
        uv100: '#DBD6FD',
        uv300: '#0DB0DC',
        uv500: '#0783FC',  // base
        uv600: '#0DB0DC',  // hover
        uv800: '#071463',

        // Neutral — ink / paper / slate, 60% of palette
        neutral0: '#FFFFFF',  // Paper 0
        neutral50: '#F6F5F2',  // Paper
        neutral100: '#EFEFEB',
        neutral200: '#DDDBD5',
        neutral300: '#C7C5BE',
        neutral400: '#AEACB0',
        neutral500: '#8A8A93',  // Slate
        neutral600: '#6B6B75',
        neutral700: '#4A4A55',
        textmuted800: '#525252',
        ink900: '#12121A',  // Ink
        transparent0: '#ffffff00',

        // Coral — accent warm, 10% of palette
        coral100: '#FFE1D8',
        coral500: '#FF6B4D',
        coral600: '#E85534',

        // Mint — accent cool, 10% of palette
        mint100: '#D3F8EC',
        mint500: '#2BD9A0',
        mint600: '#1CB882',

        // Semantic aliases
        borderSubtle: '#E4E2DC',
        borderDefault: '#C7C5BE',
    },

    // ── Typography ──────────────────────────────────────────────────
    font: {
        display: '"Plus Jakarta Sans", system-ui, sans-serif',
        heroBody: '"Nunito Sans", system-ui, sans-serif',
        body: '"Inter", system-ui, sans-serif',
        mono: '"JetBrains Mono", "Fira Code", monospace',
    },

    // ── Spacing — 4px base grid ─────────────────────────────────────
    space: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
    },

    // ── Motion ──────────────────────────────────────────────────────
    motion: {
        fast: '120ms',
        base: '200ms',
        slow: '360ms',
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',  // ease-out, no bounce
    },

    // ── Radius ──────────────────────────────────────────────────────
    radius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
    },

    // ── Shadows — ink-tinted ─────────────────────────────────────────
    shadow: {
        sm: '0 1px 3px rgba(18,18,26,0.07), 0 1px 2px rgba(18,18,26,0.04)',
        md: '0 4px 12px rgba(18,18,26,0.09), 0 2px 4px rgba(18,18,26,0.05)',
        lg: '0 8px 32px rgba(18,18,26,0.13), 0 4px 8px rgba(18,18,26,0.06)',
        brand: '0 4px 20px rgba(79,61,245,0.35), 0 2px 6px rgba(79,61,245,0.20)',
    },
} as const;

// ─── MUI theme ────────────────────────────────────────────────────
let theme = createTheme({
    // ── Palette ─────────────────────────────────────────────────────
    palette: {
        mode: 'light',

        primary: {
            light: tokens.color.uv300,
            main: tokens.color.uv500,
            dark: tokens.color.uv600,
            contrastText: '#ffffff',
        },

        secondary: {
            light: tokens.color.coral100,
            main: tokens.color.coral500,
            dark: tokens.color.coral600,
            contrastText: '#ffffff',
        },

        // Mint as a third accent — surface via theme.palette.success
        success: {
            light: tokens.color.mint100,
            main: tokens.color.mint500,
            dark: tokens.color.mint600,
        },

        background: {
            default: tokens.color.neutral50,   // Paper
            paper: tokens.color.neutral0,    // Paper 0 (white)
        },

        text: {
            primary: tokens.color.ink900,
            secondary: tokens.color.neutral600,
            disabled: tokens.color.neutral400,
        },

        divider: tokens.color.borderSubtle,

        // Keep raw color values accessible via theme.palette.custom
        // (requires module augmentation in types/ — see below)
    },

    // ── Typography ──────────────────────────────────────────────────
    typography: {
        fontFamily: tokens.font.body,

        // Display / headings — Space Grotesk
        h1: {
            fontFamily: tokens.font.display,  // Plus Jakarta Sans
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: tokens.color.ink900,
        },
        h2: {
            fontFamily: tokens.font.display,
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
        },
        h3: {
            fontFamily: tokens.font.display,
            fontWeight: 600,
            fontSize: 'clamp(22px, 2.5vw, 36px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h4: {
            fontFamily: tokens.font.display,
            fontWeight: 600,
            fontSize: 'clamp(18px, 2vw, 28px)',
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
        },
        h5: {
            fontFamily: tokens.font.display,
            fontWeight: 600,
            fontSize: '22px',
            lineHeight: 1.35,
        },
        h6: {
            fontFamily: tokens.font.display,
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: 1.4,
        },

        // Body — Inter
        body1: {
            fontFamily: tokens.font.body,
            fontSize: '16px',  // body-base
            lineHeight: 1.5,
            color: tokens.color.neutral700,
        },
        body2: {
            fontFamily: tokens.font.body,
            fontSize: '14px',  // body-sm
            lineHeight: 1.5,
            color: tokens.color.neutral500,
        },
        subtitle1: {
            fontFamily: tokens.font.body,
            fontSize: '18px',  // body-lg
            lineHeight: 1.7,
            fontWeight: 400,
        },
        subtitle2: {
            fontFamily: tokens.font.body,
            fontSize: '16px',
            lineHeight: 1.5,
            fontWeight: 500,
        },

        // Eyebrow — Inter semibold, uppercase, tracked
        overline: {
            fontFamily: tokens.font.body,
            fontSize: '11px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: tokens.color.uv600,
        },

        caption: {
            fontFamily: tokens.font.body,
            fontSize: '12px',
            lineHeight: 1.4,
            color: tokens.color.neutral500,
        },

        button: {
            fontFamily: tokens.font.body,
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.01em',
            textTransform: 'none',
        },
    },

    // ── Shape ───────────────────────────────────────────────────────
    shape: { borderRadius: 8 },  // matches --radius-md

    // ── Spacing — 4px base grid ─────────────────────────────────────
    spacing: 4,  // theme.spacing(1) = 4px, theme.spacing(4) = 16px

    // ── Breakpoints ─────────────────────────────────────────────────
    breakpoints: {
        values: { xs: 0, sm: 640, md: 960, lg: 1280, xl: 1536 },
    },

    // ── Component overrides ─────────────────────────────────────────
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
                html: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    scrollBehavior: 'smooth',
                },
                '::selection': {
                    background: tokens.color.uv100,
                    color: tokens.color.uv800,
                },
                '::-webkit-scrollbar': { width: '6px' },
                '::-webkit-scrollbar-track': { background: tokens.color.neutral100 },
                '::-webkit-scrollbar-thumb': {
                    background: tokens.color.neutral300,
                    borderRadius: '3px',
                    '&:hover': { background: tokens.color.neutral400 },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: tokens.radius.full,
                    padding: '10px 24px',
                    transition: `all ${tokens.motion.base} ${tokens.motion.ease}`,
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: tokens.shadow.brand,
                        transform: 'translateY(-1px)',
                    },
                    '&:active': { transform: 'translateY(0)' },
                },
                outlined: {
                    borderColor: tokens.color.neutral300,
                    '&:hover': { borderColor: tokens.color.uv500 },
                },
                sizeSmall: { padding: '6px 16px', fontSize: '13px' },
                sizeLarge: { padding: '14px 32px', fontSize: '16px' },
            },
        },

        MuiLink: {
            styleOverrides: {
                root: {
                    color: tokens.color.uv500,
                    textDecoration: 'none',
                    transition: `color ${tokens.motion.fast} ${tokens.motion.ease}`,
                    '&:hover': { color: tokens.color.uv600 },
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: { backgroundImage: 'none' },
                elevation1: { boxShadow: tokens.shadow.sm },
                elevation2: { boxShadow: tokens.shadow.md },
                elevation3: { boxShadow: tokens.shadow.lg },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: tokens.radius.lg,
                    boxShadow: tokens.shadow.md,
                    border: `1px solid ${tokens.color.borderSubtle}`,
                },
            },
        },

        MuiDivider: {
            styleOverrides: {
                root: { borderColor: tokens.color.borderSubtle },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: tokens.radius.full,
                    fontWeight: 500,
                    fontSize: '12px',
                },
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: tokens.color.ink900,
                    fontSize: '12px',
                    borderRadius: tokens.radius.md,
                    padding: '6px 12px',
                },
            },
        },

        MuiContainer: {
            styleOverrides: {
                root: { paddingLeft: '24px', paddingRight: '24px' },
            },
        },
    },
});

theme = responsiveFontSizes(theme, { factor: 2.5 });

export default theme;