// Central SEO/site constants — single source of truth for canonical URLs,
// brand identity, and structured-data facts. Update these if the domain,
// pricing, or brand details change.

export const SITE_URL = 'https://orbitguards.com';
export const SITE_NAME = 'Orbit Guard';
export const SITE_TAGLINE = 'Caster Guards for Pets, Cords & Feet';

// Brand / organization facts (used in JSON-LD structured data)
export const BRAND = {
  legalName: 'Orbit Guard',
  founded: '2023',
  city: 'Atlanta',
  region: 'GA',
  country: 'US',
  email: 'hello@orbitguards.com',
  supportEmail: 'support@orbitguards.com',
  pressEmail: 'press@orbitguards.com',
  logo: `${SITE_URL}/assets/orbit-icon-mark.png`,
  ogImage: `${SITE_URL}/assets/orbit-icon-mark.png`,
  colorCount: 12,
  priceLow: '6',
  priceHigh: '48',
  currency: 'USD',
  // Social / external profiles — fill in real handles as they go live.
  sameAs: [
    'https://www.kickstarter.com',
  ] as string[],
};
