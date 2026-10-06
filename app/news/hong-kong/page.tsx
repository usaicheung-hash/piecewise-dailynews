import { getNews } from '../../../lib/data-live';
import { Page } from '../../ui/components';
import { NewsDirectory } from '../../ui/directories';
export const dynamic = 'force-dynamic';
export default function HKNews() { return <Page title="AI 同香港，有咩關係？" subtitle="聚焦本地企業、大學、政策同實際應用。"><NewsDirectory items={getNews({hk: true, limit: 50})} /></Page>; }
