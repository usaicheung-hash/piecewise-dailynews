"use client";
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main id="main-content" className="shell"><div className="section empty-state" role="alert"><h2>暫時載入唔到。</h2><p>請重試，或者先返回主頁。</p><div className="toolbar"><button className="btn" onClick={reset}>重新載入</button><Link className="btn secondary" href="/">返回主頁</Link></div></div></main>;
}
