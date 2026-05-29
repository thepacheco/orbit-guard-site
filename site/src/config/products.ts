// Central config — edit these values to update the whole site.

export const SITE_CONFIG = {
  // Brand
  productName: 'Orbit',
  companyName: 'OrbitGuard',
  tagline: 'Making safety simple.',

  // Links — update these when your real Kickstarter page goes live
  kickstarterUrl: 'https://www.kickstarter.com',
  shopUrl: '/shop',

  // Contact
  emailGeneral: 'hello@orbitguard.com',
  emailPress: 'press@orbitguard.com',
  emailSupport: 'support@orbitguard.com',

  // Kickstarter live stats — update these as they change
  kickstarterFunded: 342,       // percent funded
  kickstarterBackers: 2140,
  kickstarterDaysLeft: 14,
  kickstarterRaised: 48000,     // dollars

  // Launch date for the countdown timer
  launchDate: '2026-09-01T00:00:00Z',

  // Pricing
  packPricing: [
    { count: 1,  price: 6,  label: 'Single',     tag: null },
    { count: 5,  price: 24, label: 'One chair',  tag: null },
    { count: 6,  price: 28, label: '+1 spare',   tag: 'Best for 1' },
    { count: 10, price: 44, label: 'Two chairs', tag: null },
    { count: 12, price: 48, label: 'Bulk',       tag: 'Save 33%' },
  ],
} as const;
