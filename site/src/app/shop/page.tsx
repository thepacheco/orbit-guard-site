import type { Metadata } from 'next';
import ShopPage from '@/components/ShopPage';
import StructuredData from '@/components/StructuredData';
import { productSchema, breadcrumbSchema } from '@/config/structuredData';

export const metadata: Metadata = {
  title: 'Shop Orbit Guard — 12 Colors, Mix & Match',
  description:
    'Buy Orbit Guard caster guards in 12 colors. Mix and match tops and bottoms, fits 95% of office chairs, 60-day returns. Packs from $6.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Orbit Guard — 12 Colors, Mix & Match',
    description:
      'Buy Orbit Guard caster guards in 12 colors. Mix and match tops and bottoms, fits 95% of office chairs, 60-day returns.',
    url: '/shop',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          productSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
          ]),
        ]}
      />
      <ShopPage />
    </>
  );
}
