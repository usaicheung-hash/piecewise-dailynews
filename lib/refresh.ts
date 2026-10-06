import Parser from 'rss-parser';
import { tokenPricePerMillion } from './calculator';
import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import { getDb, nowIso } from './db';
import { seedIfEmpty } from './seed';
import { modelValueScore, extensionTrendingScore } from './model-scoring';

const rssSources = [
  {name:'OpenAI Blog', url:'https://openai.com/news/rss.xml', category:'Official', country:'US'},
  {name:'Google DeepMind Blog', url:'https://deepmind.google/blog/rss.xml', category:'Official', country:'US'},
  {name:'Google AI Blog', url:'https://blog.google/technology/ai/rss/', category:'Official', country:'US'},
  {name:'Hugging Face Blog', url:'https://huggingface.co/blog/feed.xml', category:'Open-source', country:'International'},
  {name:'MIT Technology Review AI', url:'https://www.technologyreview.com/feed/', category:'Media', country:'US'},
  {name:'TechCrunch AI', url:'https://techcrunch.com/category/artificial-intelligence/feed/', category:'Media', country:'US'},
  {name:'Google News HK AI', url:'https://news.google.com/rss/search?q=%22Hong%20Kong%22%20AI%20OR%20%E9%A6%99%E6%B8%AF%20AI&hl=zh-HK&gl=HK&ceid=HK:zh-Hant', category:'香港 AI', country:'HK'},
  {name:'Google News Cyberport AI', url:'https://news.google.com/rss/search?q=%E6%95%B8%E7%A2%BC%E6%B8%AF%20AI%20OR%20Cyberport%20AI&hl=zh-HK&gl=HK&ceid=HK:zh-Hant', category:'香港 AI', country:'HK'}
];
const hkKeywords=['hong kong','hksar','hkpc','cyberport','hktdc','香港','港大','中大','科大','城大','理大','數碼港','生產力促進局','金融科技','fintech'];
const NEWS_ARTICLE_LIMIT = 50;
function slugify(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80) || 'item'}
function hkRelevant(text:string, sourceCountry?:string){const t=text.toLowerCase(); return sourceCountry==='HK' || hkKeywords.some(k=>t.includes(k.toLowerCase()));}
function fallbackSummary(title:string, content:string){const clean=(content||title).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); return clean.slice(0,170) || title;}
async function summarize(title:string, content:string, source:string){
  if(!process.env.OPENAI_API_KEY){return {zh_title:title, zh_summary:fallbackSummary(title,content), why_it_matters:'此消息暫只提供來源摘要，請參閱原始來源了解詳情。', confidence:.45};}
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const model=process.env.SUMMARIZER_MODEL || 'gpt-4o-mini';
  try{
    const res=await client.chat.completions.create({model, temperature:0.2, response_format:{type:'json_object'}, messages:[{role:'system',content:'你是香港 AI 新聞編輯。輸出 JSON：zh_title, zh_summary, why_it_matters, confidence。用香港繁體中文，簡潔，不要編造來源。'},{role:'user',content:JSON.stringify({title,content:content?.slice(0,4000),source})}]});
    const txt=res.choices[0]?.message?.content || '{}'; const obj=JSON.parse(txt);
    return {zh_title:obj.zh_title||title, zh_summary:obj.zh_summary||fallbackSummary(title,content), why_it_matters:obj.why_it_matters||'', confidence:obj.confidence||0.7};
  }catch(e:any){return {zh_title:title, zh_summary:fallbackSummary(title,content), why_it_matters:'此消息暫只提供來源摘要。', confidence:.4};}
}

