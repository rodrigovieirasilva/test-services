import { IUserBFFClient } from '../../clients/UserBFF/types';
import { IUserBFFService } from '../UserBFF/types';

export class UserBFFService implements IUserBFFService {
  constructor(private userBFFClient: IUserBFFClient) {}
  async getCurrentWorkSpace() {
    return await this.userBFFClient.getCurrentWorkSpace();
  }
}
