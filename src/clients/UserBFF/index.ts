import { BaseAxiosClient } from '../base/BaseAxiosClient';
import { IUserBFFClient } from '../UserBFF/types';

export class UserBFFClient extends BaseAxiosClient implements IUserBFFClient {
  async getCurrentWorkSpace(): Promise<string> {
    return `getCurrentWorkSpace`;
  }
}
