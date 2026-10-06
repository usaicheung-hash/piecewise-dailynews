"use client";
import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function Sculpture() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return <div className={`sculpture-stage${paused ? ' paused' : ''}`}
    onPointerMove={e => {
      if (paused || e.pointerType !== 'mouse') return;
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--rx', `${-(e.clientY - rect.top - rect.height / 2) / 35}deg`);
      e.currentTarget.style.setProperty('--ry', `${(e.clientX - rect.left - rect.width / 2) / 35}deg`);
    }} onPointerLeave={e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); }}>
    <div className="stage-grid" aria-hidden="true" />
    <div className="sculpture" aria-hidden="true">
      <div className="sculpture-orbit" />
      {[0, 1, 2, 3, 4].map(i => <div className={`cube cube-${i}`} key={i}><div className="cube-face front" /><div className="cube-face back" /><div className="cube-face right" /><div className="cube-face left" /><div className="cube-face top" /><div className="cube-face bottom" /></div>)}
    </div>
    <div className="stage-label"><span className="status-dot" /> CONNECT THE PIECES</div>
    <div className="stage-note">01 → 02 → 03 <span>由好奇，到做到。</span></div>
    <button className="motion-toggle" onClick={() => setPaused(v => !v)} aria-pressed={paused} aria-label={paused ? '播放 3D 動畫' : '暫停 3D 動畫'}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
  </div>;
}
