import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/layout/Navbar';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import FooterSection from '@/components/layout/FooterSection';

// ─── Fonts ────────────────────────────────────────────────────────
// Inter — body copy and UI text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Space Grotesk — display / headings
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>
          <Navbar />
          <LenisProvider>
          {children}
          </LenisProvider>
          <FooterSection/>
        </ThemeRegistry>
      </body>
    </html>
  );
}