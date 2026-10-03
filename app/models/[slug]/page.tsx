import { getModel, getModels } from "../../../lib/data-live";
import { Page } from "../../ui/components";
import { notFound } from "next/navigation";
import { modelValueScore } from "../../../lib/scoring";

export const dynamic = "force-dynamic";

export default async function ModelDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return notFound();
  const similar = getModels().filter((item) => item.slug !== slug).slice(0, 4);
  const verified = model.last_verified_at || "暫無核實日期";

  return (
    <Page title={model.name} subtitle={`${model.provider} · 資料核實日期：${verified}`}>
      <section className="section grid">
        <div className="card span-7">
          <h2>模型資料</h2>
          <p>上下文長度：{model.context_length ? Number(model.context_length).toLocaleString() : "未提供"} tokens</p>
          <p>輸入價格：{model.input_price != null ? `$${model.input_price}/1M` : "未提供"}</p>
          <p>輸出價格：{model.output_price != null ? `$${model.output_price}/1M` : "未提供"}</p>
          <p>性價比分數：<b>{modelValueScore(model)}</b></p>
          <p className="small muted">來源：{model.source || "待核對"}</p>
          {model.source_url && <p><a href={model.source_url} target="_blank">查看原始資料</a></p>}
          <div className="risk">資料範圍：{model.popularity_scope || model.pricing_scope || "未能確認"}</div>
        </div>
        <div className="card span-5">
          <h2>相似 Model 比較</h2>
          {similar.map((item) => (
            <p key={item.slug}>
              <b>{item.name}</b><br />
              <span className="muted">{item.provider} · 性價比 {modelValueScore(item)}</span>
            </p>
          ))}
        </div>
      </section>
    </Page>
  );
}
