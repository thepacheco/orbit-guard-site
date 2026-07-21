import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/seo';

// Serves /sitemap.xml — a map of every public URL so search engines can
// discover and prioritize pages. /admin is intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // [path, changeFrequency, priority]
  const routes: [string, MetadataRoute.Sitemap[number]['changeFrequency'], number][] = [
    ['/', 'weekly', 1.0],
    ['/shop', 'weekly', 0.9],
    ['/faq', 'monthly', 0.6],
    ['/about', 'monthly', 0.5],
    ['/contact', 'monthly', 0.5],
    ['/press', 'monthly', 0.4],
    ['/lp/launch', 'weekly', 0.7],
    ['/lp/meet-orbit', 'monthly', 0.6],
    ['/lp/orbit-intro', 'monthly', 0.6],
    ['/lp/office', 'monthly', 0.5],
    ['/lp/desk', 'monthly', 0.5],
    ['/lp/gamer', 'monthly', 0.5],
    ['/lp/pets', 'monthly', 0.5],
    ['/lp/gifting', 'monthly', 0.5],
    ['/lp/back-to-school', 'monthly', 0.5],
    ['/lp/meeting-orbit', 'monthly', 0.4],
  ];

  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
