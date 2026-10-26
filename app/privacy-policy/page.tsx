import type { Metadata } from 'next';
import styles from '@/components/legal/LegalPage.module.css';

const title = 'Privacy Policy | Tresmind Solutions';
const description = 'Read how Tresmind Solutions collects, uses, protects and shares personal information.';
const url = 'https://tresmind.com/privacy-policy';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, title, description, siteName: 'Tresmind Solutions' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <h1>Privacy Policy</h1>
        <p className={styles.date}>Effective date: 26 October 2026</p>

        <section aria-labelledby="privacy-statement">
          <h2 id="privacy-statement">PRIVACY POLICY STATEMENT</h2>
          <p>Tresmind Solutions is committed to keeping our clients&apos; personal information safe and secure. We collect only the information we need to respond to your enquiry and deliver your project, and we never sell your information to anyone.</p>
        </section>

        <section aria-labelledby="information-collection">
          <h2 id="information-collection">INFORMATION COLLECTION</h2>
          <p>We collect information when you contact us by email, through the enquiry and contact forms on our website, or when you place an order with us.</p>
          <p>This may include your name, company name, email address, phone number, billing address, country, and the details of your project. Some of this is optional. To start work, we may also ask for a project brief and any content or materials you want us to use.</p>
          <p>We may also keep your feedback, comments and any complaints about our work.</p>
          <p>Like most websites, our hosting provider automatically records basic technical information such as your IP address, browser type and the date and time of your visit, to keep the site secure and running.</p>
        </section>

        <section aria-labelledby="usage-of-collected-information">
          <h2 id="usage-of-collected-information">USAGE OF COLLECTED INFORMATION</h2>
          <p>We use your information to understand what you need, prepare proposals, deliver and support your project, and process payments.</p>
          <p>We use your email address to keep you updated on your project and to deliver the finished work.</p>
          <p>With your permission, we may occasionally send you news about our services. You can unsubscribe at any time.</p>
        </section>

        <section aria-labelledby="privacy-of-payments">
          <h2 id="privacy-of-payments">PRIVACY OF PAYMENTS</h2>
          <p>Payments are handled through secure, encrypted (HTTPS) payment channels. We do not store your full card details on our systems.</p>
        </section>

        <section aria-labelledby="confidentiality">
          <h2 id="confidentiality">CONFIDENTIALITY</h2>
          <p>We treat all client information as confidential. It is stored securely and only team members who need it to work on your project can access it.</p>
          <p>We do not share your information with third parties except trusted service providers who help us run our business (such as email, hosting and payment providers), and only as far as needed. We never sell or rent your information.</p>
        </section>

        <section aria-labelledby="amendments">
          <h2 id="amendments">AMENDMENTS</h2>
          <p>We may update this privacy policy from time to time. Any changes will be posted on this page with a new effective date.</p>
        </section>

        <section aria-labelledby="conditions-of-information-disclosure">
          <h2 id="conditions-of-information-disclosure">CONDITIONS OF INFORMATION DISCLOSURE</h2>
          <p>We will only disclose your information if you ask us to, or if we are required to by law, a court order or another legal process.</p>
        </section>

        <section aria-labelledby="privacy-contact-us">
          <h2 id="privacy-contact-us">CONTACT US</h2>
          <p>If you have any questions about this privacy policy, contact us at <a href="mailto:hello@tresmind.com">hello@tresmind.com</a> or through the contact form on our website.</p>
        </section>
      </article>
    </main>
  );
}
