import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions about Orbit Guard? Reach our team at hello@orbitguards.com — fit help, order questions, and press inquiries welcome.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Orbit Guard',
    description: 'Get in touch with the Orbit Guard team — fit help, orders, and press.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
