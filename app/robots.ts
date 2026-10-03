import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://aihub.43.130.37.10.sslip.io'
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${base}/sitemap.xml` }
}
