import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-display',
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Ally Colquhoun — Senior UI/UX & Brand Designer', template: '%s — Ally Colquhoun' },
  description:
    'Ally Colquhoun is a Senior UI/UX & Brand Designer based in Kiama, NSW. Product, brand and digital work for Zettle, Livesign, Qantas, Vodafone and more.',
  openGraph: { images: ['/work/zettle/00.webp'] },
};

export const viewport: Viewport = { themeColor: '#0a0a0b' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
