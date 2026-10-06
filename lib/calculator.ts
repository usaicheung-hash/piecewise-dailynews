export function estimateCost(inputPrice: number | null, outputPrice: number | null, inputTokens: number, outputTokens: number): number | null {
  if (inputPrice == null || outputPrice == null || ![inputPrice, outputPrice, inputTokens, outputTokens].every(n => Number.isFinite(n) && n >= 0)) return null;
  return (inputPrice * inputTokens + outputPrice * outputTokens) / 1_000_000;
}

export function tokenPricePerMillion(value: unknown): number | null {
  if (!['number', 'string'].includes(typeof value) || (typeof value === 'string' && !value.trim())) return null;
  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? price * 1_000_000 : null;
}
