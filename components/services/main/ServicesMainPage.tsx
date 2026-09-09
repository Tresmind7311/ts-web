import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { serviceList } from '@/data/services';
import WhatWeOffer from './sections/WhatWeOffer';
import TrustedCustomers from './sections/TrustedCustomers';
import FeaturedProjects from '@/components/projects/listing/FeaturedProjects';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import { serviceTestimonials } from '@/data/testimonials/serviceTestimonials';

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={serviceList} />
            <WhatWeOffer services={serviceList} />
            <TrustedCustomers/>
            <FeaturedProjects/>
            <TestimonialsSection testimonials={serviceTestimonials} />
        </main>
    );
}
