import { NextResponse } from "next/server";
import { runFullRefresh } from "../../../lib/refresh";
export async function POST(req:Request){
  const secret=req.headers.get('x-cron-secret');
  if(process.env.CRON_SECRET && secret!==process.env.CRON_SECRET){return NextResponse.json({error:'unauthorized'},{status:401})}
  const result=await runFullRefresh();
  return NextResponse.json(result);
}
