"use client";
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { estimateCost } from '../../lib/calculator';
import { modelValueScore } from '../../lib/model-scoring';

export type Model = {
  slug: string; name: string; provider: string; context_length: number | null;
  input_price: number | null; output_price: number | null; overall_score: number | null;
  coding_score?: number | null; reasoning_score?: number | null; agentic_score?: number | null;
  speed_score?: number | null; pricing_scope?: string; popularity_scope?: string;
  last_verified_at?: string; is_demo?: boolean; score_kind?: string;
};
const number = (v: number | null | undefined) => v == null ? '未提供' : v.toLocaleString('en-US');
const price = (v: number | null) => v == null ? '未提供' : `$${v.toLocaleString('en-US', { maximumFractionDigits: 6 })}`;
const score = (m: Model) => m.is_demo ? '示例分數' : m.score_kind === 'heuristic' ? '估算指標' : m.overall_score == null ? '未提供' : String(Math.round(m.overall_score));
export function DataNotice({ models }: { models: Model[] }) {
  const demo = models.some(m => m.is_demo);
  const heuristic = models.some(m => m.score_kind === 'heuristic');
  return <div className="notice">{demo && '部分資料為示例資料，價格及分數未作即時核實。'}{heuristic && '部分分數由上下文長度估算，並非實測 benchmark。'}價格以 USD / 每百萬 tokens 顯示；使用前請核對供應商。<Link href="/methodology"> 查看評分方法 ↗</Link></div>;
}

