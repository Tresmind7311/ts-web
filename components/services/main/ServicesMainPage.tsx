import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { serviceList } from '@/data/services';
import WhatWeOffer from './sections/WhatWeOffer';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import { homeTestimonials } from '@/data/testimonials/home';

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={serviceList} />
            <WhatWeOffer services={serviceList} />
            <TestimonialsSection testimonials={homeTestimonials} />
        </main>
    );
}
