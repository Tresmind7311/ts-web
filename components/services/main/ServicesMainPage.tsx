import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { serviceList } from '@/data/services';
import WhatWeOffer from './sections/WhatWeOffer';

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={serviceList} />
            <WhatWeOffer services={serviceList} />
        </main>
    );
}
