import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orbit — Titanium Strength, Refined Comfort',
  description:
    'Orbit caster guards combine a tough, protective shell with a soft, quiet roll. Built to last, gentle on floors, pets, and cords.',
  alternates: { canonical: '/lp/meeting-orbit' },
  openGraph: {
    title: 'Orbit — Titanium Strength, Refined Comfort',
    description: 'A tough, protective shell with a soft, quiet roll. Built to last.',
    url: '/lp/meeting-orbit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