export async function refreshNews(){ seedIfEmpty(); const db=getDb(); const parser=new Parser({timeout:10000}); const started=nowIso(); const job=db.prepare(`insert into refresh_jobs(kind,status,started_at) values('news','running',?)`).run(started).lastInsertRowid; let added=0, failed:string[]=[];
  for(const src of rssSources){
    try{ const feed=await parser.parseURL(src.url); for(const item of feed.items.slice(0,12)){ const url=item.link || item.guid; if(!url) continue; const title=item.title || 'Untitled'; const content=(item.contentSnippet || item.content || item.summary || ''); const sum=await summarize(title,content,src.name); const hk=hkRelevant(`${title} ${content} ${src.name}`,src.country); const dup=slugify(title.replace(/\b(openai|google|anthropic|ai|model|launch|announces?)\b/ig,''));
        const r=db.prepare(`insert or ignore into news_articles(source,source_url,original_title,zh_title,zh_summary,why_it_matters,published_at,fetched_at,category,country,hk_relevance,confidence,duplicate_key,raw_json) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(src.name,url,title,sum.zh_title,sum.zh_summary,sum.why_it_matters,item.isoDate||item.pubDate||null,nowIso(),src.category,src.country,hk?1:0,sum.confidence,dup,JSON.stringify(item)); if(r.changes) added++; }
    }catch(e:any){failed.push(`${src.name}: ${e.message||e}`)}
  }
  const pruned = db.prepare(`delete from news_articles where id not in (select id from news_articles order by coalesce(published_at,fetched_at) desc, id desc limit ?)`).run(NEWS_ARTICLE_LIMIT).changes;
  const status=failed.length?'partial':'success'; db.prepare('update refresh_jobs set status=?, finished_at=?, summary=?, error=? where id=?').run(status,nowIso(),JSON.stringify({added, pruned, limit:NEWS_ARTICLE_LIMIT, sources:rssSources.length, failed:failed.length}),failed.join('\n')||null,job); return {kind:'news',status,added,pruned,limit:NEWS_ARTICLE_LIMIT,failed}; }

export async function refreshModels(){ seedIfEmpty(); const db=getDb(); const job=db.prepare(`insert into refresh_jobs(kind,status,started_at) values('models','running',?)`).run(nowIso()).lastInsertRowid; let upserted=0; let error='';
  try{ const res=await fetch('https://openrouter.ai/api/v1/models',{headers:{'User-Agent':'PieceWise AI'}}); if(!res.ok) throw new Error(`OpenRouter ${res.status}`); const data:any=await res.json(); const stmt=db.prepare(`insert or replace into models_db(slug,name,provider,context_length,input_price,output_price,pricing_scope,popularity_scope,overall_score,coding_score,reasoning_score,agentic_score,speed_score,value_score,source,source_url,last_verified_at,raw_json) values(@slug,@name,@provider,@context_length,@input_price,@output_price,@pricing_scope,@popularity_scope,@overall_score,@coding_score,@reasoning_score,@agentic_score,@speed_score,@value_score,@source,@source_url,@last_verified_at,@raw_json)`);
    for(const m of (data.data||[]).slice(0,80)){ const name=m.name||m.id; const provider=(m.id||'').split('/')[0]||'Unknown'; const input=tokenPricePerMillion(m.pricing?.prompt); const output=tokenPricePerMillion(m.pricing?.completion); const heuristic=Math.max(40, Math.min(92, 60 + Math.log10((m.context_length||8000)/8000)*8)); const row={slug:slugify(m.id||name),name,provider,context_length:m.context_length||null,input_price:input,output_price:output,pricing_scope:'OpenRouter listed API price / 1M tokens',popularity_scope:'OpenRouter public model catalogue; not global usage',overall_score:heuristic,coding_score:null,reasoning_score:null,agentic_score:null,speed_score:null,value_score:0,source:'OpenRouter',source_url:'https://openrouter.ai/api/v1/models',last_verified_at:nowIso(),raw_json:JSON.stringify(m)}; row.value_score=modelValueScore(row); stmt.run(row); upserted++; }
    db.prepare('update refresh_jobs set status=?, finished_at=?, summary=? where id=?').run('success',nowIso(),JSON.stringify({upserted}),job);
  }catch(e:any){ error=e.message||String(e); db.prepare('update refresh_jobs set status=?, finished_at=?, error=? where id=?').run('failed',nowIso(),error,job); }
  return {kind:'models',status:error?'failed':'success',upserted,error}; }

async function githubRepo(repoUrl:string){ const m=repoUrl.match(/github\.com\/([^\/]+\/[^\/#]+)/); if(!m) return null; const headers:any={'User-Agent':'PieceWise AI'}; if(process.env.GITHUB_TOKEN) headers.Authorization=`Bearer ${process.env.GITHUB_TOKEN}`; const res=await fetch(`https://api.github.com/repos/${m[1]}`,{headers}); if(!res.ok) return null; return res.json(); }
export async function refreshExtensions(){ seedIfEmpty(); const db=getDb(); const job=db.prepare(`insert into refresh_jobs(kind,status,started_at) values('extensions','running',?)`).run(nowIso()).lastInsertRowid; let updated=0;
  const rows=db.prepare('select * from extensions_db').all() as any[];
  for(const e of rows){ let stars=e.stars||0,forks=e.forks||0,issues=e.open_issues||0,last=e.last_updated_at; if(e.repository_url){ try{const gh=await githubRepo(e.repository_url); if(gh){stars=gh.stargazers_count||0; forks=gh.forks_count||0; issues=gh.open_issues_count||0; last=gh.pushed_at||gh.updated_at;}}catch{} }
    const score=extensionTrendingScore({stars,momentum_score:e.momentum_score,trust_level:e.trust_level,last_updated_at:last}); db.prepare('update extensions_db set stars=?, forks=?, open_issues=?, last_updated_at=?, last_verified_at=?, overall_trending_score=? where slug=?').run(stars,forks,issues,last,nowIso(),score,e.slug); updated++; }
  // Discover local Hermes skills into DB
  try{ const root='/home/ubuntu/.hermes/skills'; const cats=fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()); for(const cat of cats){ const dir=path.join(root,cat.name); for(const sk of fs.readdirSync(dir,{withFileTypes:true}).filter(d=>d.isDirectory())){ const skill=path.join(dir,sk.name,'SKILL.md'); if(!fs.existsSync(skill)) continue; const txt=fs.readFileSync(skill,'utf8'); const desc=(txt.match(/description:\s*\|?\s*\n?\s*([^\n]+)/)?.[1]||txt.match(/description:\s*"?([^"\n]+)/)?.[1]||'Hermes Skill').trim(); const slug=sk.name; const row={slug,name:sk.name,type:'Skill',category:cat.name,description_zh_hk:desc,publisher:'Local Hermes Skills',registry_url:'local Hermes Skills',official_status:'Installed',trust_level:'Official',security_status:'Installed locally',install_command:`hermes skills inspect ${sk.name}`,permissions:JSON.stringify(['Depends on skill workflow']),compatibility:JSON.stringify(['Hermes Agent']),source:'local Hermes Skills',last_verified_at:nowIso(),overall_trending_score:75,raw_json:JSON.stringify({path:skill})}; db.prepare(`insert or ignore into extensions_db(slug,name,type,category,description_zh_hk,publisher,registry_url,official_status,trust_level,security_status,install_command,permissions,compatibility,source,last_verified_at,overall_trending_score,raw_json) values(@slug,@name,@type,@category,@description_zh_hk,@publisher,@registry_url,@official_status,@trust_level,@security_status,@install_command,@permissions,@compatibility,@source,@last_verified_at,@overall_trending_score,@raw_json)`).run(row); }} }catch{}
  db.prepare('update refresh_jobs set status=?, finished_at=?, summary=? where id=?').run('success',nowIso(),JSON.stringify({updated}),job); return {kind:'extensions',status:'success',updated}; }
export async function runFullRefresh(){ const news=await refreshNews(); const models=await refreshModels(); const extensions=await refreshExtensions(); return {ok:true, news, models, extensions, finished_at:nowIso()}; }
