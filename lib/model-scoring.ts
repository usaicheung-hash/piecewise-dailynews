export function modelValueScore(m:{overall_score?:number|null,coding_score?:number|null,reasoning_score?:number|null,agentic_score?:number|null,input_price?:number|null,output_price?:number|null,speed_score?:number|null}, weights={quality:.5,cost:.3,speed:.2}){
  const parts=[m.overall_score,m.coding_score,m.reasoning_score,m.agentic_score].filter((x):x is number=>typeof x==='number');
  const quality=parts.length?parts.reduce((a,b)=>a+b,0)/parts.length:50;
  const input=m.input_price ?? 10, output=m.output_price ?? 30;
  const cost=100/(1+input+output);
  const speed=m.speed_score ?? 50;
  return +(quality*weights.quality+cost*weights.cost+speed*weights.speed).toFixed(1);
}
export function extensionTrendingScore(e:{stars?:number|null, momentum_score?:number|null, trust_level?:string|null, last_updated_at?:string|null}){
  const stars=e.stars ?? 0;
  const pop=Math.log10(stars+10)*18;
  const momentum=e.momentum_score ?? Math.min(80, 30 + pop);
  const trust=e.trust_level==='Official'?100:e.trust_level==='Trusted Community'?82:e.trust_level==='Community'?58:e.trust_level==='Warning'?20:45;
  const ageDays=e.last_updated_at ? Math.max(0,(Date.now()-Date.parse(e.last_updated_at))/86400000) : 365;
  const freshness=Math.max(15, 100 - Math.min(365, ageDays)/365*85);
  return Math.round(momentum*.45+pop*.2+freshness*.2+trust*.15);
}
