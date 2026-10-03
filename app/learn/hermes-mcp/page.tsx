import { GuidePage, LearnHero, Step, Code, Visual, Callout } from "../../ui/learn-components";

export default function HermesMcp() {
  return (
    <GuidePage>
      <LearnHero
        title="Hermes MCP 安裝教學"
        subtitle="了解 MCP 用途，從目錄選擇服務、完成登入授權，再檢查工具權限。"
        source="Hermes MCP official docs"
      />

      <Step
        n="圖"
        title="MCP 係咩？"
        visual={<Visual kind="cloud" title="MCP flow" lines={["Hermes Agent", "連接 MCP 服務", "選擇可用工具", "執行獲准操作"]} />}
      >
        <p>MCP 即 Model Context Protocol。Skill 主要提供工作流程；MCP 就負責將外部工具同服務連接到 Agent。</p>
      </Step>

      <Step
        n="1"
        title="由 Hermes MCP 目錄開始"
        visual={<Visual title="MCP catalog" lines={["打開互動選單", "選擇已收錄服務", "查看可用工具", "確認後安裝"]} />}
      >
        <Code>{`hermes mcp
hermes mcp catalog`}</Code>
        <p>先閱讀用途、來源同權限，再決定是否安裝。唔需要嘅工具唔好開啟。</p>
      </Step>

      <Step
        n="2"
        title="安裝及設定服務"
        visual={<Visual title="Install" lines={["選擇服務", "跟畫面設定", "只批准所需權限"]} />}
      >
        <Code>{`hermes mcp install github
hermes mcp configure github`}</Code>
        <Callout type="warn">服務名稱只係示例。請喺目錄揀你真正需要、而且已核對來源嘅服務。</Callout>
      </Step>

      <Step
        n="3"
        title="完成登入授權"
        visual={<Visual kind="phone" title="Account approval" lines={["打開官方登入頁", "閱讀權限要求", "確認授權", "返回 Hermes"]} />}
      >
        <p>部分服務會打開瀏覽器要求登入。只使用官方授權頁面，並逐項檢查服務要求嘅資料及操作權限。</p>
      </Step>

      <Step
        n="4"
        title="驗證連接"
        visual={<Visual title="Test" lines={["列出已連接服務", "測試指定服務", "確認工具權限"]} />}
      >
        <Code>{`hermes mcp list
hermes mcp test github
hermes chat -q "列出目前已連接的 MCP 工具，並說明每項權限"`}</Code>
      </Step>

      <Step
        n="5"
        title="只保留需要嘅權限"
        visual={<Visual title="Permission review" lines={["閱讀工具清單", "停用不需要功能", "高風險操作先確認"]} />}
      >
        <p>第三方 MCP 可能接觸程式碼、文件、郵件或雲端服務。涉及刪除、寫入、付款或雲端資源嘅功能要特別小心。</p>
      </Step>

      <section className="card source-list">
        <h2>官方來源</h2>
        <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp" target="_blank">Hermes MCP Feature Docs</a>
        <a href="https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes" target="_blank">Use MCP with Hermes</a>
        <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol</a>
      </section>
    </GuidePage>
  );
}
