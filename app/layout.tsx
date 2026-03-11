import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import ScrollToTop from './ScrollToTop';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'SEEYA LUXE - Ghanaian Luxury Excellence',
  description: 'Premium luxury accessories — earrings, footwear & bags — curated for the African woman of distinction.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body><ScrollToTop />{children}</body>
    </html>
  );
}
