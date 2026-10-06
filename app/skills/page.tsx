import { getExtensions } from '../../lib/data-live';
import { Page } from '../ui/components';
import { ResourceDirectory } from '../ui/directories';
export const dynamic = 'force-dynamic';
export default function Skills() { return <Page title="Skills · 做事有方法。" subtitle="可重用嘅工作流程，幫 Agent 按清楚步驟完成任務。"><ResourceDirectory items={getExtensions('Skill')} fixedType="Skill" /></Page>; }
