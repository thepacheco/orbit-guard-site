import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/seo';

// Serves /robots.txt — tells crawlers what they may index and where the
// sitemap lives. /admin is kept out of the index; everything else is open
// so search engines and AI crawlers can pick the site up quickly.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
