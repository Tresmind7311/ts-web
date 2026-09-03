import CurvedProjects from "@/components/curved-projects/CurvedProjects";
import DotGlobeSection from "@/components/dot-globe/DotGlobeSection";
import ScrollRefreshManager from "@/components/Scrollrefreshmanager ";
import AnimationSection from "@/components/sections/home/Animationsection";
import DepthCarouselSection from "@/components/sections/home/DepthCarouselSection";
import HeroSection from "@/components/sections/home/HeroSection";
import LabSection from "@/components/sections/home/Labsection";
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
      <AnimationSection />
      <StatsSection />
      <CurvedProjects projects={projects} />
      {/* <ScrollRefreshManager /> */}
      {/* <DepthCarouselSection /> */}
      {/* <TechCarouselSection /> */}
      {/* <WorkSection /> */}
      <ServicesOverviewSection />
      <TestimonialsSection />
      <LabSection />
      <div id="globe-wrapper">
        <DotGlobeSection />
      </div>
    </main>
  );
}
