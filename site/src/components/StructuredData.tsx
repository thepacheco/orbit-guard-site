// Server component that injects JSON-LD structured data into the page.
// Structured data helps Google (rich results / sitelinks), other search
// engines, and AI crawlers understand the brand, product, and content.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StructuredData({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (our own static data, no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
