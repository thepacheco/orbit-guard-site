import type { Metadata } from 'next';

// Admin is an internal tool — keep it out of search indexes entirely.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
