import CurvedProjectsContinuous from "@/components/curved-projects-continuous/CurvedProjectsContinuous";
import CurvedProjects from "@/components/curved-projects/CurvedProjects";
import DotGlobeLiteSection from "@/components/dot-globe-lite/DotGlobeLiteSection";
import DotGlobeReferenceSection from "@/components/dot-globe-reference/DotGlobeReferenceSection";
import DotGlobeSection from "@/components/dot-globe/DotGlobeSection";
import ScrollRefreshManager from "@/components/Scrollrefreshmanager ";
import AnimationSection from "@/components/sections/home/Animationsection";
import DepthCarouselSection from "@/components/sections/home/DepthCarouselSection";
import HeroSection from "@/components/sections/home/HeroSection";
import LabSection from "@/components/sections/home/Labsection";
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
      <StatsSection />
      {/* <CurvedProjects projects={projects} /> */}
      <CurvedProjectsContinuous
        projects={projects}
      />
      {/* <ScrollRefreshManager /> */}
      {/* <DepthCarouselSection /> */}
      {/* <TechCarouselSection /> */}
      {/* <WorkSection /> */}
      <ServicesOverviewSection />
      <TestimonialsSection />
      <LabSection />
      {/* <div id="globe-wrapper">
        <DotGlobeSection />
      </div> */}
      {/* <DotGlobeLiteSection /> */}
      <DotGlobeReferenceSection />
    </main>
  );
}
