import Link from "next/link";

export function LearnHero({title,subtitle,source}:{title:string;subtitle:string;source?:string}){
  return <section className="panel hero-main learn-hero"><span className="eyebrow">圖文教學 · 已按官方文件核對 · 初心者友善</span><h1>{title}</h1><p className="lead">{subtitle}</p>{source&&<p className="small muted">資料來源：{source}</p>}</section>
}
export function Step({n,title,children,visual}:{n:number|string,title:string,children:React.ReactNode,visual?:React.ReactNode}){return <section className="guide-step"><div className="step-num">{n}</div><div className="step-body"><h2>{title}</h2><div>{children}</div></div>{visual&&<div className="step-visual">{visual}</div>}</section>}
export function Code({children}:{children:React.ReactNode}){return <pre className="code"><code>{children}</code></pre>}
export function Visual({kind='terminal',title,lines}:{kind?:string,title:string,lines:string[]}){return <div className={`visual ${kind}`}><div className="visual-bar"><span></span><span></span><span></span><b>{title}</b></div>{lines.map((l,i)=><p key={i}>{l}</p>)}</div>}
export function Callout({type='info',children}:{type?:'info'|'warn'|'ok',children:React.ReactNode}){return <div className={`callout ${type}`}>{children}</div>}
export function MiniNav(){const items=[['/learn/codex','Codex'],['/learn/hermes-desktop','Hermes Desktop'],['/learn/hermes-vps','VPS 24/7'],['/learn/hermes-openai','Hermes + OpenAI'],['/learn/hermes-skills','Skills'],['/learn/hermes-mcp','MCP'],['/learn/troubleshooting','排錯']];return <nav className="learn-tabs">{items.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav>}
export function GuidePage({children}:{children:React.ReactNode}){return <main id="main-content" className="shell learn-shell page-shell"><div className="guide-masthead"><p>PIECEWISE AI · FIELD GUIDE</p><strong>由可信來源出發，逐步做到。</strong></div><MiniNav />{children}<footer className="footer editorial-footer">教學會跟官方 docs 更新；如命令日後改變，請以頁面標示來源為準。</footer></main>}
