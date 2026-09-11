'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { tokens } from '@/theme/theme';

// ─── Nav data ─────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/services' },
    { label: 'Studio', href: '/#studio' },
    { label: 'Contact', href: '/#contact' },
];

// ═══════════════════════════════════════════════════════════════════
// Styled components
// ═══════════════════════════════════════════════════════════════════

const NavRoot = styled('header')<{ scrolled: number; visible: number }>(({ scrolled, visible }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 'var(--nav-height, 72px)',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 24px',
    transition: `background ${tokens.motion.base} ${tokens.motion.ease},
                      box-shadow ${tokens.motion.base} ${tokens.motion.ease},
                      opacity 500ms cubic-bezier(0.16,1,0.3,1)`,
    backgroundColor: scrolled
        ? alpha(tokens.color.neutral0, 0.08)
        : 'transparent',
    backdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
    // boxShadow: scrolled ? `0 1px 0 ${tokens.color.borderSubtle}` : 'none',
    // ── Hero reveal-gate ────────────────────────────────────────────
    // Hidden until HeroSection's canvas sequence reaches its final
    // frame (see hero-complete-change listener below). Hides again
    // if the user scrolls back out of that state.
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
}));

const NavInner = styled(Container)(() => ({
    width: '100%',
    // maxWidth: '1280px',
    // margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: '80px'
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
        gap: '4px',
    },
}));

const NavLink = styled('a')(() => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '14px',
    color: tokens.color.neutral600,
    textDecoration: 'none',
    padding: '6px 16px',
    borderRadius: tokens.radius.full,
    letterSpacing: '0.01em',
    transition: `color ${tokens.motion.fast} ${tokens.motion.ease},
                     background ${tokens.motion.fast} ${tokens.motion.ease}`,
    '&:hover': {
        color: tokens.color.uv600,
        background: alpha(tokens.color.ink900, 0.05),
    },
    '&.active': {
        color: tokens.color.uv600,
        fontWeight: 600,
    },
}));

const HamburgerBtn = styled(IconButton)(({ theme }) => ({
    display: 'flex',
    padding: '8px',
    color: tokens.color.ink900,
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
        background: tokens.color.ink900,
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
    height: 'var(--nav-height, 72px)',
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
                width: { xs: '80px', md: '100px' },
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

export default function Navbar() {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    // The homepage keeps its existing hero reveal gate.
    // Every other route shows the navbar immediately.
    const [homeNavVisible, setHomeNavVisible] = useState(false);
    const navVisible = pathname !== '/' || homeNavVisible;

    // Frosted glass on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
            <NavRoot scrolled={scrolled ? 1 : 0} visible={navVisible ? 1 : 0} role="banner">
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