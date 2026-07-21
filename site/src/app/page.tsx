import App from '@/components/App';
import StructuredData from '@/components/StructuredData';
import { productSchema } from '@/config/structuredData';

export default function Page() {
  return (
    <>
      <StructuredData data={productSchema} />
      <App />
    </>
  );
}
