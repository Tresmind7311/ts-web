import ServicesMainHero from './sections/ServicesMainHero';
import ServicesShowcase from './sections/ServicesShowcase';

import { serviceList } from '@/data/services';
import WhatWeOffer from './sections/WhatWeOffer';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import { homeTestimonials } from '@/data/testimonials/home';
import FeaturedProjects from '@/components/projects/listing/FeaturedProjects';
import { approvedProjects } from '@/data/projects';

const featuredProjects = approvedProjects.filter((project) =>
    ['aume-organics', 'ghl-automation-agency', 'source-one-homes'].includes(project.slug),
);

export default function ServicesMainPage() {
    return (
        <main>
            <ServicesMainHero />
            <ServicesShowcase services={serviceList} />
            <WhatWeOffer services={serviceList} />
            <FeaturedProjects projects={featuredProjects} servicesHubCopy />
            <TestimonialsSection testimonials={homeTestimonials} />
        </main>
    );
}
