import ScrollRefreshManager from "@/components/Scrollrefreshmanager ";
import AnimationSection from "@/components/sections/home/Animationsection";
import DepthCarouselSection from "@/components/sections/home/DepthCarouselSection";
import HeroSection from "@/components/sections/home/HeroSection";
import LabSection from "@/components/sections/home/Labsection";
import StatsSection from "@/components/sections/home/StatsSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import WorkSection from "@/components/sections/home/WorkSection";


export default function HomePage() {
  return (
    <main>
      <ScrollRefreshManager/>
      <HeroSection/>
      <AnimationSection />
      {/* <DepthCarouselSection/> */}
      <StatsSection/>
      <WorkSection/>
      <TestimonialsSection/>
      <LabSection/>
    </main>
  );
}