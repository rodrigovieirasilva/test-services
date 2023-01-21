export interface IUserBFFClient {
  getCurrentWorkSpace(): Promise<string>;
}
