import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caster Guards for the Office',
  description:
    'Protect your office floors, cords, and coworkers from rolling chairs. Orbit Guard fits 95% of task chairs and installs in minutes — no tools.',
  alternates: { canonical: '/lp/office' },
  openGraph: {
    title: 'Caster Guards for the Office',
    description: 'Protect office floors, cords, and toes from rolling chairs. Fits 95% of task chairs.',
    url: '/lp/office',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
