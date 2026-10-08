'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { tokens } from '@/theme/theme';

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
    justifyContent: 'center',
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

const DrawerFooter = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    paddingTop: '28px',
}));

const DrawerFooterLink = styled('a')(() => ({
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: 500,
    color: tokens.color.neutral500,
    textDecoration: 'none',
    letterSpacing: '0.01em',
    transition: `color ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover': { color: tokens.color.ink900 },
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
                alt="Tresmind"
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

    const closeDrawer = useCallback(() => setDrawerOpen(false), []);

    return (
        <>
            <NavSpace ref={spaceRef} reserve={pathname !== '/' ? 1 : 0}>
            <NavRoot ref={headerRef} scrolled={scrolled ? 1 : 0} visible={navVisible ? 1 : 0} dark={darkBackdrop ? 1 : 0} role="banner" inert={!navVisible}>
                <NavInner maxWidth="xl">

                    {/* Logo */}
                    <LogoLink href="/" aria-label="Tresmind — home">
                        <LogoMark />
                    </LogoLink>

                    {/* Desktop nav */}
                    <DesktopNav aria-label="Main navigation">
                        {NAV_LINKS.map(link => (
                            <NavLink
                                key={link.label}
                                href={link.href}
                                className={isLinkActive(link.href) ? 'active' : ''}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </DesktopNav>

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
                        {NAV_LINKS.map(link => (
                            <DrawerLink key={link.label} href={link.href} onClick={closeDrawer}>
                                {link.label}
                            </DrawerLink>
                        ))}
                    </DrawerNav>

                    <DrawerFooter>
                        <DrawerFooterLink href="#">Instagram</DrawerFooterLink>
                        <DrawerFooterLink href="#">LinkedIn</DrawerFooterLink>
                        <DrawerFooterLink href="#">Behance</DrawerFooterLink>
                    </DrawerFooter>

                </DrawerInner>
            </Drawer>
        </>
    );
}