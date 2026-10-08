import PortfolioHero from './PortfolioHero';
import PortfolioAbout from './PortfolioAbout';
import PortfolioNumbersBehindSuccess from './PortfolioNumbersBehindSuccess';
import PortfolioProjects from './PortfolioProjects';
import PortfolioSolution from './PortfolioSolution';
import PortfolioRecentWorks from './PortfolioRecentWorks';
import PortfolioProcess from './PortfolioProcess';
import TestimonialsSection from '../sections/home/TestimonialsSection';
import { serviceTestimonials } from '@/data/testimonials/serviceTestimonials';

export default function PortfolioPage() {
    return (
        <main>
            <PortfolioHero />
            <PortfolioAbout />
            <PortfolioNumbersBehindSuccess />
            <PortfolioProjects />
            <PortfolioSolution />
            <PortfolioRecentWorks />
            <PortfolioProcess />
            <TestimonialsSection testimonials={serviceTestimonials} />
        </main>
    );
}