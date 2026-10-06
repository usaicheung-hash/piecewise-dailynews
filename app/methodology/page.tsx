import { Page } from '../ui/components';
export default function Method() {
  return <Page title="資料有來源，選擇有根據。" subtitle="了解資料狀態、參考分數同計算方式，先知道每個數字代表乜。"><section className="section grid">
    <div className="card span-6"><span className="tag">DATA STATUS</span><h2>示例，同匯入資料。</h2><p>初次啟動會加入示例模型，方便試用功能。呢啲價格同分數唔係即時行情，會標示「示例資料」。匯入日期只代表系統取得記錄嘅時間，唔代表獨立驗證。</p><p>OpenRouter 提供嘅模型資料包含價格同上下文長度；實際收費可能因供應商、快取同用量而改變。</p></div>
    <div className="card span-6"><span className="tag">MODEL SCORES</span><h2>估算指標 ≠ 實測能力。</h2><p>目前 OpenRouter 匯入流程以模型上下文長度產生啟發式指標，唔係 benchmark 成績。較長上下文唔代表推理、程式或 Agent 能力一定較高。模型探索預設按名稱排序，唔會將估算包裝成能力排名。</p></div>
    <div className="card span-6"><span className="tag">VALUE REFERENCE</span><h2>性價比參考。</h2><p>品質參考 × 0.5 + 成本參考 × 0.3 + 速度參考 × 0.2。品質為可用能力分數嘅平均；成本參考為 100 ÷（1 + 輸入單價 + 輸出單價）。缺少能力或速度資料會用預設值 50。示例或啟發式資料唔足以支持可靠嘅能力推薦。</p></div>
    <div className="card span-6"><span className="tag">RESOURCE DISCOVERY</span><h2>熱門參考分數。</h2><p>結合動量、對數化 GitHub stars、更新時間同來源標籤。部分動量為估算值；分數唔代表全球使用人數，來源標籤亦唔係安全認證。安裝前應自行檢查 repository、所需權限同資料處理方式。</p></div>
    <div className="card span-12"><span className="tag">COST ESTIMATES</span><h2>成本點計？</h2><p>（輸入 tokens × 每百萬輸入單價 + 輸出 tokens × 每百萬輸出單價）÷ 1,000,000。零價格視為免費；缺少價格唔會當免費。HKD 使用你輸入嘅匯率，預設 7.8 只係參考值。不含稅項、快取折扣、額外工具或圖片等收費。</p></div>
  </section></Page>;
}
