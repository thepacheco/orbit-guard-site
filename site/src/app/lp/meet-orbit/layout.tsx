import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Orbit — The Caster Guard That Protects Everything',
  description:
    'Meet Orbit: a soft, featherweight caster guard that slips over your chair wheels to protect pets, cords, and toes. Whisper-quiet, 12 colors.',
  alternates: { canonical: '/lp/meet-orbit' },
  openGraph: {
    title: 'Meet Orbit — The Caster Guard That Protects Everything',
    description: 'A soft, featherweight caster guard for pets, cords, and toes. Whisper-quiet, 12 colors.',
    url: '/lp/meet-orbit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
