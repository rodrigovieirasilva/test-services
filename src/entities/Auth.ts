export interface ITokenProvider {
  getToken(): Promise<string>;
}
