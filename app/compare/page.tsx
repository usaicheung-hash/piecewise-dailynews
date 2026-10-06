import { getModels } from '../../lib/data-live';
import { Page } from '../ui/components';
import { ModelCompare } from '../ui/model-tools';
export const dynamic = 'force-dynamic';
export default function Compare() { return <Page title="Model 並排比較" subtitle="揀最多 4 個模型，用同一組規格比較價格、上下文同資料範圍。"><ModelCompare models={getModels()} /></Page>; }
