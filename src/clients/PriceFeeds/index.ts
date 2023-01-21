import { IPriceFeedsClient, OnMessage } from '../PriceFeeds/types';

export class PriceFeedsClient implements IPriceFeedsClient {
  private interval?: number;
  private increment = 0;

  get isConnected() {
    return !!this.interval;
  }

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
    this.interval = undefined;
    this.increment = 0;
  }
  subscribe(priceFeedsId: string): void {
    console.log(`subscribed ${priceFeedsId}`);
  }
  unsubscribe(priceFeedsId: string): void {
    console.log(`unsubscribed ${priceFeedsId}`);
  }
}
