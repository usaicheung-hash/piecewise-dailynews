import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PieceWise AI — 香港 AI Intelligence Hub',
    short_name: 'PieceWise AI',
    description: '逢星期二、四、六整理 AI 新聞、香港 AI、Model 排行、價錢、Skills、MCP 與 Hermes/Codex 教學。',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f5f6f0',
    theme_color: '#b6ff3b',
    categories: ['news', 'productivity', 'education', 'technology'],
    lang: 'zh-Hant-HK',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-1024.png', sizes: '1024x1024', type: 'image/png', purpose: 'any' }
    ],
    shortcuts: [
      { name: '今日 AI 新聞', short_name: '新聞', url: '/news', description: '查看最新 AI 新聞' },
      { name: '香港 AI', short_name: '香港 AI', url: '/news/hong-kong', description: '查看香港 AI 焦點' },
      { name: 'Model 排行', short_name: 'Models', url: '/models', description: '查看 AI Model 排行' }
    ]
  }
}
