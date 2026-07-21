import type { Metadata, Viewport } from 'next';
import { DM_Sans, ABeeZee } from 'next/font/google';
import { Providers } from '../components/Providers';
import { Analytics } from '@vercel/analytics/next';
import StructuredData from '../components/StructuredData';
import { organizationSchema, websiteSchema } from '../config/structuredData';
import { SITE_URL } from '../config/seo';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--dm-sans',
  display: 'swap',
});

const abeeZee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--abeezee',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
    template: '%s | Orbit Guard',
  },
  description: 'Soft caster guards that protect your pets, cords, and toes from office-chair wheels. 12 colors, fits 95% of chairs. Live on Kickstarter — 342% funded.',
  applicationName: 'Orbit Guard',
  keywords: ['caster guards', 'office chair wheel covers', 'pet safe chair casters', 'cord protection', 'chair wheel guards', 'chair caster protector', 'pet safe office chair', 'Orbit Guard'],
  authors: [{ name: 'Orbit Guard' }],
  creator: 'Orbit Guard',
  publisher: 'Orbit Guard',
  category: 'shopping',
  // Canonical for the site root; interior pages set their own canonical.
  alternates: { canonical: '/' },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Orbit Guard',
    locale: 'en_US',
    title: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
    description: 'Soft caster guards that protect pets, cords, and toes. 12 colors, fits 95% of chairs. Live on Kickstarter.',
    url: SITE_URL,
    images: [{ url: '/assets/orbit-icon-mark.png', width: 800, height: 800, alt: 'Orbit Guard caster guards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
    description: 'Soft caster guards that protect pets, cords, and toes. 12 colors, fits 95% of chairs.',
    images: ['/assets/orbit-icon-mark.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#5A74FF',
  colorScheme: 'light',
};

import GlobalLayoutClient from '../components/GlobalLayoutClient';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${abeeZee.variable}`}>
      <head>
        {/* Site-wide structured data: identifies the brand and enables
            search/sitelinks. Page-level schemas are added per route. */}
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body><Providers><GlobalLayoutClient>{children}</GlobalLayoutClient></Providers><Analytics /></body>
    </html>
  );
}
