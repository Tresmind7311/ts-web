import CurvedProjectsContinuous from "@/components/curved-projects-continuous/CurvedProjectsContinuous";
import DotGlobeLiteSection from "@/components/dot-globe-lite/DotGlobeLiteSection";
import DotGlobeReferenceSection from "@/components/dot-globe-reference/DotGlobeReferenceSection";
import ScrollRefreshManager from "@/components/Scrollrefreshmanager ";
import AnimationSection from "@/components/sections/home/Animationsection";
import HeroSection from "@/components/sections/home/HeroSection";
import LabSection from "@/components/sections/home/Labsection";
import NewsSection from "@/components/sections/home/NewsSection";
import ScrollCarousel from "@/components/sections/home/Scrollcarousel";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import StatsSection from "@/components/sections/home/StatsSection";
import TechCarouselSection from "@/components/sections/home/TechCarouselSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import WorkSection from "@/components/sections/home/WorkSection";

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
      <AnimationSection/>
      {/* <ScrollCarousel
        images={[
          '/placeholder2.jpg',
          '/placeholder3.jpg',
          '/placeholder4.jpg',
          '/placeholder5.jpg',
          '/placeholder6.jpg',
        ]}
        height="56vh"
        gap={0}
        radius={10}
        scrollPerSlide={100}
      /> */}
      <NewsSection/>
      {/* <StatsSection /> */}
      <CurvedProjectsContinuous
        projects={projects}
      />
      {/* <ScrollRefreshManager /> */}
      {/* <TechCarouselSection /> */}
      {/* <WorkSection /> */}
      <ServicesOverviewSection />
      <TestimonialsSection />
      <LabSection />
      {/* <DotGlobeLiteSection /> */}
      <DotGlobeReferenceSection />
    </main>
  );
}
