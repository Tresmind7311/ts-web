import PortfolioHero from './PortfolioHero';
import PortfolioProjects from './PortfolioProjects';
import PortfolioSolution from './PortfolioSolution';
import PortfolioRecentWorks from './PortfolioRecentWorks';

export default function PortfolioPage() {
    return (
        <main>
            <PortfolioHero />
            <PortfolioProjects />
            <PortfolioSolution />
            <PortfolioRecentWorks />
        </main>
    );
}