import ServicesBanner from "@/components/common/ServicesBanner/ServicesBanner";
import CurvedProjectsContinuous from "@/components/curved-projects-continuous/CurvedProjectsContinuous";
import DotGlobeReferenceSection from "@/components/dot-globe-reference/DotGlobeReferenceSection";
import AnimationSection from "@/components/sections/home/Animationsection";
import HeroSection from "@/components/sections/home/HeroSection";
import LabSection from "@/components/sections/home/Labsection";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import StatsSection from "@/components/sections/home/StatsSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";

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
      <CurvedProjectsContinuous
        projects={projects}
      />
      <ServicesOverviewSection />
      <TestimonialsSection />
      <LabSection />
      <DotGlobeReferenceSection />
    </main>
  );
}
