import type { Metadata } from 'next';
import styles from '@/components/legal/LegalPage.module.css';

const title = 'Terms and Conditions | Tresmind Solutions';
const description = 'Read the terms and conditions for projects ordered from Tresmind Solutions.';
const url = 'https://tresmind.com/terms-and-conditions';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, title, description, siteName: 'Tresmind Solutions' },
};

export default function TermsAndConditionsPage() {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <h1>Terms and Conditions</h1>
        <p className={styles.date}>Effective date: 26 October 2026</p>

        <section aria-labelledby="terms-introduction">
          <h2 id="terms-introduction">TERMS AND CONDITIONS</h2>
          <p>These terms apply to every project you order from Tresmind Solutions, including web development, mobile apps, AI solutions, software, graphic design and cloud consulting. By placing an order or approving a proposal, you agree to them. If your signed proposal or agreement says something different, the proposal or agreement applies.</p>
        </section>

        <section aria-labelledby="revision-policy">
          <h2 id="revision-policy">REVISION POLICY</h2>
          <p>The number of revisions you get depends on the package or proposal you choose. We&apos;ll keep refining the work within that number until it meets the agreed brief, at no extra cost as long as the original concept and scope stay the same.</p>
          <p>Revised work is usually delivered within 48 hours for design work. Larger development changes are scheduled according to their size.</p>
          <p>Changes requested after a design or project is finalised and approved are treated as a new order and quoted separately.</p>
        </section>

        <section aria-labelledby="refund-policy">
          <h2 id="refund-policy">REFUND POLICY</h2>
          <p>We want every client to be happy with our work, but refunds are not available in the following cases:</p>
          <ul>
            <li>You chose a discounted or special package.</li>
            <li>You approved the initial design concept, or requested revisions to it.</li>
            <li>You cancelled for reasons not related to our work, such as a change of mind, a disagreement with a partner, or the business closing or changing its name.</li>
            <li>You didn&apos;t respond to us for more than 2 weeks during the project.</li>
            <li>You hired another company or designer for the same project.</li>
            <li>The project brief was missing information we needed.</li>
            <li>You asked for a completely different design from the one in the original brief.</li>
            <li>The refund request was made after 7 days of purchase.</li>
            <li>These terms were breached.</li>
            <li>For websites and apps, you approved the design and the project moved into development.</li>
          </ul>
          <p>Some services are non-refundable in all cases: SEO, social media marketing and management, domain registration, trademark and copyright filing, web hosting, third-party licences, plugins, and paid cloud or AI platform usage.</p>
          <p>If you bought a bundle and are unhappy with one service, any refund applies to that service only, not the whole bundle.</p>
          <p>If you don&apos;t send us your project brief within 10 days of placing the order, you may cancel for a partial refund of up to 25%.</p>
          <p>We may decline a project or end a contract when we believe it is necessary. If a refund is made, any designs or work delivered before it remain our property, and you may not use them.</p>
        </section>

        <section aria-labelledby="claim-your-refund">
          <h2 id="claim-your-refund">CLAIM YOUR REFUND</h2>
          <p>To request a refund, email <a href="mailto:info@tresmind.com">info@tresmind.com</a> with your order details and the reason for your request. We will review it and reply as soon as possible. If it is approved, we will process the refund through the original payment method.</p>
        </section>

        <section aria-labelledby="ai-policy">
          <h2 id="ai-policy">AI POLICY</h2>
          <p>We may use AI tools to support our work, such as drafting, coding assistance and research. Everything is reviewed by our team, and we never put your confidential information into tools that don&apos;t protect it.</p>
          <p>AI features we build for you can sometimes produce inaccurate output. You are responsible for appropriate human review and for how those outputs are used in your business.</p>
        </section>

        <section aria-labelledby="quality-assurance">
          <h2 id="quality-assurance">QUALITY ASSURANCE</h2>
          <p>Every project is researched and built to the agreed brief. Our team reviews the work before delivery to make sure it meets your requirements.</p>
        </section>

        <section aria-labelledby="satisfaction-guarantee">
          <h2 id="satisfaction-guarantee">SATISFACTION GUARANTEE</h2>
          <ul>
            <li>We revise the work until it meets your agreed brief, up to the number of revisions in your package.</li>
            <li>We aim to go beyond what you expect, while staying within the agreed scope.</li>
          </ul>
          <p>Please note that we can&apos;t guarantee specific business results, such as search rankings, app store approval, traffic or revenue.</p>
        </section>

        <section aria-labelledby="delivery-policy">
          <h2 id="delivery-policy">DELIVERY POLICY</h2>
          <ul>
            <li>Completed work is delivered to your email or agreed account by the date in your order confirmation or proposal, and we send a confirmation email when it&apos;s delivered.</li>
            <li>Turnaround times depend on your package and project. The minimum for design work is 2 business days.</li>
            <li>For urgent orders, contact us at <a href="mailto:hello@tresmind.com">hello@tresmind.com</a> before placing your order.</li>
          </ul>
        </section>

        <section aria-labelledby="ownership-of-work">
          <h2 id="ownership-of-work">OWNERSHIP OF WORK</h2>
          <p>Once your project is paid in full, ownership of the final deliverables passes to you. Third-party items, such as fonts, stock images, plugins and open-source code, remain under their own licences. We may show completed work in our portfolio unless you ask us not to.</p>
        </section>

        <section aria-labelledby="record-maintenance">
          <h2 id="record-maintenance">RECORD MAINTENANCE</h2>
          <p>We keep copies of final deliverables for 12 months, so we can send you the files again if they&apos;re lost.</p>
        </section>

        <section aria-labelledby="customer-support">
          <h2 id="customer-support">CUSTOMER SUPPORT</h2>
          <p>Our team is available by live chat and email at <a href="mailto:hello@tresmind.com">hello@tresmind.com</a>, and we aim to reply within 1 business day.</p>
        </section>

        <section aria-labelledby="communication-policy">
          <h2 id="communication-policy">COMMUNICATION POLICY</h2>
          <ul>
            <li>We only communicate through @tresmind.com email addresses and the contact details on our official website.</li>
            <li>We are not responsible for any communication, payment requests or damage arising from contact details we did not provide.</li>
            <li>If you don&apos;t respond for more than 45 days, your project will be paused, and a reactivation fee may apply to restart it.</li>
          </ul>
        </section>

        <section aria-labelledby="changes-to-these-terms">
          <h2 id="changes-to-these-terms">CHANGES TO THESE TERMS</h2>
          <p>We may update these terms from time to time. The version on our website applies from its effective date. Orders already in progress continue under the terms that applied when they were placed.</p>
        </section>

        <section aria-labelledby="terms-contact-us">
          <h2 id="terms-contact-us">CONTACT US</h2>
          <p>If you have questions about these terms, contact us at <a href="mailto:hello@tresmind.com">hello@tresmind.com</a>.</p>
        </section>
      </article>
    </main>
  );
}
