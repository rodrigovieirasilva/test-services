import { IAuthService } from '../Auth/types';

export class AuthService implements IAuthService {
  async getToken(): Promise<string> {
    return 'getToken';
  }
}
