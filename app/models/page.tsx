import { getModels } from '../../lib/data-live';
import { Page } from '../ui/components';
import { ModelExplorer } from '../ui/model-tools';
export const dynamic = 'force-dynamic';
export default function Models() { return <Page title="揀啱你嘅 AI Model。" subtitle="搜尋模型、按供應商篩選，再比較價格同上下文長度。由自己嘅需求出發。"><ModelExplorer models={getModels()} /></Page>; }
