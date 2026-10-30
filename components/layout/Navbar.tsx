'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { tokens } from '@/theme/theme';
import { serviceMenu } from '@/data/services/menu';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import BrushIcon from '@mui/icons-material/Brush';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// ─── Nav data ─────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
];

// ═══════════════════════════════════════════════════════════════════
// Styled components
// ═══════════════════════════════════════════════════════════════════

const NavSpace = styled('div')<{ reserve: number }>(({ theme, reserve }) => ({
    '--navbar-height': '88px',
    height: reserve ? 'var(--navbar-measured-height, var(--navbar-height))' : 0,
    [theme.breakpoints.down('md')]: { '--navbar-height': '68px' },
}));

const NavRoot = styled('header')<{ scrolled: number; visible: number; dark: number }>(({ theme, scrolled, visible, dark }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 'var(--navbar-height)',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: '12px clamp(24px, 4vw, 64px)',
    [theme.breakpoints.down('md')]: {
        padding: '8px 20px',
    },
    transition: `background ${tokens.motion.base} ${tokens.motion.ease},
                      box-shadow ${tokens.motion.base} ${tokens.motion.ease},
                      opacity 200ms cubic-bezier(0.16,1,0.3,1),
                      transform 200ms cubic-bezier(0.16,1,0.3,1)`,
    backgroundColor: scrolled
        ? alpha(tokens.color.neutral0, 0.08)
        : dark ? 'transparent' : '#f7fafc',
    backgroundImage: scrolled || dark
        ? 'none'
        : 'radial-gradient(ellipse at 25% 50%, rgba(14, 165, 190, 0.06), transparent 65%)',
    backdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
    color: dark ? '#fff' : '#121343',
    '--navbar-accent': dark ? '#fff' : '#071463',
    '& img': { filter: dark ? 'brightness(0) invert(1)' : 'none' },
    transform: visible ? 'translateY(0)' : 'translateY(-100%)',
    visibility: visible ? 'visible' : 'hidden',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
}));

const NavInner = styled(Container)(({ theme }) => ({
    width: '100%',
    maxWidth: 'none !important',
    padding: '0 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        columnGap: '20px',
    },
}));

const LogoLink = styled('a')(() => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    flexShrink: 0,
    transition: `opacity ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover': { opacity: 0.7 },
}));

const DesktopNav = styled('nav')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px, 1.8vw, 28px)',
    },
}));

const NavLink = styled('a')(() => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: 1.4,
    color: 'inherit',
    textDecoration: 'none',
    padding: '10px 0',
    borderRadius: tokens.radius.full,
    letterSpacing: 'normal',
    whiteSpace: 'nowrap',
    '&:focus-visible': {
        outline: '2px solid currentColor',
        outlineOffset: '4px',
    },
    transition: `color ${tokens.motion.fast} ${tokens.motion.ease},
                     background ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover': {
        color: 'var(--navbar-accent)',
        background: alpha(tokens.color.ink900, 0.05),
    },
    '&.active': {
        color: 'var(--navbar-accent)',
        fontWeight: 600,
    },
}));
const ServicesNavItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

const menuHeadingGradient = {
    background: `linear-gradient(90deg, ${tokens.color.uv800} 20%, ${tokens.color.uv300} 80%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
};

const ServicesDropdown = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - clamp(32px, 3vw, 56px))',
    maxWidth: '1800px',
    maxHeight: 'calc(100dvh - var(--navbar-height))',
    overflowY: 'auto',
    padding: 'clamp(10px, 1vw, 16px)',
    border: `1px solid ${alpha(tokens.color.uv300, 0.2)}`,
    borderRadius: '28px',
    background: 'linear-gradient(145deg, #ffffff 5%, #f5faff 100%)',
    boxShadow: '0 22px 70px rgba(16, 45, 105, 0.16)',
    color: tokens.color.ink900,
    zIndex: 10,
    '@media (prefers-reduced-motion: reduce)': {
        scrollBehavior: 'auto',
    },
    [theme.breakpoints.down('md')]: { display: 'none' },
}));

const MegaMenuLayout = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(220px, 0.78fr) minmax(0, 3fr)',
    gap: 'clamp(14px, 1.4vw, 24px)',
    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'minmax(190px, 0.68fr) minmax(0, 3fr)',
    },
}));

const MegaIntro = styled(Box)(({ theme }) => ({
    minHeight: '100%',
    padding: 'clamp(20px, 2vw, 34px)',
    borderRadius: '22px',
    background: 'linear-gradient(150deg, #f0f7ff 0%, #e5f1ff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& .mega-kicker': {
        marginBottom: '15px',
        color: tokens.color.uv500,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
    },
    '& .mega-title': {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(25px, 2.1vw, 36px)',
        lineHeight: 1.12,
        letterSpacing: '-0.035em',
        color: tokens.color.uv800,
    },
    '& .mega-title span': {
        ...menuHeadingGradient,
    },
    '& .mega-description': {
        marginTop: '18px',
        color: tokens.color.neutral700,
        fontSize: '14px',
        lineHeight: 1.65,
    },
    [theme.breakpoints.down('lg')]: { padding: '20px' },
}));

const AllServicesLink = styled('a')({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: 'auto',
    padding: '12px 18px',
    borderRadius: tokens.radius.full,
    background: `linear-gradient(100deg, ${tokens.color.uv800}, ${tokens.color.uv500})`,
    color: tokens.color.neutral0,
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: `transform ${tokens.motion.fast} ${tokens.motion.ease}, box-shadow ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(16, 19, 108, 0.2)' },
    '&:focus-visible': { outline: `3px solid ${tokens.color.uv300}`, outlineOffset: '3px' },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
});

const ServiceCardGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(3, minmax(132px, auto))',
    gap: 'clamp(8px, 0.8vw, 14px)',
    [theme.breakpoints.down('lg')]: { gridTemplateRows: 'repeat(3, minmax(140px, auto))' },
}));

const ServiceCard = styled(Box)(({ theme }) => ({
    minWidth: 0,
    padding: 'clamp(12px, 1.15vw, 18px)',
    border: `1px solid ${alpha(tokens.color.uv300, 0.16)}`,
    borderRadius: '18px',
    background: 'rgba(255, 255, 255, 0.72)',
    boxShadow: '0 4px 14px rgba(18, 48, 106, 0.035)',
    transition: `border-color ${tokens.motion.fast} ${tokens.motion.ease}, box-shadow ${tokens.motion.fast} ${tokens.motion.ease}, transform ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover, &:focus-within': {
        borderColor: alpha(tokens.color.uv300, 0.48),
        boxShadow: '0 10px 24px rgba(18, 48, 106, 0.09)',
        transform: 'translateY(-2px)',
    },
    '&:focus-within': { outline: `2px solid ${alpha(tokens.color.uv500, 0.42)}`, outlineOffset: '2px' },
    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        '&:hover, &:focus-within': { transform: 'none' },
    },
    [theme.breakpoints.down('lg')]: { padding: '12px' },
}));

const CategoryHeader = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '42px minmax(0, 1fr)',
    alignItems: 'center',
    gap: '10px',
    minHeight: '42px',
    marginBottom: '9px',
});

const CategoryIcon = styled(Box)({
    width: '42px',
    height: '42px',
    display: 'grid',
    placeItems: 'center',
    borderRadius: '13px',
    color: tokens.color.uv500,
    background: `linear-gradient(145deg, ${alpha(tokens.color.uv300, 0.13)}, ${alpha(tokens.color.uv300, 0.04)})`,
    '& svg': { fontSize: '24px' },
});

const CategoryLink = styled('a')({
    ...menuHeadingGradient,
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: 0,
    gap: '5px',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(13px, 1vw, 15px)',
    fontWeight: 700,
    lineHeight: 1.3,
    textDecoration: 'none',
    '&:hover span:last-child': { transform: 'translateX(3px)' },
    '& span:last-child': { color: tokens.color.uv300, transition: `transform ${tokens.motion.fast} ${tokens.motion.ease}` },
    '&:focus-visible': { outline: `2px solid ${tokens.color.uv500}`, outlineOffset: '3px', borderRadius: '3px' },
});

const ChildLink = styled('a')({
    display: 'flex',
    alignItems: 'baseline',
    gap: '7px',
    minWidth: 0,
    padding: '4px 2px',
    color: tokens.color.neutral700,
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(11px, 0.82vw, 13px)',
    lineHeight: 1.35,
    textDecoration: 'none',
    '&:hover': { color: tokens.color.uv800 },
    '&:focus-visible': { outline: `2px solid ${tokens.color.uv500}`, outlineOffset: '2px', borderRadius: '3px' },
    '&::before': { content: '"›"', color: tokens.color.uv300, fontWeight: 700 },
});

const CATEGORY_ICONS = [
    PhoneIphoneIcon, SmartToyIcon, CodeIcon,
    LanguageIcon, CloudQueueIcon, BrushIcon,
    GroupsIcon, AccountTreeIcon, QueryStatsIcon,
];
const MEGA_MENU_ORDER = [0, 3, 6, 1, 4, 7, 2, 5, 8];

const QuoteLink = styled('a')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'inline-flex',
    },
    justifySelf: 'end',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    padding: '0 20px',
    borderRadius: '12px',
    background: 'linear-gradient(100deg, #10136c 0%, #04b6d8 80%)',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    '&:focus-visible': {
        outline: '2px solid var(--navbar-accent)',
        outlineOffset: '4px',
    },
}));

const HamburgerBtn = styled(IconButton)(({ theme }) => ({
    display: 'flex',
    padding: '11px',
    minWidth: '44px',
    minHeight: '44px',
    color: 'inherit',
    [theme.breakpoints.up('md')]: { display: 'none' },
}));

const HamburgerBox = styled(Box)(() => ({
    width: 22,
    height: 16,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const HamLine = styled(Box)<{ open: number; pos: 'top' | 'mid' | 'bot' }>(
    ({ open, pos }) => ({
        width: '100%',
        height: 2,
        background: 'currentColor',
        borderRadius: 2,
        transition: `transform ${tokens.motion.base} ${tokens.motion.ease},
                          opacity ${tokens.motion.fast} ${tokens.motion.ease}`,
        transformOrigin: 'center',
        ...(open && pos === 'top' && { transform: 'translateY(7px) rotate(45deg)' }),
        ...(open && pos === 'mid' && { opacity: 0, transform: 'scaleX(0)' }),
        ...(open && pos === 'bot' && { transform: 'translateY(-7px) rotate(-45deg)' }),
    })
);

const DrawerInner = styled(Box)(() => ({
    width: '100vw',
    height: '100dvh',
    background: tokens.color.neutral0,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 28px 48px',
    overflowY: 'auto',
}));

const DrawerHeader = styled(Box)(() => ({
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
}));

const DrawerNav = styled('nav')(() => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '24px',
    gap: '0px',
}));

const DrawerLink = styled('a')(() => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'clamp(32px, 9vw, 56px)',
    color: tokens.color.ink900,
    textDecoration: 'none',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    padding: '14px 0',
    borderBottom: `1px solid ${tokens.color.borderSubtle}`,
    transition: `color ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover': { color: tokens.color.uv500 },
    '&:last-child': { borderBottom: 'none' },
}));


