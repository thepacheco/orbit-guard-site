import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Introducing Orbit — Caster Guards Reimagined',
  description:
    'Introducing Orbit: a smarter caster guard for office and gaming chairs. Snap-together halves, 12 colors, and a fit for 95% of chairs.',
  alternates: { canonical: '/lp/orbit-intro' },
  openGraph: {
    title: 'Introducing Orbit — Caster Guards Reimagined',
    description: 'A smarter caster guard for office and gaming chairs. 12 colors, fits 95% of chairs.',
    url: '/lp/orbit-intro',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
