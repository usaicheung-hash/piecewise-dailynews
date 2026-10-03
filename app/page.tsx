import Link from "next/link";
import { getNews, siteStats } from "../lib/data-live";
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Newspaper,
  Puzzle,
  Radio,
} from "lucide-react";

export const dynamic = "force-dynamic";

function dateLabel(value?: string) {
  if (!value) return "待確認時間";
  return new Intl.DateTimeFormat("zh-HK", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

const destinations = [
  {
    href: "/news",
    title: "最新 AI 新聞",
    description: "快速掌握重點、來源同實際影響。",
    icon: Newspaper,
  },
  {
    href: "/models",
    title: "Model 排行與比較",
    description: "按能力、價格、速度同使用情境揀 Model。",
    icon: Cpu,
  },
  {
    href: "/learn",
    title: "由零開始學 AI",
    description: "跟住圖文步驟安裝同使用實用工具。",
    icon: BookOpen,
  },
  {
    href: "/extensions",
    title: "Skills 與 MCP",
    description: "搜尋 Agent 能力，安裝前先了解來源同風險。",
    icon: Puzzle,
  },
] as const;

export default function Home() {
  const stats = siteStats();
  const lead = getNews({ limit: 1 })[0];

  return (
    <main className="shell home-shell newsroom-shell home-concise">
      <section className="newsroom-masthead" aria-label="PieceWise AI 今日情報">
        <div className="newsroom-kicker">
          <span><Radio size={13} aria-hidden="true" /> AI 情報更新</span>
          <span>逢星期二、四、六 07:00 HKT</span>
          <span>香港繁體中文</span>
        </div>
        <div className="newsroom-title-row">
          <div>
            <p className="newsroom-issue">香港 AI 情報與實作指南</p>
            <h1>PieceWise <em>AI</em></h1>
          </div>
          <p className="newsroom-deck">睇重點、比較工具，再跟住清楚步驟落手做。</p>
        </div>
      </section>

      <section className="home-focus" aria-labelledby="today-heading">
        {lead ? (
          <article className="home-lead-story">
            <div className="article-meta">
              <span>{lead.hk_relevance ? "香港焦點" : lead.category || "AI 焦點"}</span>
              <time>{dateLabel(lead.published_at)}</time>
            </div>
            <h2 id="today-heading">{lead.zh_title}</h2>
            <p>{lead.zh_summary}</p>
            <div className="article-footer">
              <span>來源：{lead.source}</span>
              <Link href="/news">閱讀最新新聞 <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </article>
        ) : (
          <article className="home-lead-story empty-state">
            <h2 id="today-heading">最新情報整理中</h2>
            <p>下一輪更新後會加入重點摘要同來源。</p>
            <Link href="/news">查看新聞頁 <ArrowRight size={16} aria-hidden="true" /></Link>
          </article>
        )}

        <aside className="home-snapshot" aria-label="網站內容概覽">
          <p>現有內容</p>
          <strong>{stats.news}</strong><span>則 AI 情報</span>
          <strong>{stats.models}</strong><span>個 Model 資料</span>
          <strong>{stats.skills + stats.mcp}</strong><span>項 Skills / MCP 資源</span>
        </aside>
      </section>

      <section className="home-destinations" aria-labelledby="destinations-heading">
        <div className="home-section-heading">
          <h2 id="destinations-heading">你想了解邊一部分？</h2>
          <p>首頁只放入口，完整內容可以喺各分頁查看。</p>
        </div>
        <div className="home-route-grid">
          {destinations.map(({ href, title, description, icon: Icon }) => (
            <Link href={href} className="home-route" key={href}>
              <Icon size={22} aria-hidden="true" />
              <span><strong>{title}</strong><small>{description}</small></span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer editorial-footer">
        PieceWise AI · 香港 AI 情報、工具比較與實作教學。
      </footer>
    </main>
  );
}