import Image from 'next/image';
import { Container } from '@mui/material';

function LogoMark() {
    return (
        <Box
            sx={{
                width: { xs: '64px', md: '80px' },
                display: 'flex',
            }}
        >
            <Image
                src="/TS-log.png"
                alt="Tresmind logo"
                width={80}
                height={40}
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                }}
                priority
            />
        </Box>
    );
}

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

// Sample painted surfaces at navbar height, including pointer-inert canvas frames.
function isBackdropDark(header: HTMLElement) {
    const visibility = header.style.visibility;
    const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('main canvas'));
    const pointerEvents = canvases.map(canvas => canvas.style.pointerEvents);
    try {
        header.style.visibility = 'hidden';
        canvases.forEach(canvas => { canvas.style.pointerEvents = 'auto'; });
        const y = header.getBoundingClientRect().height / 2;
        let darkSamples = 0;
        for (const fraction of [0.25, 0.5, 0.75]) {
            const x = window.innerWidth * fraction;
            let color: number[] | undefined;
            const elements = document.elementsFromPoint(x, y);
            for (const hit of elements) {
                if (header.contains(hit)) continue;
                // Use the frame's surface color, rather than transient image highlights.
                for (let element: Element | null = hit; element; element = element.parentElement) {
                    const style = window.getComputedStyle(element);
                    if (style.visibility === 'hidden' || Number(style.opacity) === 0) break;
                    const rgba = style.backgroundColor.match(/[\d.]+/g)?.map(Number);
                    if (rgba && (rgba[3] ?? 1) >= 0.5) {
                        color = rgba;
                        break;
                    }
                    const gradient = style.backgroundImage;
                    const hex = gradient.match(/#([\da-f]{6})/i);
                    const rgb = gradient.match(/rgba?\(([^)]+)\)/)?.[1].match(/[\d.]+/g)?.map(Number);
                    if (hex) color = [0, 2, 4].map(i => parseInt(hex[1].slice(i, i + 2), 16));
                    else if (rgb && (rgb[3] ?? 1) >= 0.5) color = rgb;
                    if (color) break;
                }
                if (color) break;
            }
            if (color) {
                const [r, g, b] = color.slice(0, 3).map(value => {
                    const s = value / 255;
                    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                });
                if (0.2126 * r + 0.7152 * g + 0.0722 * b < 0.179) darkSamples++;
            }
        }
        return darkSamples >= 2;
    } finally {
        header.style.visibility = visibility;
        canvases.forEach((canvas, i) => { canvas.style.pointerEvents = pointerEvents[i]; });
    }
}

