import { getExtensions, getModels, getNews } from '../../lib/data-live';
import { Page } from '../ui/components';
import { SiteSearch, SearchItem } from '../ui/site-search';
export const dynamic = 'force-dynamic';
export default function Search() {
  const guides = [
    ['Codex 安裝教學', 'codex', 'CLI、Desktop、IDE 與登入'],
    ['Hermes Desktop', 'hermes-desktop', 'Windows、macOS 與 Linux 安裝'],
    ['VPS 24/7 Hermes', 'hermes-vps', '部署與持續運作'],
    ['Hermes 登入與模型選擇', 'hermes-openai', '帳戶登入與模型設定'],
    ['Hermes Skills', 'hermes-skills', '搜尋與安裝 Skills'],
    ['Hermes MCP', 'hermes-mcp', '連接服務與工具'],
    ['常見問題排解', 'troubleshooting', '安裝、登入與排錯'],
  ];
  const items: SearchItem[] = [
    ...getModels().map(m => ({title: m.name, description: m.provider, href: `/models/${m.slug}`, type: 'Model'})),
    ...getExtensions().map(e => ({title: e.name, description: e.description_zh_hk, href: `/${e.type === 'Skill' ? 'skills' : 'mcp'}/${e.slug}`, type: e.type})),
    ...getNews().map(n => ({title: n.zh_title, description: `${n.source} · ${n.zh_summary}`, href: n.source_url, type: '新聞 · 原始來源', external: true})),
    ...guides.map(([title, slug, description]) => ({title, description, href: `/learn/${slug}`, type: '教學'})),
  ];
  return <Page title="搵你需要嘅下一塊。" subtitle="一次搜尋新聞、模型、Skills、MCP 同實作教學。"><SiteSearch items={items} /></Page>;
}
