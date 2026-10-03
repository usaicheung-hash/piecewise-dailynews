"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Cable,
  Calculator,
  Database,
  GitCompare,
  GraduationCap,
  Home,
  Menu,
  Newspaper,
  Puzzle,
  Search,
  Shield,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

const main = [
  ["/", "主頁", Home],
  ["/news", "AI 新聞", Newspaper],
  ["/news/hong-kong", "香港 AI", Shield],
  ["/models", "Model", Trophy],
  ["/skills", "Skills", Puzzle],
  ["/mcp", "MCP", Cable],
  ["/learn", "教學", GraduationCap],
] as const;

const tools = [
  ["/compare", "Model 比較", GitCompare],
  ["/calculator", "價錢計算器", Calculator],
  ["/extensions", "資源搜尋", Search],
  ["/methodology", "評分方法", Database],
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === "/" || href === "/news") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1180) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="topnav" ref={headerRef}>
        <Link className="topbrand" href="/" onClick={closeMenu}>
          <span className="mark">PW</span>
          <b>PieceWise AI</b>
        </Link>

        <Link className="searchbox" href="/extensions">
          <Search size={15} aria-hidden="true" />
          搜尋 Model / MCP / Skill
        </Link>

        <button
          ref={triggerRef}
          className="mobile-menu-button"
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          aria-controls="mobile-site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span>選單</span>
        </button>

        <div id="mobile-site-menu" className={`mobile-menu${open ? " is-open" : ""}`}>
          <nav aria-label="主要導覽">
            {main.map(([href, label, Icon]) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isCurrent(pathname, href) ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <p>實用工具</p>
          <nav aria-label="實用工具">
            {tools.map(([href, label, Icon]) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isCurrent(pathname, href) ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <aside className="nav" aria-label="網站導覽">
        <div className="brand">
          <div className="mark">PW</div>
          <div>
            <b>PieceWise AI</b>
            <small>香港 AI 情報與教學</small>
          </div>
        </div>
        <p className="navlabel">焦點內容</p>
        {main.map(([href, label, Icon]) => (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent(pathname, href) ? "page" : undefined}
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </Link>
        ))}
        <p className="navlabel">實用工具</p>
        {tools.map(([href, label, Icon]) => (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent(pathname, href) ? "page" : undefined}
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </Link>
        ))}
        <div className="pill">
          <Sparkles size={14} aria-hidden="true" />
          新聞、模型比較、AI 工具與實作教學集中整理。
        </div>
      </aside>
    </>
  );
}
