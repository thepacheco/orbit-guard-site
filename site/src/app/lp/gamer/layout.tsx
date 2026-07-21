import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caster Guards for Gaming Chairs',
  description:
    'Unmatched performance for your battlestation. Orbit caster guards give gaming chairs a smooth, quiet roll and protect your floors and cables.',
  alternates: { canonical: '/lp/gamer' },
  openGraph: {
    title: 'Caster Guards for Gaming Chairs',
    description: 'A smooth, quiet roll for your battlestation. Protects floors and cables.',
    url: '/lp/gamer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
