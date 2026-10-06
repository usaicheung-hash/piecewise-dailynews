import { getDb, nowIso } from './db';
import { modelValueScore, extensionTrendingScore } from './model-scoring';

export function seedIfEmpty(){
  const db=getDb(); const now=nowIso();
  const n=db.prepare('select count(*) as c from models_db').get() as any;
  if(n.c===0){
    const models=[
      ['gpt-5','GPT-5','OpenAI',400000,1.25,10,'OpenRouter/API published pricing','OpenRouter model catalogue',96,95,97,96,74,'OpenRouter','https://openrouter.ai/api/v1/models'],
      ['claude-opus-4-1','Claude Opus 4.1','Anthropic',200000,15,75,'Provider/OpenRouter pricing','OpenRouter model catalogue',95,97,96,95,65,'OpenRouter','https://openrouter.ai/api/v1/models'],
      ['gemini-2-5-pro','Gemini 2.5 Pro','Google',1000000,1.25,10,'Provider/OpenRouter pricing','OpenRouter model catalogue',93,91,94,90,70,'OpenRouter','https://openrouter.ai/api/v1/models'],
      ['deepseek-r1','DeepSeek R1','DeepSeek',128000,.55,2.19,'Provider/OpenRouter pricing','OpenRouter model catalogue',88,84,94,82,78,'OpenRouter','https://openrouter.ai/api/v1/models'],
      ['qwen3-coder','Qwen3 Coder','Alibaba / Qwen',256000,.3,1.2,'Provider/OpenRouter pricing','OpenRouter model catalogue',86,92,84,85,82,'OpenRouter','https://openrouter.ai/api/v1/models']
    ];
    const stmt=db.prepare(`insert or replace into models_db(slug,name,provider,context_length,input_price,output_price,pricing_scope,popularity_scope,overall_score,coding_score,reasoning_score,agentic_score,speed_score,value_score,source,source_url,last_verified_at,raw_json) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    for(const m of models){ const obj={slug:m[0],name:m[1],seed:true}; stmt.run(...m.slice(0,13), modelValueScore({overall_score:m[8] as number,coding_score:m[9] as number,reasoning_score:m[10] as number,agentic_score:m[11] as number,input_price:m[4] as number,output_price:m[5] as number,speed_score:m[12] as number}), m[13],m[14],now,JSON.stringify(obj)); }
  }
  const e=db.prepare('select count(*) as c from extensions_db').get() as any;
  if(e.c===0){
    const exts=[
      {slug:'github-mcp',name:'GitHub MCP Server',type:'MCP',category:'Coding & Development',description_zh_hk:'俾 Agent 讀取 repo、issue、PR 等 GitHub 工作流程。',publisher:'GitHub / MCP Community',repository_url:'https://github.com/github/github-mcp-server',registry_url:'https://github.com/modelcontextprotocol/servers',official_status:'Requires verification',trust_level:'Trusted Community',security_status:'Review permissions',install_command:'',permissions:['GitHub repositories'],compatibility:['Hermes Agent','Claude Desktop','VS Code'],source:'GitHub'},
      {slug:'frontend-design',name:'Frontend Design Skill',type:'Skill',category:'Design & Creative',description_zh_hk:'教 Agent 建立有清晰美學方向、可用、responsive 的高質前端 UI。',publisher:'Open Design / Anthropic-adapted',repository_url:'https://github.com/nexu-io/open-design',registry_url:'https://github.com/nexu-io/open-design',official_status:'Official',trust_level:'Official',security_status:'Review project access',install_command:'hermes skills inspect frontend-design',permissions:['Project files'],compatibility:['Hermes Agent'],source:'Open Design'},
      {slug:'arxiv',name:'arXiv Research Skill',type:'Skill',category:'Research & Search',description_zh_hk:'搜尋 arXiv 論文、整理研究方向與 citation 線索。',publisher:'Hermes Skills',repository_url:'',registry_url:'https://hermes-agent.nousresearch.com/docs/reference/skills-catalog',official_status:'Official',trust_level:'Official',security_status:'Review web access',install_command:'hermes skills inspect arxiv',permissions:['Web search'],compatibility:['Hermes Agent'],source:'Hermes Skills Catalog'},
      {slug:'postgres-mcp',name:'PostgreSQL MCP',type:'MCP',category:'Database',description_zh_hk:'讓 Agent 透過 MCP 查詢 PostgreSQL；適合數據分析但權限要嚴格限制。',publisher:'MCP Community',repository_url:'https://github.com/modelcontextprotocol/servers',registry_url:'https://modelcontextprotocol.io/',official_status:'Community',trust_level:'Community',security_status:'Needs manual review',install_command:'',permissions:['Database','Credentials'],compatibility:['Hermes Agent','Claude Desktop'],source:'MCP registry'}
    ];
    const stmt=db.prepare(`insert or replace into extensions_db(slug,name,type,category,description_zh_hk,publisher,repository_url,registry_url,official_status,trust_level,security_status,install_command,permissions,compatibility,source,last_verified_at,overall_trending_score,raw_json) values(@slug,@name,@type,@category,@description_zh_hk,@publisher,@repository_url,@registry_url,@official_status,@trust_level,@security_status,@install_command,@permissions,@compatibility,@source,@last_verified_at,@overall_trending_score,@raw_json)`);
    for(const x of exts){stmt.run({...x, permissions:JSON.stringify(x.permissions), compatibility:JSON.stringify(x.compatibility), last_verified_at:now, overall_trending_score: extensionTrendingScore(x), raw_json:JSON.stringify(x)});}
  }
}
