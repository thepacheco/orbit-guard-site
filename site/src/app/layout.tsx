import type { Metadata } from 'next';
import { DM_Sans, ABeeZee } from 'next/font/google';
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
  title: 'Orbit Guard — Caster Guards for Pets, Cords & Feet',
  description: 'Soft TPU caster guards that protect your pets, cords, and toes from office chair wheels. 11 colors, fits 95% of chairs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${abeeZee.variable}`}>
      <body>{children}</body>
    </html>
  );
}
