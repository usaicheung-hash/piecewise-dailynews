import Link from "next/link";
import { modelValueScore, extensionTrendingScore } from "../../lib/model-scoring";
import { hkDate } from "../../lib/format";

const trustLabels: Record<string, string> = {
  Official: "官方來源",
  "Trusted Community": "可信社群",
  Community: "社群項目",
  Warning: "需要審慎評估",
};

export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <main id="main-content" className="shell page-shell">
      <section className="page-masthead">
        <p>PIECEWISE AI · HONG KONG</p>
        <h1>{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
      </section>
      {children}
      <footer className="footer editorial-footer">
        © PieceWise AI · 排名只供參考 · 第三方 Skill/MCP 安裝前請先確認來源、權限及資料處理方式。
      </footer>
    </main>
  );
}

export function ModelTable({ models }: { models: any[] }) {
  const sorted = [...models].sort((a, b) => (b.overall_score ?? 0) - (a.overall_score ?? 0));
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>排名</th><th>Model</th><th>供應商</th><th>綜合評分</th><th>輸入價格 / 1M</th><th>輸出價格 / 1M</th><th>上下文長度</th><th>性價比</th><th>資料範圍</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((model, index) => (
            <tr key={model.slug}>
              <td>#{index + 1}</td>
              <td><Link href={`/models/${model.slug}`}>{model.name}</Link></td>
              <td>{model.provider}</td>
              <td className="score">{Math.round(model.overall_score ?? 0)}</td>
              <td>{model.input_price != null ? `$${Number(model.input_price).toFixed(3)}` : "未提供"}</td>
              <td>{model.output_price != null ? `$${Number(model.output_price).toFixed(3)}` : "未提供"}</td>
              <td>{model.context_length ? Number(model.context_length).toLocaleString() : "未提供"}</td>
              <td className="score">{modelValueScore(model)}</td>
              <td className="small muted">{model.popularity_scope || model.pricing_scope || "請參閱來源"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ExtCard({ e }: { e: any }) {
  const href = `/${e.type === "Skill" ? "skills" : "mcp"}/${e.slug}`;
  const updated = e.last_updated_at;
  const trust = trustLabels[e.trust_level] || e.trust_level || "來源待核對";
  return (
    <article className="card market-card">
      <div className="market-card__body">
        <div className="badge-row">
          <span className="tag dark">{e.type}</span>
          <span className="tag">{e.category}</span>
          <span className={e.trust_level === "Warning" ? "tag warn" : "tag hk"}>{trust}</span>
        </div>
        <h3>{e.name}</h3>
        <p className="muted market-card__description">{e.description_zh_hk}</p>
      </div>
      <footer className="market-card__footer">
        <p className="small muted market-card__meta">發布者：{e.publisher || "待核對"}{updated ? ` · 來源更新：${hkDate(updated)}` : ' · 來源更新時間待確認'}</p>
        <div className="market-card__actions">
          <b>熱門參考分數 {e.overall_trending_score || extensionTrendingScore(e)}</b>
          <Link className="btn secondary" href={href}>睇詳情</Link>
        </div>
      </footer>
    </article>
  );
}
