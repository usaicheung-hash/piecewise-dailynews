import { getExtensions } from '../../lib/data-live';
import { Page } from '../ui/components';
import { ResourceDirectory } from '../ui/directories';
export const dynamic = 'force-dynamic';
export default function MCP() { return <Page title="MCP · 接上更多能力。" subtitle="連接工具、資料同服務。先睇用途、來源同權限，再決定點樣用。"><ResourceDirectory items={getExtensions('MCP')} fixedType="MCP" /></Page>; }
