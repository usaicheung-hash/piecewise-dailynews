"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NoResults } from './model-tools';
export type SearchItem = { title: string; description: string; href: string; type: string; external?: boolean };
export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const rows = items.filter(i => (!type || i.type === type) && `${i.title} ${i.description} ${i.type}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="section"><div className="filter-bar"><label className="field grow">搜尋全站<input className="input" type="search" placeholder="Model、新聞、Skills、MCP、教學…" value={query} onChange={e => setQuery(e.target.value)} /></label><label className="field">內容類型<select value={type} onChange={e => setType(e.target.value)}><option value="">全部內容</option>{Array.from(new Set(items.map(i => i.type))).map(t => <option key={t}>{t}</option>)}</select></label></div><p className="filter-count" role="status">{rows.length} 個結果</p>{rows.length ? rows.map(i => {
    const content = <><span className="tag">{i.type}</span><div><h3>{i.title}</h3><p>{i.description}</p></div><ArrowUpRight size={18} /></>;
    return i.external ? <a className="search-result" href={i.href} target="_blank" rel="noopener noreferrer" key={i.href}>{content}</a> : <Link className="search-result" href={i.href} key={i.href}>{content}</Link>;
  }) : <NoResults onReset={() => { setQuery(''); setType(''); }} />}</section>;
}
