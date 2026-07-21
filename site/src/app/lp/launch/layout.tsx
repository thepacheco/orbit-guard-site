import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orbit Guard is Live on Kickstarter',
  description:
    'Back Orbit Guard on Kickstarter — soft caster guards that protect pets, cords, and toes. 342% funded, 12 colors, fits 95% of chairs.',
  alternates: { canonical: '/lp/launch' },
  openGraph: {
    title: 'Orbit Guard is Live on Kickstarter',
    description: 'Soft caster guards for pets, cords, and toes — 342% funded. 12 colors, fits 95% of chairs.',
    url: '/lp/launch',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
