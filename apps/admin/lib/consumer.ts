export function getConsumerProductUrl(assetId: string): string {
  const consumerUrl = process.env.NEXT_PUBLIC_CONSUMER_URL;
  if (!consumerUrl) {
    return '#';
  }
  return `${consumerUrl}?asset=${encodeURIComponent(assetId)}`;
}
