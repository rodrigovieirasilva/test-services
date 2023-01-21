import { IPriceFeedsClient, OnMessage } from '../PriceFeeds/types';

export class PriceFeedsClient implements IPriceFeedsClient {
  private interval?: number;
  private increment = 0;

  connect(onMessage: OnMessage): void {
    this.interval = setInterval(
      () =>
        onMessage?.({
          t: '56.1.PETR4',
          data: { price: this.increment++ },
        }),
      1000
    );
  }
  close(): void {
    clearInterval(this.interval);
  }
  subscribe(priceFeedsId: string): void {
    console.log(`subscribed ${priceFeedsId}`);
  }
  unsubscribe(priceFeedsId: string): void {
    console.log(`unsubscribed ${priceFeedsId}`);
  }
}