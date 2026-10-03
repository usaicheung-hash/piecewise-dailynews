import { GuidePage,LearnHero,Step,Code,Visual,Callout } from "../../ui/learn-components";
export default function HermesVps(){return <GuidePage><LearnHero title="用騰訊雲 VPS 建立 24/7 Hermes Agent" subtitle="由開 Tencent Cloud VPS、SSH、安裝 Hermes、接 Discord/Telegram，到 systemd 長開。適合想關電腦後 Agent 仍然運作的人。" source="Hermes installation + messaging gateway docs"/>
<Step n="圖" title="24/7 架構圖" visual={<Visual kind="cloud" title="Architecture" lines={['Discord / Telegram','↓ Internet','Tencent Cloud VPS Ubuntu','↓ systemd','Hermes Gateway + Agent']} />}><p>重點係 Hermes 跑喺 VPS，而唔係你自己電腦。你熄 laptop 後，Discord/Telegram 訊息仍然會入到 VPS 上嘅 Hermes Gateway。</p></Step>
<Step n="1" title="開 Tencent Cloud VPS" visual={<Visual kind="phone" title="Tencent Cloud" lines={['Lighthouse 或 CVM','Ubuntu LTS','Region: Hong Kong / Singapore','開 SSH key 登入']} />}><ul><li>入 Tencent Cloud，選 Lighthouse 或 CVM。</li><li>OS 選 Ubuntu LTS。</li><li>Region：香港 latency 最低；Singapore 通常穩定又平。</li><li>建議用 SSH key，唔好只靠 password。</li></ul></Step>
<Step n="2" title="SSH 入 VPS 並更新系統" visual={<Visual title="SSH" lines={['ssh ubuntu@你的IP','apt update','安裝 git/curl/xz-utils']} />}><Code>{`ssh ubuntu@YOUR_SERVER_IP
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl xz-utils build-essential`}</Code></Step>
<Step n="3" title="安裝 Hermes CLI" visual={<Visual title="Install Hermes" lines={['官方 installer','自動裝 Python/Node/ripgrep/ffmpeg','完成後 reload shell']} />}><Code>{`curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
hermes doctor`}</Code><Callout type="info">官方 docs：非 Windows 平台主要 prerequisite 係 Git；Linux 亦要 curl、xz-utils。Installer 會自動處理 Python 3.11、Node.js、ripgrep、ffmpeg 等。</Callout></Step>
<Step n="4" title="設定 model/provider" visual={<Visual title="Model setup" lines={['hermes setup --portal','或 hermes model','測試 hermes chat']} />}><Code>{`hermes setup --portal
# 或
hermes setup
hermes model
hermes chat -q "用繁體中文回覆：Hermes 已連線"`}</Code></Step>
<Step n="5" title="接 Discord 或 Telegram" visual={<Visual kind="phone" title="Messaging" lines={['hermes gateway setup','選 Discord/Telegram','填 token','測試 DM']} />}><Code>{`hermes gateway setup
hermes gateway run`}</Code><p>Discord 需要在 Developer Portal 開 bot，並開 <b>Message Content Intent</b>；否則 bot 在線但睇唔到你寫咩。</p></Step>
<Step n="6" title="安裝成長開 service" visual={<Visual title="systemd" lines={['gateway install','gateway start','gateway status','enable linger']} />}><Code>{`hermes gateway install
hermes gateway start
hermes gateway status
sudo loginctl enable-linger $USER`}</Code><Callout type="warn">如果 SSH logout 後 gateway 停止，通常係未 enable linger。執行上面最後一行。</Callout></Step>
<Step n="7" title="安全設定" visual={<Visual kind="cloud" title="Security" lines={['只開需要 ports','使用 SSH key','保護帳戶憑證','定期 update']} />}><ul><li>只使用官方登入及安全設定流程，切勿公開任何帳戶憑證。</li><li>Tencent security group 只開 SSH / HTTP / HTTPS 等必要 port。</li><li>不要用 root 長期跑日常 agent。</li><li>定期 <code>hermes update</code> 同備份 <code>~/.hermes</code>。</li></ul></Step>
<section className="card source-list"><h2>官方來源</h2><a href="https://hermes-agent.nousresearch.com/docs/getting-started/installation" target="_blank">Hermes Installation</a><a href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging" target="_blank">Hermes Messaging Gateway</a><a href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord" target="_blank">Discord Setup</a></section></GuidePage>}
