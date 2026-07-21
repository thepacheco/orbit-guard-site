import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Back-to-School Chair Caster Guards',
  description:
    'Gear up for the school year with Orbit caster guards — protect dorm and study-room floors from rolling chairs. 12 colors, fits 95% of chairs.',
  alternates: { canonical: '/lp/back-to-school' },
  openGraph: {
    title: 'Back-to-School Chair Caster Guards',
    description: 'Protect dorm and study-room floors from rolling chairs. 12 colors.',
    url: '/lp/back-to-school',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
