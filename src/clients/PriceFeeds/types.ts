export interface PriceFeedsMessage {
  t: string;
  data: {
    price: number;
  };
}
export type OnMessage = (message: PriceFeedsMessage) => void;
export interface IPriceFeedsClient {
  isConnected: boolean;
  connect(onMessage: OnMessage): void;
  close(): void;
  subscribe(priceFeedsId: string): void;
  unsubscribe(priceFeedsId: string): void;
}
