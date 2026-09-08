import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { serviceList } from '@/data/services';
import WhatWeOffer from './sections/WhatWeOffer';
import TrustedCustomers from './sections/TrustedCustomers';

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={serviceList} />
            <WhatWeOffer services={serviceList} />
            <TrustedCustomers/>
        </main>
    );
}
