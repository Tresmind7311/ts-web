import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Nunito_Sans, JetBrains_Mono } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/layout/Navbar';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import FooterSection from '@/components/layout/FooterSection';
import FooterVideoSection from '@/components/layout/FooterVideoSection';

// ─── Fonts ────────────────────────────────────────────────────────
// Inter — body copy and UI text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Plus Jakarta Sans — display / headings
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

// Nunito Sans — hero body copy
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

// JetBrains Mono — code and mono accents
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────
// export const metadata: Metadata = {
//   title: {
//     default: 'Tresmind',
//     template: '%s | Tresmind',
//   },
//   description: 'Strategic design, modern development.',
//   themeColor: '#4F3DF5',
// };
export const viewport = {
  themeColor: '#your-color-here',
}


// ─── Layout ───────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${nunitoSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>
          <Navbar />
          <LenisProvider>
            {children}
          </LenisProvider>
          {/* <FooterSection/> */}
          <FooterVideoSection />
        </ThemeRegistry>
      </body>
    </html>
  );
}