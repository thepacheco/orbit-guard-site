import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Perfect Desk Gift',
  description:
    'Looking for a useful, thoughtful gift? Orbit caster guards protect floors, pets, and cords — and come in 12 mix-and-match colors.',
  alternates: { canonical: '/lp/gifting' },
  openGraph: {
    title: 'The Perfect Desk Gift',
    description: 'A useful, thoughtful gift in 12 mix-and-match colors.',
    url: '/lp/gifting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
