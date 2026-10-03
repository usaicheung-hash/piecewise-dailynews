import { GuidePage,LearnHero,Step,Code,Visual,Callout } from "../../ui/learn-components";
export default function Troubleshooting(){return <GuidePage><LearnHero title="Troubleshooting：常見安裝問題" subtitle="Codex / Hermes / Discord / MCP 出事時，先照呢頁逐步排查。" source="Hermes + Codex official docs"/>
<Step n="1" title="命令搵唔到：command not found" visual={<Visual title="PATH" lines={['source ~/.bashrc','檢查 ~/.local/bin','重開 terminal']} />}><Code>{`source ~/.bashrc
source ~/.zshrc
which hermes
which codex`}</Code></Step>
<Step n="2" title="Hermes 模型連接失敗" visual={<Visual title="Doctor" lines={['hermes doctor','重新登入帳戶','hermes model']} />}><Code>{`hermes doctor
hermes setup
hermes model`}</Code><p>先重新完成官方登入流程，再檢查目前選擇嘅模型是否可供你的帳戶使用。</p></Step>
<Step n="3" title="Discord bot 在線但無反應" visual={<Visual kind="phone" title="Discord intents" lines={['Developer Portal','Bot','Privileged Gateway Intents','Message Content Intent ON']} />}><p>最常見係 Discord Developer Portal 未開 <b>Message Content Intent</b>。Hermes docs 明確指出：無呢個 intent，bot 會收到事件但 message text 係空。</p></Step>
<Step n="4" title="SSH logout 後 Hermes Gateway 停止" visual={<Visual title="linger" lines={['enable-linger','gateway install','gateway start']} />}><Code>{`sudo loginctl enable-linger $USER
hermes gateway install
hermes gateway start
hermes gateway status`}</Code></Step>
<Step n="5" title="MCP 連唔到" visual={<Visual title="MCP debug" lines={['hermes mcp list','hermes mcp test name','檢查 env / OAuth / command']} />}><Code>{`hermes mcp list
hermes mcp test github
hermes mcp configure github`}</Code><Callout type="warn">如果 MCP 要 OAuth，而 Hermes 跑喺 VPS，browser redirect 可能回不到 VPS。用 paste-back redirect URL 或 SSH port forward。</Callout></Step>
<Step n="6" title="網站加到手機主頁後無更新" visual={<Visual kind="phone" title="PWA cache" lines={['重新打開 app','拉落刷新','必要時刪 app icon 再加入']} />}><p>PWA 有 cache。若內容短時間未更新，可以關閉再開；仍不行就刪除主畫面 icon 後重新 Add to Home Screen。</p></Step>
</GuidePage>}
