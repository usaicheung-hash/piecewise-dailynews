import { GuidePage,LearnHero,Step,Code,Visual,Callout } from "../../ui/learn-components";
export default function HermesSkills(){return <GuidePage><LearnHero title="Hermes Skills 安裝教學" subtitle="Skill 係教 Hermes 做某類工作嘅可重用 workflow。安裝前要 inspect，安裝後要 check/audit，唔好亂裝第三方 skill。" source="Hermes Skills official docs"/>
<Step n="圖" title="Skill 是甚麼？" visual={<Visual kind="phone" title="Skill" lines={['不是 MCP','不是插件程式本身','是工作流程 + 知識 + 模板','Hermes 會按任務自動載入']} />}><p>Skill 好似一本細小 SOP：教 agent 點樣做 design、debug、research、deploy 等任務。它可以包含 SKILL.md、references、templates、scripts、assets。</p></Step>
<Step n="1" title="查看已安裝 Skills" visual={<Visual title="List" lines={['hermes skills list','/skills','/skill name']} />}><Code>{`hermes skills list
# 在聊天入面：
/skills
/skill frontend-design`}</Code></Step>
<Step n="2" title="搜尋 Skills Hub" visual={<Visual title="Search" lines={['browse all','search keyword','official first']} />}><Code>{`hermes skills browse
hermes skills browse --source official
hermes skills search kubernetes
hermes skills search react --source skills-sh`}</Code></Step>
<Step n="3" title="安裝前先 inspect" visual={<Visual title="Safe install" lines={['inspect 看內容','確認來源','看 permissions','再 install']} />}><Code>{`hermes skills inspect openai/skills/k8s
hermes skills install openai/skills/k8s
hermes skills install official/security/1password`}</Code><Callout type="warn">不要一見 popular 就裝。先睇來源、內容、是否官方、是否需要危險權限。不要預設用 <code>--force</code>。</Callout></Step>
<Step n="4" title="更新、安全檢查、移除" visual={<Visual title="Maintenance" lines={['check updates','update','audit','uninstall']} />}><Code>{`hermes skills check
hermes skills update
hermes skills audit
hermes skills uninstall k8s`}</Code></Step>
<Step n="5" title="用 /learn 自己做 Skill" visual={<Visual title="Learn skill" lines={['給網址/文件/流程','Hermes 整理成 Skill','下次可重用']} />}><Code>{`/learn https://docs.example.com/api/quickstart
/learn how I just deployed the staging server`}</Code><p>官方 docs 寫明 <code>/learn</code> 可以把網址、文件、你剛做完的流程變成 reusable skill。</p></Step>
<section className="card source-list"><h2>官方來源</h2><a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" target="_blank">Hermes Skills System</a><a href="https://hermes-agent.nousresearch.com/docs/reference/skills-catalog" target="_blank">Bundled Skills Catalog</a></section></GuidePage>}
