import Link from 'next/link';
import Heading from '@/components/common/Heading';

const container = { width: 'min(100% - 32px, 1200px)', marginInline: 'auto' };
const section = { padding: 'clamp(64px, 7vw, 96px) 0' };

export function GraphicDesignDetails() {
    return <section style={section} aria-labelledby="graphic-deliverables">
        <div style={container}>
            <Heading id="graphic-deliverables" variant="h2">What you get</Heading>
            <ul>
                <li>Design concepts based on your brief</li>
                <li>Revisions within agreed review rounds</li>
                <li>Final files in agreed print and digital formats</li>
                <li>Editable source files where included in scope</li>
                <li>Usage notes for your team where needed</li>
            </ul>
            <Heading variant="h2">Who uses our design services</Heading>
            <ul>
                <li>Startups preparing a logo and launch materials</li>
                <li>Marketing teams planning campaign and social graphics</li>
                <li>Product teams designing or refreshing web and app interfaces</li>
                <li>Retail brands preparing packaging and point-of-sale materials</li>
            </ul>
            <Heading variant="h2">Logo design or complete branding?</Heading>
            <p>A logo is one mark that identifies a business. <Link href="/services/graphic-designing/complete-branding">Complete Branding</Link> also covers positioning, voice, visual identity and guidelines. If you need static product visuals, explore <Link href="/services/graphic-designing/3d-modeling">3D Modeling</Link>. For movement and storytelling, explore <Link href="/services/graphic-designing/2d-3d-animation">2D/3D Animation</Link>. Choose the scope after reviewing where each asset will appear and who will use it.</p>
        </div>
    </section>;
}

export function GraphicDesignClosing() {
    return <section style={section} aria-labelledby="graphic-contact">
        <div style={container}>
            <Heading id="graphic-contact" variant="h2">Need design that works everywhere?</Heading>
            <p>Tell us what you are creating and where the designs will be used.</p>
            <Link href="/contact">Start a design project</Link>
            <nav aria-label="Related graphic design services"><ul>
                <li><Link href="/services/graphic-designing/2d-3d-animation">2D/3D Animation</Link></li>
                <li><Link href="/services/graphic-designing/3d-modeling">3D Modeling</Link></li>
                <li><Link href="/services/graphic-designing/complete-branding">Complete Branding</Link></li>
            </ul></nav>
        </div>
    </section>;
}
