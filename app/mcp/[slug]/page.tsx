import { getExtension } from "../../../lib/data-live";
import { Page } from "../../ui/components";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const trustLabels: Record<string, string> = {
  Official: "官方來源",
  "Trusted Community": "可信社群",
  Community: "社群項目",
  Warning: "需要審慎評估",
};

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const extension = getExtension(slug);
  if (!extension) return notFound();

  const sourceUrl = extension.repository_url || extension.registry_url;
  const installCommand = String(extension.install_command || "").trim();
  const hasVerifiedInstall = installCommand && !installCommand.startsWith("未驗證");
  const trust = trustLabels[extension.trust_level] || extension.trust_level || "來源待核對";
  const permissions = (extension.permissions || []).map((permission: string) =>
    /key|token|credential|oauth/i.test(permission) ? "帳戶授權" : permission
  );

  return (
    <Page title={extension.name} subtitle={`${extension.type} · ${extension.category} · ${trust}`}>
      <section className="section grid">
        <div className="card span-7">
          <h2>中文介紹</h2>
          <p>{extension.description_zh_hk}</p>
          <h2>相容平台</h2>
          <div className="badge-row">
            {(extension.compatibility || []).map((item: string) => <span className="tag hk" key={item}>{item}</span>)}
          </div>
          <h2>權限與安全</h2>
          <div className="risk">安裝第三方 Skill 或 MCP 前，請先確認來源、所需權限及資料處理方式。需要：{permissions.join("、") || "未能確認"}</div>
          <p className="small muted">Stars：{extension.stars || 0} · Forks：{extension.forks || 0} · 未處理 issues：{extension.open_issues || 0}</p>
        </div>
        <div className="card span-5">
          <h2>安裝方式</h2>
          {hasVerifiedInstall ? <pre className="code">{installCommand}</pre> : <p>暫未提供已核實的安裝指引。</p>}
          <p className="small muted">核實日期：{extension.last_verified_at || "暫無核實日期"}</p>
          {sourceUrl && <p><a href={sourceUrl} target="_blank">查看原始來源</a></p>}
          <h2>測試指令</h2>
          <pre className="code">幫我測試 {extension.name} 是否已經連接，列出可用功能同權限。</pre>
        </div>
      </section>
    </Page>
  );
}
