import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import ScrollToTop from './ScrollToTop';
import ServiceWorkerRegistration from './ServiceWorkerRegistration';
import InstallPrompt from '@/components/InstallPrompt';

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

export const viewport: Viewport = {
  themeColor: '#6b5b6e',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://seeyaluxeonlinestore.vercel.app'),
  title: 'SEEYA LUXE - Ghanaian Luxury Excellence',
  description: 'Premium luxury accessories — earrings, footwear & bags — curated for the African woman of distinction.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Seeya Luxe',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://seeyaluxeonlinestore.vercel.app',
    siteName: 'SEEYA LUXE',
    title: 'SEEYA LUXE - Ghanaian Luxury Excellence',
    description: 'Premium luxury accessories — earrings, footwear & bags — curated for the African woman of distinction.',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'SEEYA LUXE' }],
  },
  twitter: {
    card: 'summary',
    title: 'SEEYA LUXE',
    description: 'Premium luxury accessories — earrings, footwear & bags — curated for the African woman of distinction.',
  },
  icons: {
    icon: '/icons/icon-96.png',
    apple: [{ url: '/icons/icon-180.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body><ScrollToTop /><ServiceWorkerRegistration /><InstallPrompt />{children}</body>
    </html>
  );
}
