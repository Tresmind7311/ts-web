import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { serviceList } from '@/data/services';

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={serviceList} />
        </main>
    );
}
