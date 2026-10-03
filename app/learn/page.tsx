import Link from "next/link";
import { GuidePage, LearnHero, Visual } from "../ui/learn-components";

export default function Learn() {
  const guides = [
    ["安裝 OpenAI Codex", "/learn/codex", "CLI、Desktop、IDE 與 ChatGPT 登入"],
    ["安裝 Hermes Desktop", "/learn/hermes-desktop", "Windows、macOS 與 Linux 安裝"],
    ["騰訊雲 VPS 24/7 Hermes", "/learn/hermes-vps", "由開機到長時間運作"],
    ["Hermes 登入與模型選擇", "/learn/hermes-openai", "登入帳戶並選擇合適模型"],
    ["Hermes Skills", "/learn/hermes-skills", "搜尋、檢查與安全安裝"],
    ["Hermes MCP", "/learn/hermes-mcp", "連接工具、登入授權與權限檢查"],
    ["常見問題排解", "/learn/troubleshooting", "逐步處理常見安裝問題"],
  ];

  return (
    <GuidePage>
      <LearnHero
        title="AI Agent 圖文教學中心"
        subtitle="由入門到實作，逐步學習 Codex、Hermes、Skills 與 MCP。"
        source="OpenAI Codex docs / Hermes Agent docs / MCP docs"
      />
      <section className="learn-card-grid">
        {guides.map(([title, href, description]) => (
          <Link className="card" href={href} key={href}>
            <h3>{title}</h3>
            <p className="muted">{description}</p>
            <Visual title="你會做到" lines={["睇圖理解流程", "跟住步驟安裝", "完成後自行驗證"]} />
          </Link>
        ))}
      </section>
    </GuidePage>
  );
}
