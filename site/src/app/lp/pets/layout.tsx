import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet-Safe Caster Guards',
  description:
    'Keep paws and tails safe from rolling office chairs. Orbit’s fully closed, rounded shell leaves no gap to pinch — pet-tested in 12 colors.',
  alternates: { canonical: '/lp/pets' },
  openGraph: {
    title: 'Pet-Safe Caster Guards',
    description: 'Keep paws and tails safe from rolling chairs. Fully closed shell, pet-tested.',
    url: '/lp/pets',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
