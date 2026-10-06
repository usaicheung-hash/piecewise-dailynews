import { getNews } from '../../lib/data-live';
import { Page } from '../ui/components';
import { NewsDirectory } from '../ui/directories';
export const dynamic = 'force-dynamic';
export default function News() { return <Page title="少啲雜訊，多啲重點。" subtitle="AI 新聞、來源同實際影響，逐件睇清。保留原始連結，方便自己核對。"><NewsDirectory items={getNews({limit: 50})} /></Page>; }
