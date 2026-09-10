'use client';
import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/home/HeroSection";
import ServicesBanner from "@/components/common/ServicesBanner/ServicesBanner";
import { homeTestimonials } from "@/data/testimonials/home";

// Below-fold sections — dynamically imported so their JS is excluded
// from the initial bundle and only fetched when needed.
// ssr: false because all sections use browser-only APIs
// (GSAP, ScrollTrigger, canvas, WebGL, window).
const AnimationSection = dynamic(
    () => import('@/components/sections/home/Animationsection'),
    { ssr: false },
);

const StatsSection = dynamic(
    () => import('@/components/sections/home/StatsSection'),
    { ssr: false },
);

const CurvedProjectsContinuous = dynamic(
    () => import('@/components/curved-projects-continuous/CurvedProjectsContinuous'),
    { ssr: false },
);

const ServicesOverviewSection = dynamic(
    () => import('@/components/sections/home/ServicesOverviewSection'),
    { ssr: false },
);

const TestimonialsSection = dynamic(
    () => import('@/components/sections/home/TestimonialsSection'),
    { ssr: false },
);

const LabSection = dynamic(
    () => import('@/components/sections/home/Labsection'),
    { ssr: false },
);

const DotGlobeReferenceSection = dynamic(
    () => import('@/components/dot-globe-reference/DotGlobeReferenceSection'),
    { ssr: false },
);

const projects = [
    {
        title: "Project One",
        image: "/projects/project-01.jpg",
        href: "/projects/project-one",
    },
    {
        title: "Project Two",
        image: "/projects/project-02.jpg",
        href: "/projects/project-two",
    },
    {
        title: "Project Three",
        image: "/projects/project-03.jpg",
        href: "/projects/project-three",
    },
    {
        title: "Project Four",
        image: "/projects/project-04.jpg",
        href: "/projects/project-four",
    },
    {
        title: "Project Five",
        image: "/projects/project-05.jpg",
        href: "/projects/project-five",
    },
];

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <StatsSection />
            <AnimationSection />
            <CurvedProjectsContinuous projects={projects} />
            <ServicesOverviewSection />
            <TestimonialsSection testimonials={homeTestimonials} />
            <LabSection />
            <DotGlobeReferenceSection />
        </main>
    );
}