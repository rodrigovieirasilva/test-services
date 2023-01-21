export interface AssetId {
  ticker: string;
  exchange_iso10383: string;
}

export const assetIdToString = (assetId: AssetId) =>
  `${assetId.ticker}<${assetId.exchange_iso10383}>`;
