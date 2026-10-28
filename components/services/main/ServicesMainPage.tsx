import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { featuredServiceList } from '@/data/services';
import MegaMenuServiceDirectory from './sections/MegaMenuServiceDirectory';
import WhatWeOffer from './sections/WhatWeOffer';

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={featuredServiceList} />
            <WhatWeOffer services={featuredServiceList} />
            <MegaMenuServiceDirectory />
        </main>
    );
}
