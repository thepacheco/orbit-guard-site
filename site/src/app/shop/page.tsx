import ShopPage from '@/components/ShopPage';
import Header from '@/components/Header';
import { PRODUCT_VARIANTS } from '@/components/data';

export default function Page() {
  const blueberryVariant = PRODUCT_VARIANTS.find(v => v.key === 'blueberry') ?? PRODUCT_VARIANTS[0];
  return (
    <>
      
      <ShopPage />
    </>
  );
}
