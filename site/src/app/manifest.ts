import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_TAGLINE } from '@/config/seo';

// Serves /manifest.webmanifest — lets browsers treat the site as an
// installable web app and gives crawlers a clean name/description/icon set.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description:
      'Soft caster guards that protect your pets, cords, and toes from office-chair wheels. 12 colors, fits 95% of chairs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5A74FF',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/assets/orbit-icon-mark.png', sizes: 'any', type: 'image/png' },
    ],
  };
}
