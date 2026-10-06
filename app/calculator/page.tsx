import { getModels } from '../../lib/data-live';
import { Page } from '../ui/components';
import { PriceCalculator } from '../ui/model-tools';
export const dynamic = 'force-dynamic';
export default function Calculator() { return <Page title="用幾多，計幾多。" subtitle="輸入你嘅 token 用量，即時計算各個模型嘅 API 成本。支援 USD 同港幣參考換算。"><PriceCalculator models={getModels()} /></Page>; }
