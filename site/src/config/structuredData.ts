// Builders for JSON-LD structured data objects. Kept in one place so the
// facts stay consistent across pages. Consumed by <StructuredData />.
import { SITE_URL, SITE_NAME, SITE_TAGLINE, BRAND } from './seo';

// Stable @id anchors so nodes can reference each other across the graph.
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PRODUCT_ID = `${SITE_URL}/#product`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: BRAND.legalName,
  url: SITE_URL,
  logo: BRAND.logo,
  foundingDate: BRAND.founded,
  email: BRAND.email,
  description:
    'Orbit Guard makes soft caster guards that protect pets, cords, and toes from office-chair wheels.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: BRAND.city,
    addressRegion: BRAND.region,
    addressCountry: BRAND.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: BRAND.supportEmail,
  },
  sameAs: BRAND.sameAs,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shop?color={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': PRODUCT_ID,
  name: 'Orbit Guard Caster Guard',
  image: BRAND.ogImage,
  description:
    'Soft caster guards that slip over office-chair wheels to protect pets, cords, and toes. Fits 95% of chairs, available in 12 colors, mix-and-match tops and bottoms.',
  brand: { '@type': 'Brand', name: SITE_NAME },
  category: 'Office Chair Accessories',
  material: 'Injection-molded polypropylene',
  audience: { '@type': 'PeopleAudience', suggestedGender: 'unisex' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: BRAND.currency,
    lowPrice: BRAND.priceLow,
    highPrice: BRAND.priceHigh,
    offerCount: 5,
    availability: 'https://schema.org/PreOrder',
    url: `${SITE_URL}/shop`,
  },
};

// FAQPage schema built from the site's own FAQ data so it never drifts.
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

// BreadcrumbList helper for interior pages.
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}