export default function Navbar() {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const spaceRef = useRef<HTMLDivElement>(null);
    const [scrollHidden, setScrollHidden] = useState(false);
    const [darkBackdrop, setDarkBackdrop] = useState(false);

    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [activeLink, setActiveLink] = useState('');

    // The homepage keeps its existing hero reveal gate.
    // Every other route shows the navbar immediately.
    const [homeNavVisible, setHomeNavVisible] = useState(false);
    const navVisible = (pathname !== '/' || homeNavVisible)
        && (!scrollHidden || drawerOpen);

    // Reserve the actual rendered height on inner pages, including after resize.
    useEffect(() => {
        const header = headerRef.current;
        const space = spaceRef.current;
        if (!header || !space) return;
        const measure = () => space.style.setProperty(
            '--navbar-measured-height', `${header.getBoundingClientRect().height}px`,
        );
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(header);
        return () => observer.disconnect();
    }, []);

    // Direction uses actual scroll changes; viewport geometry supplies contrast.
    useEffect(() => {
        let previousY = Math.max(0, window.scrollY);
        let raf = 0;
        setScrollHidden(false);
        const update = () => {
            raf = 0;
            const y = Math.max(0, window.scrollY);
            setScrolled(y > 20);
            if (y <= 0) setScrollHidden(false);
            else if (y !== previousY) {
                const focused = headerRef.current?.contains(document.activeElement);
                setScrollHidden(y > previousY && !focused);
            }
            previousY = y;
            const header = headerRef.current;
            if (header) setDarkBackdrop(pathname === '/' && isBackdropDark(header));
        };
        const schedule = () => {
            if (!raf) raf = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        // Deferred sections can replace placeholders without a scroll event.
        const observer = new MutationObserver(schedule);
        const main = document.querySelector('main');
        if (main) observer.observe(main, { childList: true, subtree: true });
        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            window.cancelAnimationFrame(raf);
            observer.disconnect();
        };
    }, [pathname]);

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    // Highlight homepage sections only.
    useEffect(() => {
        if (pathname !== '/') {
            setActiveLink('');
            return;
        }

        const ids = NAV_LINKS
            .filter(link => link.href.startsWith('/#'))
            .map(link => link.href.slice(2));

        const els = ids
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (!els.length) return;

        const obs = new IntersectionObserver(
            entries =>
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveLink(entry.target.id);
                    }
                }),
            { threshold: 0.4 },
        );

        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [pathname]);

    // Reset the homepage reveal state whenever we enter the homepage.
    useEffect(() => {
        if (pathname === '/') {
            setHomeNavVisible(false);
        }
    }, [pathname]);

    // ── Homepage hero reveal-gate listener ─────────────────────────
    useEffect(() => {
        const onHeroChange = (e: Event) => {
            if (pathname !== '/') return;

            const { complete } = (
                e as CustomEvent<{ complete: boolean }>
            ).detail;

            setHomeNavVisible(complete);
        };

        window.addEventListener('hero-complete-change', onHeroChange);
        return () =>
            window.removeEventListener('hero-complete-change', onHeroChange);
    }, [pathname]);

    const isLinkActive = (href: string) => {
        if (href === '/services') {
            return pathname.startsWith('/services');
        }

        if (pathname === '/' && href.startsWith('/#')) {
            return activeLink === href.slice(2);
        }

        return false;
    };

    const [servicesOpen, setServicesOpen] = useState(false);
    const closeDrawer = useCallback(() => { setDrawerOpen(false); setServicesOpen(false); setExpandedCategory(null); }, []);

    useEffect(() => {
        if (!megaOpen) return;
        const dismiss = (event: PointerEvent) => {
            if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false);
        };
        document.addEventListener('pointerdown', dismiss);
        return () => document.removeEventListener('pointerdown', dismiss);
    }, [megaOpen]);

    return (
        <>
            <NavSpace ref={spaceRef} reserve={pathname !== '/' ? 1 : 0}>
                <NavRoot ref={headerRef} scrolled={scrolled ? 1 : 0} visible={navVisible ? 1 : 0} dark={darkBackdrop ? 1 : 0} role="banner" inert={!navVisible}
                    onKeyDown={event => { if (event.key === 'Escape') { setMegaOpen(false); (headerRef.current?.querySelector('#services-trigger') as HTMLElement | null)?.focus(); } }}
                    onMouseLeave={() => setMegaOpen(false)}
                    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMegaOpen(false); }}>
                    <NavInner maxWidth="xl">

                        {/* Logo */}
                        <LogoLink href="/" aria-label="Tresmind — home">
                            <LogoMark />
                        </LogoLink>

                        {/* Desktop nav */}
                        <DesktopNav aria-label="Main navigation">
                            {NAV_LINKS.map(link =>
                                link.href === '/services' ? (
                                    <ServicesNavItem key={link.label} onMouseEnter={() => setMegaOpen(true)} onFocus={event => { if (event.target.matches(':focus-visible')) setMegaOpen(true); }}>
                                        <NavLink
                                            id="services-trigger"
                                            href={link.href}
                                            className={isLinkActive(link.href) ? 'active' : ''}
                                            aria-expanded={megaOpen}
                                            aria-haspopup="true"
                                            aria-controls="services-mega-menu"
                                            onClick={() => setMegaOpen(false)}
                                        >
                                            {link.label}
                                        </NavLink>
                                    </ServicesNavItem>
                                ) : (
                                    <NavLink
                                        key={link.label}
                                        href={link.href}
                                        className={isLinkActive(link.href) ? 'active' : ''}
                                        onClick={() => setMegaOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                )
                            )}
                        </DesktopNav>

                        {megaOpen && <ServicesDropdown role="navigation" id="services-mega-menu" aria-label="Services menu" onMouseEnter={() => setMegaOpen(true)}>
                            <MegaMenuLayout>
                                <MegaIntro>
                                    <Box className="mega-kicker">Our Services</Box>
                                    <Box component="h2" className="mega-title">Build what<br />comes <span>next</span></Box>
                                    <Box className="mega-description">Explore Tresmind services and find the right starting point for your project.</Box>
                                    <AllServicesLink href="/services" onClick={() => setMegaOpen(false)}>All services <span aria-hidden="true">→</span></AllServicesLink>
                                </MegaIntro>
                                <ServiceCardGrid>
                                    {MEGA_MENU_ORDER.map(index => {
                                        const category = serviceMenu[index];
                                        if (!category) return null;
                                        const Icon = CATEGORY_ICONS[index];
                                        return (
                                            <ServiceCard key={category.label}>
                                                <CategoryHeader>
                                                    <CategoryIcon aria-hidden="true"><Icon /></CategoryIcon>
                                                    <CategoryLink href={'href' in category ? category.href : '/services'} onClick={() => setMegaOpen(false)}>
                                                        <span>{category.label}</span><span aria-hidden="true">→</span>
                                                    </CategoryLink>
                                                </CategoryHeader>
                                                {category.children.map(child => typeof child === 'string'
                                                    ? <Box key={child} aria-disabled="true" title="Page coming soon" sx={{ py: '4px', color: tokens.color.neutral700, fontSize: '12px', lineHeight: 1.35 }}>› {child} <Box component="span" sx={{ fontSize: '10px', whiteSpace: 'nowrap' }}>(Coming soon)</Box></Box>
                                                    : <ChildLink key={child.href} href={child.href} onClick={() => setMegaOpen(false)}>{child.label}</ChildLink>)}
                                            </ServiceCard>
                                        );
                                    })}
                                </ServiceCardGrid>
                            </MegaMenuLayout>
                        </ServicesDropdown>}

                        <QuoteLink href="/contact">Get a Quote</QuoteLink>

                        {/* Mobile hamburger */}
                        <HamburgerBtn
                            onClick={() => setDrawerOpen(o => !o)}
                            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={drawerOpen}
                            disableRipple
                        >
                            <HamburgerBox>
                                <HamLine open={drawerOpen ? 1 : 0} pos="top" />
                                <HamLine open={drawerOpen ? 1 : 0} pos="mid" />
                                <HamLine open={drawerOpen ? 1 : 0} pos="bot" />
                            </HamburgerBox>
                        </HamburgerBtn>

                    </NavInner>
                </NavRoot>
            </NavSpace>

            {/* Full-screen mobile menu */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
                transitionDuration={{ enter: 300, exit: 220 }}
                slotProps={{
                    paper: { sx: { width: '100%', boxShadow: 'none', background: 'transparent' } },
                }}
                ModalProps={{ keepMounted: true }}
            >
                <DrawerInner role="dialog" aria-modal="true" aria-label="Navigation menu">

                    <DrawerHeader>
                        <LogoLink href="/" onClick={closeDrawer} aria-label="Tresmind — home">
                            <LogoMark />
                        </LogoLink>
                        <HamburgerBtn onClick={closeDrawer} aria-label="Close menu" disableRipple>
                            <HamburgerBox>
                                <HamLine open={1} pos="top" />
                                <HamLine open={1} pos="mid" />
                                <HamLine open={1} pos="bot" />
                            </HamburgerBox>
                        </HamburgerBtn>
                    </DrawerHeader>

                    <DrawerNav aria-label="Mobile navigation">
                        {NAV_LINKS.map(link =>
                            link.href === '/services' ? (
                                <Box key={link.label}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <DrawerLink
                                            href={link.href}
                                            onClick={closeDrawer}
                                            sx={{ flex: 1 }}
                                        >
                                            {link.label}
                                        </DrawerLink>

                                        <IconButton
                                            onClick={() => setServicesOpen(open => !open)}
                                            aria-label="Toggle services submenu"
                                            aria-expanded={servicesOpen}
                                            aria-controls="mobile-services-submenu"
                                            sx={{ color: tokens.color.ink900, minWidth: 44, minHeight: 44 }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    fontSize: '24px',
                                                    transform: servicesOpen
                                                        ? 'rotate(180deg)'
                                                        : 'rotate(0)',
                                                    transition: 'transform 200ms ease',
                                                }}
                                            >
                                                ⌄
                                            </Box>
                                        </IconButton>
                                    </Box>

                                    {servicesOpen && (
                                        <Box id="mobile-services-submenu" sx={{ pl: 2, pb: 2 }}>
                                            {serviceMenu.map(category => <Box key={category.label} sx={{ borderBottom: `1px solid ${tokens.color.borderSubtle}` }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {'href' in category ? <Box component="a" href={category.href} onClick={closeDrawer} sx={{ flex: 1, py: 1.5, color: tokens.color.ink900, textDecoration: 'none', fontWeight: 600, '&:focus-visible': { outline: '2px solid #071463' } }}>{category.label}</Box>
                                                        : <Box sx={{ flex: 1, py: 1.5, color: tokens.color.ink900, fontWeight: 600 }}>{category.label}</Box>}
                                                    {category.children.length > 0 && <IconButton aria-label={`Toggle ${category.label} sub-services`} aria-expanded={expandedCategory === category.label} aria-controls={`mobile-category-${serviceMenu.indexOf(category)}`} onClick={() => setExpandedCategory(current => current === category.label ? null : category.label)} sx={{ minWidth: 44, minHeight: 44, color: tokens.color.ink900 }}>⌄</IconButton>}
                                                </Box>
                                                {expandedCategory === category.label && <Box id={`mobile-category-${serviceMenu.indexOf(category)}`} sx={{ pl: 2, pb: 1 }}>
                                                    {category.children.map(child => typeof child === 'string'
                                                        ? <Box key={child} aria-disabled="true" sx={{ py: 1.25, color: '#697586', fontSize: '14px' }}>{child} (Coming soon)</Box>
                                                        : <Box key={child.href} component="a" href={child.href} onClick={closeDrawer} sx={{ display: 'block', py: 1.25, color: tokens.color.ink900, fontSize: '14px', textDecoration: 'none', '&:focus-visible': { outline: '2px solid #071463' } }}>{child.label}</Box>)}
                                                </Box>}
                                            </Box>)}
                                        </Box>
                                    )}
                                </Box>
                            ) : (
                                <DrawerLink
                                    key={link.label}
                                    href={link.href}
                                    onClick={closeDrawer}
                                >
                                    {link.label}
                                </DrawerLink>
                            )
                        )}
                    </DrawerNav>

                </DrawerInner>
            </Drawer>
        </>
    );
}
