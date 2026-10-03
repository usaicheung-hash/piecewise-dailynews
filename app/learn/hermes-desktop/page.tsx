import { GuidePage,LearnHero,Step,Code,Visual,Callout } from "../../ui/learn-components";
export default function HermesDesktop(){return <GuidePage><LearnHero title="安裝 Hermes Agent Desktop" subtitle="Windows / macOS 建議用 Hermes Desktop installer；Linux / VPS 通常用 CLI installer。安裝完先跑 setup，再揀 model/provider。" source="Hermes Agent official installation docs"/>
<Step n="圖" title="安裝流程總覽" visual={<Visual kind="phone" title="流程" lines={['下載 Desktop installer','安裝 Hermes + CLI','hermes setup --portal 或 hermes setup','hermes doctor 驗證']} />}><p>Hermes Desktop 係最適合一般用戶嘅入口；CLI 則適合 developer、VPS、24/7 gateway。</p></Step>
<Step n="1" title="Windows / macOS：下載 Desktop installer" visual={<Visual title="Browser" lines={['打開官方網站','Download Hermes Desktop','照 installer 指示安裝']} />}><p>去官方網站下載 Hermes Desktop installer：</p><p><a href="https://hermes-agent.nousresearch.com/" target="_blank">https://hermes-agent.nousresearch.com/</a></p><Callout type="ok">官方 docs 寫明：Windows 或 macOS 想同時安裝 command-line + desktop app，建議下載 Hermes Desktop installer。</Callout></Step>
<Step n="2" title="不用 Desktop：CLI 安裝" visual={<Visual title="Terminal" lines={['Linux/macOS/WSL2/Termux','一條 curl 安裝','完成後 reload shell']} />}><Code>{`# Linux / macOS / WSL2 / Android Termux
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash

# Windows PowerShell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)`}</Code></Step>
<Step n="3" title="第一次設定 model / tools" visual={<Visual title="Setup" lines={['最快：hermes setup --portal','或逐步：hermes setup','之後：hermes model']} />}><Code>{`hermes setup --portal
# 或一般 setup wizard
hermes setup
hermes model
hermes tools`}</Code><p>官方 docs 話最快 path 係 Nous Portal：一個 OAuth 設定 model + Tool Gateway。</p></Step>
<Step n="4" title="檢查安裝是否成功" visual={<Visual title="Doctor" lines={['hermes doctor','hermes status','hermes chat']} />}><Code>{`hermes doctor
hermes status
hermes`}</Code><p>如果見到 <code>hermes: command not found</code>，先 reload shell：</p><Code>{`source ~/.bashrc
# 或 zsh
source ~/.zshrc`}</Code></Step>
<Step n="5" title="日常用法" visual={<Visual title="Daily use" lines={['hermes：互動聊天','hermes chat -q：單次命令','/skills /tools /model：即時管理']} />}><Code>{`hermes
hermes chat -q "幫我整理今日 AI 新聞重點"
hermes chat -q "檢查這個 repo 有咩問題"`}</Code></Step>
<section className="card source-list"><h2>官方來源</h2><a href="https://hermes-agent.nousresearch.com/docs" target="_blank">Hermes Agent Docs</a><a href="https://hermes-agent.nousresearch.com/docs/getting-started/installation" target="_blank">Installation Guide</a></section></GuidePage>}
