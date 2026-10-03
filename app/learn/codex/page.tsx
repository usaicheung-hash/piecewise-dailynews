import { GuidePage,LearnHero,Step,Code,Visual,Callout } from "../../ui/learn-components";
export default function CodexGuide(){return <GuidePage><LearnHero title="安裝 OpenAI Codex" subtitle="Codex 有幾個入口：CLI、IDE、Desktop app、Codex Web。呢頁教你先裝 CLI，之後再講點樣登入同開始第一個 project。" source="OpenAI Codex docs + openai/codex GitHub README"/>
<Step n="圖" title="先分清四個 Codex 入口" visual={<Visual kind="phone" title="Codex surfaces" lines={['CLI：terminal 入面打 codex','IDE：VS Code / Cursor / Windsurf','Desktop：codex app','Web：chatgpt.com/codex']} />}><p>如果你想喺自己電腦 project folder 入面叫 AI 寫 code，最直接係 <b>Codex CLI</b>。如果想喺 editor 入面用，就裝 IDE integration。Cloud-based agent 就去 Codex Web。</p></Step>
<Step n="1" title="macOS / Linux 安裝 Codex CLI" visual={<Visual title="Terminal" lines={['貼上 install command','等下載完成','輸入 codex 啟動']} />}><Code>{`curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex`}</Code><Callout type="ok">官方 README 指出 Mac / Linux 用以上 installer；installer 預設由 releases.openai.com 下載，失敗會 fallback GitHub Releases。</Callout></Step>
<Step n="2" title="Windows 安裝 Codex CLI" visual={<Visual title="PowerShell" lines={['用 PowerShell','貼上官方命令','完成後開新 terminal']} />}><Code>{`powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
codex`}</Code><p>如果 Windows policy 阻擋 script，請用系統管理員 PowerShell 或檢查公司/學校機 App Control policy。</p></Step>
<Step n="3" title="其他安裝方法：npm / Homebrew" visual={<Visual title="Alternatives" lines={['npm 適合已有 Node.js','Homebrew 適合 macOS','binary 適合進階用戶']} />}><Code>{`# npm
npm install -g @openai/codex

# macOS Homebrew
brew install --cask codex`}</Code></Step>
<Step n="4" title="使用 ChatGPT 登入" visual={<Visual kind="phone" title="Login choice" lines={['Run codex','選 Sign in with ChatGPT','Browser 完成登入','回到 terminal']} />}><p>執行 <code>codex</code> 後選擇以 ChatGPT 登入，再到瀏覽器完成授權。實際可用功能視乎你的帳戶方案。</p><Code>{`codex`}</Code></Step>
<Step n="5" title="第一個 project 測試" visual={<Visual title="First prompt" lines={['cd 你的 project','codex','叫佢解釋 repo 結構']} />}><Code>{`cd ~/my-project
codex
# 然後輸入：
請先閱讀這個 project，解釋目錄結構，暫時不要修改檔案。`}</Code><Callout type="warn">第一次使用唔好即刻叫佢大改 code。先叫 Codex 讀 project、解釋、列 plan，確認後先改。</Callout></Step>
<section className="card source-list"><h2>官方來源</h2><a href="https://developers.openai.com/codex" target="_blank">OpenAI Codex Documentation</a><a href="https://github.com/openai/codex" target="_blank">openai/codex GitHub README</a><a href="https://chatgpt.com/codex" target="_blank">Codex Web</a></section></GuidePage>}
