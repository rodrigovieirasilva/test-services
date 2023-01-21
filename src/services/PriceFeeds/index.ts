import { IPriceFeedsClient } from '../../clients/PriceFeeds/types';
import { AssetId } from '../../entities/AssetId';
import {
  IPriceFeedsService,
  mountEventName,
  PriceFeedsAsset,
  UpdatePriceFeedsEvent,
  UpdatePriceFeedsListener,
} from '../PriceFeeds/types';

export class PriceFeedsService implements IPriceFeedsService {
  private assetCodes = new Map<string, AssetId>();
  constructor(private priceFeedsClient: IPriceFeedsClient) {}
  subscribe(asset: PriceFeedsAsset): void {
    this.safeConnect();
    const id = this.getPriceFedsId(asset);
    this.assetCodes.set(id, asset.assetId);
    this.priceFeedsClient.subscribe(id);
  }
  unsubscribe(asset: PriceFeedsAsset): void {
    const id = this.getPriceFedsId(asset);
    this.priceFeedsClient.unsubscribe(id);
  }
  onUpdate(assetId: AssetId, listener: UpdatePriceFeedsListener): void {
    window.addEventListener(mountEventName(assetId), listener);
  }
  offUpdate(assetId: AssetId, listener: UpdatePriceFeedsListener): void {
    window.removeEventListener(mountEventName(assetId), listener);
  }

  private safeConnect() {
    if (!this.priceFeedsClient.isConnected) {
      this.priceFeedsClient.connect((message) => {
        const assetId = this.assetCodes.get(message.t);
        if (assetId) {
          window.dispatchEvent(
            new UpdatePriceFeedsEvent({
              assetId: assetId,
              data: message.data,
            })
          );
        }
      });
    }
  }

  private getPriceFedsId(asset: PriceFeedsAsset) {
    return asset[asset.price_feeds_id] as string;
  }
}
