"use client";
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ExtCard } from './components';
import { NoResults } from './model-tools';
import { hkDate } from '../../lib/format';

export type Extension = {
  slug: string; name: string; type: string; category: string; description_zh_hk: string;
  publisher?: string; stars?: number; last_updated_at?: string; last_verified_at?: string;
  overall_trending_score?: number; trust_level?: string;
};
export type News = {
  id: number; source: string; source_url: string; zh_title: string; zh_summary: string;
  category?: string; hk_relevance?: number; published_at?: string; fetched_at?: string; why_it_matters?: string;
};
export function ResourceDirectory({ items, fixedType }: { items: Extension[]; fixedType?: string }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(fixedType || '');
  const [sort, setSort] = useState('trending');
  const rows = useMemo(() => items.filter(e => (!type || e.type === type) && `${e.name} ${e.description_zh_hk} ${e.publisher} ${e.category}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a,b) => {
    if (sort === 'stars') return (b.stars ?? 0) - (a.stars ?? 0);
    if (sort === 'updated') return (Date.parse(b.last_updated_at || '') || 0) - (Date.parse(a.last_updated_at || '') || 0);
    return (b.overall_trending_score ?? 0) - (a.overall_trending_score ?? 0);
  }), [items, query, type, sort]);
  return <section className="section"><div className="filter-bar">
    <label className="field grow">搜尋資源<input type="search" className="input" placeholder="名稱、用途、發布者…" value={query} onChange={e => setQuery(e.target.value)} /></label>
    {!fixedType && <label className="field">類型<select value={type} onChange={e => setType(e.target.value)}><option value="">全部類型</option><option>Skill</option><option>MCP</option></select></label>}
    <label className="field">排序<select value={sort} onChange={e => setSort(e.target.value)}><option value="trending">熱門參考分數</option><option value="stars">GitHub stars</option><option value="updated">最近更新</option></select></label>
  </div><p className="filter-count" role="status">{rows.length} / {items.length} 項資源</p>
    {rows.length ? <div className="grid directory-grid">{rows.map(e => <div className="span-4" key={e.slug}><ExtCard e={e} /></div>)}</div> : <NoResults onReset={() => { setQuery(''); setType(fixedType || ''); }} />}
  </section>;
}
export function NewsDirectory({ items }: { items: News[] }) {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [hk, setHk] = useState(false);
  const rows = items.filter(n => (!source || n.source === source) && (!hk || n.hk_relevance) && `${n.zh_title} ${n.zh_summary} ${n.source}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (!items.length) return <section className="section empty-state"><h3>未有新聞資料。</h3><p>新聞來源更新後會喺呢度顯示。你可以先探索實作教學，或者查看其他新聞。</p><div className="toolbar"><Link className="btn" href="/learn">開始學 AI <ArrowUpRight size={16} /></Link><Link className="btn secondary" href="/news">全部新聞</Link></div></section>;
  return <section className="section"><div className="filter-bar"><label className="field grow">搜尋新聞<input type="search" className="input" placeholder="標題、摘要、來源…" value={query} onChange={e => setQuery(e.target.value)} /></label><label className="field">來源<select value={source} onChange={e => setSource(e.target.value)}><option value="">全部來源</option>{Array.from(new Set(items.map(n => n.source))).sort().map(s => <option key={s}>{s}</option>)}</select></label><label className="compare-option"><input type="checkbox" checked={hk} onChange={e => setHk(e.target.checked)} />只睇香港相關</label></div>
    <p className="filter-count" role="status">{rows.length} / {items.length} 則情報 · 時間以香港時間顯示</p>
    {rows.length ? <div className="grid">{rows.map(n => <article className="card span-6" key={n.id}><div className="article-meta"><span className={n.hk_relevance ? 'tag hk' : 'tag'}>{n.hk_relevance ? '香港 AI' : n.category || 'AI'}</span><time dateTime={Number.isFinite(Date.parse(n.published_at || '')) ? n.published_at : undefined}>{hkDate(n.published_at)}</time></div><h3>{n.zh_title}</h3><p>{n.zh_summary}</p>{n.why_it_matters && <p className="notice"><b>點解值得留意：</b>{n.why_it_matters}</p>}<a className="text-link" href={n.source_url} target="_blank" rel="noopener noreferrer">{n.source} · 原始來源 <ArrowUpRight size={16} /></a><p className="small muted">資料匯入：{hkDate(n.fetched_at)}</p></article>)}</div> : <NoResults onReset={() => { setQuery(''); setSource(''); setHk(false); }} />}
  </section>;
}
