export function hkDate(value?: string | null) {
  if (!value || !Number.isFinite(Date.parse(value))) return '時間待確認';
  return new Intl.DateTimeFormat('zh-HK', { timeZone: 'Asia/Hong_Kong', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));
}
