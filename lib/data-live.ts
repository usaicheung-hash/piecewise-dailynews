import { getDb, rowToJson } from './db';
import { seedIfEmpty } from './seed';
import { modelValueScore } from './model-scoring';

function annotateModel(m: any) {
  if (!m) return m;
  const raw = rowToJson(m.raw_json, {}) as { seed?: boolean; score_kind?: string };
  return { ...m, is_demo: raw.seed === true, score_kind: raw.seed ? 'sample' : raw.score_kind || (m.source === 'OpenRouter' && m.overall_score != null ? 'heuristic' : 'unknown') };
}
export function getModels(){ seedIfEmpty(); return (getDb().prepare('select * from models_db order by overall_score desc nulls last, name asc').all() as any[]).map(annotateModel); }
export function getModel(slug:string){ seedIfEmpty(); return annotateModel(getDb().prepare('select * from models_db where slug=?').get(slug)); }
export function getNews({hk=false,limit=50}:{hk?:boolean,limit?:number}={}){ seedIfEmpty(); const sql=hk?'select * from news_articles where hk_relevance=1 order by coalesce(published_at,fetched_at) desc limit ?':'select * from news_articles order by coalesce(published_at,fetched_at) desc limit ?'; return getDb().prepare(sql).all(limit) as any[]; }
export function getExtensions(type?:'Skill'|'MCP'){ seedIfEmpty(); const db=getDb(); const rows=(type?db.prepare('select * from extensions_db where type=? order by overall_trending_score desc nulls last, name asc').all(type):db.prepare('select * from extensions_db order by overall_trending_score desc nulls last, name asc').all()) as any[]; return rows.map(e=>({...e, permissions:rowToJson(e.permissions,[]), compatibility:rowToJson(e.compatibility,[])})); }
export function getExtension(slug:string){ seedIfEmpty(); const e=getDb().prepare('select * from extensions_db where slug=?').get(slug) as any; return e?{...e, permissions:rowToJson(e.permissions,[]), compatibility:rowToJson(e.compatibility,[])}:null; }
export function getRefreshJobs(){ seedIfEmpty(); return getDb().prepare('select * from refresh_jobs order by id desc limit 20').all() as any[]; }
export function siteStats(){ seedIfEmpty(); const db=getDb(); return {
  news:(db.prepare('select count(*) as c from news_articles').get() as any).c,
  hkNews:(db.prepare('select count(*) as c from news_articles where hk_relevance=1').get() as any).c,
  models:(db.prepare('select count(*) as c from models_db').get() as any).c,
  skills:(db.prepare("select count(*) as c from extensions_db where type='Skill'").get() as any).c,
  mcp:(db.prepare("select count(*) as c from extensions_db where type='MCP'").get() as any).c,
  bestModel:getModels()[0],
  valueModel:[...getModels()].sort((a,b)=>modelValueScore(b)-modelValueScore(a))[0],
  topExt:getExtensions()[0],
}; }
