import Link from 'next/link';
import { ArrowUpRight, ArrowRight, BookOpen, Cpu, Newspaper, Puzzle } from 'lucide-react';
import { getNews, siteStats } from '../lib/data-live';
import { hkDate } from '../lib/format';
import { Sculpture } from './ui/sculpture';

export const dynamic = 'force-dynamic';
const destinations = [
  { href: '/news', n: '01', title: '睇懂 AI 新聞', sub: '少啲雜訊，多啲重點。', text: '消息、來源、香港影響，一次睇清。', icon: Newspaper },
  { href: '/models', n: '02', title: '揀啱你嘅 Model', sub: '由能力，到成本。', text: '比較模型規格，再計一計實際用量。', icon: Cpu },
  { href: '/learn', n: '03', title: '落手做，逐步學', sub: '由零開始，砌出成果。', text: 'Codex、Hermes 同 Agent 實作指南。', icon: BookOpen },
  { href: '/extensions', n: '04', title: '擴展 Agent 能力', sub: '工具接得好，做得更多。', text: '探索 Skills 同 MCP，先了解來源同權限。', icon: Puzzle },
];

export default function Home() {
  const stats = siteStats();
  const news = getNews({ limit: 3 });
  return <main id="main-content" className="shell home-shell">
    <section className="studio-hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> HONG KONG · AI, PIECE BY PIECE</p>
        <h1>AI 好大。<br />一塊一塊，<br /><em>學識佢。</em><span className="title-period">↗</span></h1>
        <p className="hero-description">由睇懂新聞，到揀啱工具，再落手實作。<br />為香港人整理嘅 AI 情報與學習站。</p>
        <div className="hero-actions"><Link className="btn" href="/learn">開始學 AI <ArrowUpRight size={18} /></Link><Link className="text-link" href="/news">睇最新情報 <ArrowRight size={17} /></Link></div>
        <p className="hero-footnote">PLAIN LANGUAGE. PRACTICAL KNOWLEDGE.</p>
      </div>
      <Sculpture />
    </section>
    <div className="studio-strip"><span>拆細問題。連接知識。落地實作。</span><div><b>{stats.news}</b> 則情報 <i /> <b>{stats.models}</b> 個模型 <i /> <b>{stats.skills + stats.mcp}</b> 項資源</div></div>
    <section className="section start-section" aria-labelledby="start-heading">
      <div className="section-head"><div><p className="section-kicker">FIND YOUR NEXT PIECE</p><h2 id="start-heading">你想由邊度開始？</h2></div><p className="muted">跟住你嘅好奇心，揀一個起點。</p></div>
      <div className="destination-grid">{destinations.map(({href, n, title, sub, text, icon: Icon}) => <Link className="destination" href={href} key={href}><div className="destination-top"><span>{n}</span><Icon size={24} /></div><div><p>{sub}</p><h3>{title}</h3><small>{text}</small></div><span className="destination-arrow"><ArrowUpRight size={22} /></span></Link>)}</div>
    </section>
    <section className="section latest-section" aria-labelledby="latest-heading">
      <div className="section-head"><div><p className="section-kicker">THE READING DESK</p><h2 id="latest-heading">值得留意嘅幾件事。</h2></div><Link className="text-link" href="/news">全部新聞 <ArrowUpRight size={17} /></Link></div>
      {news.length ? <div className="news-preview-grid">{news.map((n, i) => <article className="news-preview" key={n.id}><div className="article-meta"><span>{n.hk_relevance ? '香港焦點' : n.category || 'AI'}</span><span>{hkDate(n.published_at)}</span></div><span className="story-index">0{i + 1}</span><h3>{n.zh_title}</h3><p>{n.zh_summary}</p><a className="text-link" href={n.source_url} target="_blank" rel="noopener noreferrer">{n.source} · 原始來源 <ArrowUpRight size={16} /></a></article>)}</div> : <div className="empty-state reading-empty"><Newspaper size={30} /><div><h3>情報整理中。</h3><p>未有新聞資料時，先由教學同工具比較開始。新聞更新後會喺呢度顯示。</p></div><Link className="btn secondary" href="/learn">探索教學 <ArrowUpRight size={16} /></Link></div>}
    </section>
    <section className="workbench"><div><p className="section-kicker">LESS GUESSWORK. MORE MAKING.</p><h2>好工具，<br />由好選擇開始。</h2><p>唔使估邊個啱你。放埋一齊比較，再用自己嘅用量計成本。</p></div><div className="workbench-links"><Link href="/compare"><span>01 / COMPARE</span><strong>並排比較模型</strong><ArrowUpRight /></Link><Link href="/calculator"><span>02 / CALCULATE</span><strong>估算 API 成本</strong><ArrowUpRight /></Link><Link href="/news/hong-kong"><span>03 / LOCAL</span><strong>香港 AI 焦點</strong><ArrowUpRight /></Link></div></section>
    <footer className="footer"><Link className="footer-brand" href="/">piecewise<span>hk.ai</span></Link><span>AI, piece by piece — from zero to pro.</span><Link href="/methodology">資料與評分方法 ↗</Link></footer>
  </main>;
}
