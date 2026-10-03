import { GuidePage, LearnHero, Step, Code, Visual, Callout } from "../../ui/learn-components";

export default function HermesOpenAI() {
  return (
    <GuidePage>
      <LearnHero
        title="Hermes 登入與模型選擇"
        subtitle="使用官方登入流程連接帳戶，再按工作需要選擇合適模型。"
        source="Hermes provider docs / OpenAI Codex docs"
      />

      <Step
        n="圖"
        title="先選擇使用方式"
        visual={<Visual kind="phone" title="登入方式" lines={["Hermes 帳戶設定", "Codex 使用 ChatGPT 登入", "完成後選擇模型"]} />}
      >
        <p>Hermes 同 Codex 都會引導你喺瀏覽器完成官方登入。跟畫面指示操作，完成後返到原本嘅應用程式繼續。</p>
      </Step>

      <Step
        n="1"
        title="完成 Hermes 帳戶設定"
        visual={<Visual title="Hermes setup" lines={["啟動設定精靈", "在瀏覽器確認", "返回 Hermes"]} />}
      >
        <Code>{`hermes setup --portal
# 如畫面提供其他登入方式，也可以執行：
hermes setup`}</Code>
        <Callout type="info">只喺官方登入頁面完成授權，唔好將任何登入資料貼入公開訊息或截圖。</Callout>
      </Step>

      <Step
        n="2"
        title="選擇適合嘅模型"
        visual={<Visual title="Hermes model" lines={["打開模型選單", "比較可用選項", "儲存選擇"]} />}
      >
        <Code>{`hermes model`}</Code>
        <p>實際可選模型視乎你嘅帳戶方案。一般工作可先揀速度同成本較平衡嘅模型，需要深入分析時再選能力較高嘅選項。</p>
      </Step>

      <Step
        n="3"
        title="測試連線"
        visual={<Visual title="Connection check" lines={["送出簡短問題", "確認收到回覆", "檢查所選模型"]} />}
      >
        <Code>{`hermes chat -q "請用繁體中文回覆：連線成功"`}</Code>
      </Step>

      <Step
        n="4"
        title="Codex 使用 ChatGPT 登入"
        visual={<Visual kind="phone" title="Codex login" lines={["執行 codex", "選擇 ChatGPT 登入", "在瀏覽器確認", "返回 terminal"]} />}
      >
        <Code>{`codex`}</Code>
        <p>執行後選擇以 ChatGPT 登入，並在瀏覽器完成授權。可用選項視乎你的 ChatGPT 方案。</p>
      </Step>

      <section className="card source-list">
        <h2>官方來源</h2>
        <a href="https://github.com/openai/codex" target="_blank">OpenAI Codex README</a>
        <a href="https://hermes-agent.nousresearch.com/docs/integrations/providers" target="_blank">Hermes Providers</a>
      </section>
    </GuidePage>
  );
}
