import type { MetadataRoute } from 'next'
import { getModels, getExtensions } from '../lib/data-live'
export const dynamic = 'force-dynamic'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://aihub.43.130.37.10.sslip.io'
  const staticRoutes = ['', '/news', '/news/hong-kong', '/models', '/compare', '/calculator', '/extensions', '/skills', '/mcp', '/learn', '/methodology', '/search']
  const modelRoutes = getModels().map(m => `/models/${m.slug}`)
  const extRoutes = getExtensions().map(e => `/${e.type === 'Skill' ? 'skills' : 'mcp'}/${e.slug}`)
  const learnRoutes = ['/learn/codex','/learn/hermes-desktop','/learn/hermes-vps','/learn/hermes-openai','/learn/hermes-skills','/learn/hermes-mcp','/learn/troubleshooting']
  return [...staticRoutes, ...modelRoutes, ...extRoutes, ...learnRoutes].map(path => ({ url: `${base}${path}`, lastModified: new Date() }))
}
