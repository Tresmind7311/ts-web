'use client';


import ContactCta from './ContactCta';
import ContactFaq from './ContactFaq';
import ContactHero from './ContactHero';
import ContactLocations from './ContactLocations';
import ContactProcess from './ContactProcess';

export default function ContactPage() {
    return (
        <main>
            <ContactHero />
            <ContactLocations/>
            <ContactProcess/>
            <ContactFaq/>
            <ContactCta/>
        </main>
    );
}
