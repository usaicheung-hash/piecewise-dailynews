"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Search, X, ChevronDown } from 'lucide-react';

const primary = [['/news', 'AI 新聞'], ['/models', '模型探索'], ['/learn', '實作教學']] as const;
const resources = [['/extensions', '資源搜尋'], ['/skills', 'Skills'], ['/mcp', 'MCP'], ['/compare', 'Model 比較'], ['/calculator', '價錢計算器'], ['/news/hong-kong', '香港 AI'], ['/methodology', '資料與評分方法']] as const;
function current(path: string, href: string) { return href === '/news' ? path === href : path === href || path.startsWith(`${href}/`); }
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const resourceTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); setMore(false); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (open) trigger.current?.focus(); else if (more) resourceTrigger.current?.focus(); setOpen(false); setMore(false); } };
    const onPointer = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) { setOpen(false); setMore(false); } };
    const onResize = () => { if (window.innerWidth > 900) setOpen(false); else setMore(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', onPointer); window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); window.removeEventListener('resize', onResize); };
  }, [open, more]);
  const link = ([href, label]: readonly [string, string]) => <Link key={href} href={href} aria-current={current(path, href) ? 'page' : undefined} onClick={() => { setOpen(false); setMore(false); }}>{label}</Link>;
  return <><a className="skip-link" href="#main-content">跳到主要內容</a><header className="site-header" ref={header} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setMore(false); } }}>
    <Link href="/" className="site-brand" aria-label="piecewisehk.ai 主頁"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 25h8l7-10h6l5-10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="3" cy="25" r="3" /><circle cx="18" cy="15" r="3" /><circle cx="29" cy="5" r="3" /></svg><span>piecewise<span className="brand-suffix">hk.ai</span></span></Link>
    <nav className="desktop-links" aria-label="主要導覽">{primary.map(link)}<div className="resource-nav"><button ref={resourceTrigger} aria-expanded={more} aria-controls="resource-menu" onClick={() => setMore(v => !v)}>工具與資源 <ChevronDown size={14} /></button><div id="resource-menu" className="resource-menu" hidden={!more}>{resources.map(link)}</div></div></nav>
    <div className="header-actions"><Link className="search-link" href="/search" aria-label="搜尋全站"><Search size={19} /><span>搜尋</span></Link><Link className="header-cta" href="/learn">開始學 <ArrowUpRight size={16} /></Link><button className="menu-toggle" ref={trigger} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? '關閉選單' : '開啟選單'} onClick={() => setOpen(v => !v)}>{open ? <X size={23} /> : <Menu size={23} />}</button></div>
    <nav id="mobile-menu" className="mobile-nav" hidden={!open} aria-label="手機導覽">{primary.map(link)}{resources.map(link)}{link(['/search', '搜尋全站'])}</nav>
  </header></>;
}
