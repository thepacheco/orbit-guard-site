import type { Metadata } from 'next';
import { DM_Sans, ABeeZee } from 'next/font/google';
import { Providers } from '../components/Providers';
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
  metadataBase: new URL('https://orbitguards.com'),
  title: {
    default: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
    template: '%s | Orbit Guard',
  },
  description: 'Soft caster guards that protect your pets, cords, and toes from office-chair wheels. 11 colors, fits 95% of chairs. Live on Kickstarter — 342% funded.',
  keywords: ['caster guards', 'office chair wheel covers', 'pet safe chair casters', 'cord protection', 'chair wheel guards', 'Orbit Guard'],
  openGraph: {
    type: 'website',
    siteName: 'Orbit Guard',
    title: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
    description: 'Soft caster guards that protect pets, cords, and toes. 11 colors, fits 95% of chairs. Live on Kickstarter.',
    url: 'https://orbitguards.com',
    images: [{ url: '/assets/orbit-icon-mark.png', width: 800, height: 800, alt: 'Orbit Guard caster guards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
    description: 'Soft caster guards that protect pets, cords, and toes. 11 colors, fits 95% of chairs.',
    images: ['/assets/orbit-icon-mark.png'],
  },
};

import GlobalLayoutClient from '../components/GlobalLayoutClient';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${abeeZee.variable}`}>
      <body><Providers><GlobalLayoutClient>{children}</GlobalLayoutClient></Providers></body>
    </html>
  );
}
