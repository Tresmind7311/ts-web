import PortfolioHero from './PortfolioHero';
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
            <PortfolioProjects />
            <PortfolioSolution />
            <PortfolioRecentWorks />
            <PortfolioProcess />
            <TestimonialsSection testimonials={serviceTestimonials} />
        </main>
    );
}