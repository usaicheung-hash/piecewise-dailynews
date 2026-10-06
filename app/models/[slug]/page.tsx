import { getModel, getModels } from "../../../lib/data-live";
import { Page } from "../../ui/components";
import { notFound } from "next/navigation";
import { modelValueScore } from "../../../lib/model-scoring";
import Link from "next/link";
import { DataNotice } from "../../ui/model-tools";

export const dynamic = "force-dynamic";

export default async function ModelDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return notFound();
  const similar = getModels().filter((item) => item.slug !== slug).slice(0, 4);
  const verified = model.is_demo ? "示例資料，未即時核實" : model.last_verified_at || "暫無匯入日期";

  return (
    <Page title={model.name} subtitle={`${model.provider} · 資料狀態：${verified}`}>
      <DataNotice models={[model]} />
      <section className="section grid">
        <div className="card span-7">
          <h2>模型資料</h2>
          <p>上下文長度：{model.context_length ? Number(model.context_length).toLocaleString() : "未提供"} tokens</p>
          <p>輸入價格：{model.input_price != null ? `$${model.input_price}/1M` : "未提供"}</p>
          <p>輸出價格：{model.output_price != null ? `$${model.output_price}/1M` : "未提供"}</p>
          <p>性價比參考：<b>{model.is_demo || model.score_kind === 'heuristic' ? '基於示例 / 估算分數，並非實測' : modelValueScore(model)}</b></p>
          <p className="small muted">來源：{model.source || "待核對"}</p>
          {model.source_url && <p><a href={model.source_url} target="_blank" rel="noopener noreferrer">查看原始資料</a></p>}
          <div className="risk">資料範圍：{model.popularity_scope || model.pricing_scope || "未能確認"}</div>
        </div>
        <div className="card span-5">
          <h2>相似 Model 比較</h2>
          {similar.map((item) => (
            <p key={item.slug}>
              <Link href={`/models/${item.slug}`}>{item.name}</Link><br />
              <span className="muted">{item.provider}{item.is_demo ? ' · 示例資料' : ''}</span>
            </p>
          ))}
        </div>
      </section>
      <div className="toolbar section"><Link className="btn" href="/compare">並排比較模型 ↗</Link><Link className="btn secondary" href="/calculator">計算使用成本 ↗</Link></div>
    </Page>
  );
}