export function ModelExplorer({ models }: { models: Model[] }) {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('');
  const [sort, setSort] = useState('name');
  const rows = useMemo(() => models.filter(m => (!provider || m.provider === provider) && `${m.name} ${m.provider}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a,b) => {
    if (sort === 'input') return (a.input_price ?? Infinity) - (b.input_price ?? Infinity);
    if (sort === 'context') return (b.context_length ?? 0) - (a.context_length ?? 0);
    return a.name.localeCompare(b.name);
  }), [models, query, provider, sort]);
  return <section className="section"><DataNotice models={models} /><div className="filter-bar">
    <label className="field grow">搜尋模型<input type="search" className="input" placeholder="模型名稱 / 供應商" value={query} onChange={e => setQuery(e.target.value)} /></label>
    <label className="field">供應商<select value={provider} onChange={e => setProvider(e.target.value)}><option value="">全部供應商</option>{Array.from(new Set(models.map(m => m.provider))).sort().map(p => <option key={p}>{p}</option>)}</select></label>
    <label className="field">排序<select value={sort} onChange={e => setSort(e.target.value)}><option value="name">名稱 A–Z</option><option value="input">輸入價格：低至高</option><option value="context">上下文：長至短</option></select></label>
    <Link className="btn secondary" href="/compare">並排比較 <ArrowUpRight size={16} /></Link>
  </div><p className="filter-count" role="status">{rows.length} / {models.length} 個模型</p>
  {rows.length ? <div className="table-wrap" tabIndex={0} role="region" aria-label="模型資料，可橫向捲動"><table className="table"><caption>模型規格與價格 · 手機可左右捲動</caption><thead><tr><th scope="col">Model</th><th scope="col">供應商</th><th scope="col">輸入 / 1M</th><th scope="col">輸出 / 1M</th><th scope="col">上下文 tokens</th><th scope="col">分數類型</th><th scope="col">資料狀態</th></tr></thead><tbody>{rows.map(m => <tr key={m.slug}><td><Link href={`/models/${m.slug}`}>{m.name}</Link></td><td>{m.provider}</td><td>{price(m.input_price)}</td><td>{price(m.output_price)}</td><td>{number(m.context_length)}</td><td>{score(m)}</td><td>{m.is_demo ? <span className="tag warn">示例資料</span> : <span className="tag">已匯入</span>}</td></tr>)}</tbody></table></div> : <NoResults onReset={() => { setQuery(''); setProvider(''); }} />}</section>;
}
export function NoResults({ onReset }: { onReset: () => void }) {
  return <div className="empty-state"><h3>暫時搵唔到結果。</h3><p>試下其他關鍵字，或者清除篩選。</p><button className="btn secondary" onClick={onReset}>清除篩選</button></div>;
}
export function ModelCompare({ models }: { models: Model[] }) {
  const [selected, setSelected] = useState<string[]>(models.slice(0, 2).map(m => m.slug));
  const [query, setQuery] = useState('');
  const chosen = selected.map(slug => models.find(m => m.slug === slug)!).filter(Boolean);
  const rows = models.filter(m => `${m.name} ${m.provider}`.toLowerCase().includes(query.trim().toLowerCase()));
  const metrics: [string, (m: Model) => string][] = [
    ['供應商', m => m.provider], ['上下文 tokens', m => number(m.context_length)],
    ['輸入 USD / 1M', m => price(m.input_price)], ['輸出 USD / 1M', m => price(m.output_price)],
    ['評分類型', score], ['性價比參考', m => m.is_demo || m.score_kind === 'heuristic' ? '基於示例 / 估算分數' : String(modelValueScore(m))],
    ['資料狀態', m => m.is_demo ? '示例，未即時核實' : '匯入資料，使用前請核對'],
  ];
  return <section className="section"><DataNotice models={models} /><div className="filter-bar"><label className="field grow">加入比較<input type="search" className="input" placeholder="搜尋模型" value={query} onChange={e => setQuery(e.target.value)} /></label><button className="btn secondary" onClick={() => setSelected([])}>清除選擇</button></div>
    <p className="filter-count" role="status">已選 {selected.length} / 4 個模型；最多可以比較 4 個。</p>
    <div className="compare-picker">{rows.map(m => <label className="compare-option" key={m.slug}><input type="checkbox" checked={selected.includes(m.slug)} disabled={selected.length >= 4 && !selected.includes(m.slug)} onChange={e => setSelected(v => e.target.checked ? [...v, m.slug] : v.filter(s => s !== m.slug))} /><span>{m.name}<small>{m.provider}</small></span></label>)}</div>
    {!rows.length && <NoResults onReset={() => setQuery('')} />}
    {chosen.length ? <div className="section table-wrap" tabIndex={0} role="region" aria-label="模型比較表，可橫向捲動"><table className="table"><caption>按同一項規格並排比較 · 價格為每百萬 tokens</caption><thead><tr><th scope="col">比較項目</th>{chosen.map(m => <th scope="col" key={m.slug}><Link href={`/models/${m.slug}`}>{m.name}</Link></th>)}</tr></thead><tbody>{metrics.map(([label, fn]) => <tr key={label}><th scope="row">{label}</th>{chosen.map(m => <td key={m.slug}>{fn(m)}</td>)}</tr>)}</tbody></table></div> : <div className="section empty-state"><h3>揀幾個 Model，睇清分別。</h3><p>勾選上面嘅模型，開始比較。</p></div>}
    <div className="toolbar section"><Link href="/calculator" className="btn">用自己嘅用量計成本 <ArrowUpRight size={16} /></Link></div>
  </section>;
}

export function PriceCalculator({ models }: { models: Model[] }) {
  const [input, setInput] = useState('1000000');
  const [output, setOutput] = useState('200000');
  const [rate, setRate] = useState('7.8');
  const [currency, setCurrency] = useState('USD');
  const valid = [input, output, rate].every(v => v.trim() !== '' && Number.isFinite(Number(v)) && Number(v) >= 0) && Number(rate) > 0 && Number.isInteger(Number(input)) && Number.isInteger(Number(output));
  const rows = models.map(m => ({ ...m, cost: valid ? estimateCost(m.input_price, m.output_price, Number(input), Number(output)) : null })).filter((m): m is Model & { cost: number } => m.cost != null).sort((a,b) => a.cost - b.cost);
  const unavailable = models.filter(m => estimateCost(m.input_price, m.output_price, 0, 0) == null).length;
  const factor = currency === 'HKD' ? Number(rate) : 1;
  const formatCost = (cost: number) => `${currency} $${(cost * factor).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
  return <section className="section"><DataNotice models={models} /><div className="card"><div className="filter-bar">
    <label className="field grow">輸入 tokens<input className="input" type="number" min="0" step="1" value={input} onChange={e => setInput(e.target.value)} /></label>
    <label className="field grow">輸出 tokens<input className="input" type="number" min="0" step="1" value={output} onChange={e => setOutput(e.target.value)} /></label>
    <label className="field">顯示貨幣<select value={currency} onChange={e => setCurrency(e.target.value)}><option>USD</option><option>HKD</option></select></label>
    <label className="field">參考匯率：1 USD = HKD<input className="input" type="number" min="0.0001" step="0.01" value={rate} onChange={e => setRate(e.target.value)} /></label>
  </div><p className="small muted">成本 =（輸入 tokens × 輸入單價 + 輸出 tokens × 輸出單價）÷ 1,000,000。匯率由你設定，7.8 為參考值；不含稅項、快取折扣或其他費用。</p></div>
    {!valid ? <p className="notice" role="alert">請輸入非負整數嘅 token 用量及大於零嘅匯率。</p> : <>
      {rows[0] && <div className="calc-summary" aria-live="polite"><div><span>目前用量 · 最低估算成本</span><strong>{formatCost(rows[0].cost)}</strong><small>{rows[0].name}{rows[0].is_demo ? ' · 示例定價' : ''}</small></div><div><span>計算用量</span><strong>{(Number(input) + Number(output)).toLocaleString('en-US')}</strong><small>總 tokens（輸入 + 輸出）</small></div></div>}
      <p className="filter-count" role="status">{rows.length} 個模型有完整價格；{unavailable} 個因缺少價格未列入。</p>
      {rows.length ? <div className="table-wrap" tabIndex={0} role="region" aria-label="成本估算表，可橫向捲動"><table className="table"><caption>按目前用量，由低至高排列</caption><thead><tr><th scope="col">Model</th><th scope="col">供應商</th><th scope="col">輸入 USD / 1M</th><th scope="col">輸出 USD / 1M</th><th scope="col">估算成本</th></tr></thead><tbody>{rows.map(m => <tr key={m.slug}><td><Link href={`/models/${m.slug}`}>{m.name}</Link>{m.is_demo && <small>示例定價</small>}</td><td>{m.provider}</td><td>{price(m.input_price)}</td><td>{price(m.output_price)}</td><td className="score">{formatCost(m.cost)}</td></tr>)}</tbody></table></div> : <div className="empty-state"><h3>未有完整定價。</h3><p>匯入包含輸入及輸出價格嘅模型後，就可以計算成本。</p></div>}
    </>}
  </section>;
}
