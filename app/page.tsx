import HeroSection from '@/components/sections/home/HeroSection';
import DeferredHomeSections from '@/components/sections/home/DeferredHomeSections';

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <DeferredHomeSections />
        </main>
    );
}