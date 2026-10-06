import { getExtensions } from '../../lib/data-live';
import { Page } from '../ui/components';
import { ResourceDirectory } from '../ui/directories';
export const dynamic = 'force-dynamic';
export default function Extensions() { return <Page title="連接工具，擴展可能。" subtitle="搜尋 Skills 同 MCP；用用途、來源同權限，揀啱 Agent 嘅下一項能力。"><ResourceDirectory items={getExtensions()} /></Page>; }
