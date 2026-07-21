import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upgrade Your Desk Setup with Orbit',
  description:
    'Finish your desk setup with Orbit caster guards — a soft, quiet roll that protects your floors and matches your build in 12 colors.',
  alternates: { canonical: '/lp/desk' },
  openGraph: {
    title: 'Upgrade Your Desk Setup with Orbit',
    description: 'A soft, quiet roll that protects floors and matches your build. 12 colors.',
    url: '/lp/desk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
