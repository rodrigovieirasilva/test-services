import { AssetId, assetIdToString } from '../../entities/AssetId';

declare global {
  interface WindowEventMap {
    [eventName: string]: UpdatePriceFeedsEvent;
  }
}

export interface UpdatePriceFeedsDetail {
  assetId: AssetId;
  data: {
    price: number;
  };
}

export interface PriceFeedsAsset {
  assetId: AssetId;
  price_feeds_id: string;
  [price_feeds_id: string]: unknown;
}

export class UpdatePriceFeedsEvent extends CustomEvent<UpdatePriceFeedsDetail> {
  static readonly eventPrefixName = 'UpdatePriceFeedsEvent';

  constructor(detail: UpdatePriceFeedsDetail) {
    super(mountEventName(detail.assetId), { detail });
  }
}

export const mountEventName = (asset: AssetId) =>
  `${UpdatePriceFeedsEvent.eventPrefixName}-${assetIdToString(asset)}`;

export type UpdatePriceFeedsListener = (event: UpdatePriceFeedsEvent) => void;
export interface IPriceFeedsService {
  subscribe(asset: PriceFeedsAsset): void;
  unsubscribe(asset: PriceFeedsAsset): void;
  onUpdate(assetId: AssetId, listener: UpdatePriceFeedsListener): void;
  offUpdate(assetId: AssetId, listener: UpdatePriceFeedsListener): void;
  destroy(): void;
}
