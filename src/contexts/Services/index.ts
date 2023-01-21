import { createContext } from 'react';
import { PriceFeedsClient } from '../../clients/PriceFeeds';
import { UserBFFClient } from '../../clients/UserBFF';
import { AuthService } from '../../services/Auth';
import { PriceFeedsService } from '../../services/PriceFeeds';
import { UserBFFService } from '../../services/UserBFF';

export interface IServicesContext {
  userBFFService: UserBFFService;
  priceFeedsService: PriceFeedsService;
  authService: AuthService;
}

export class ServicesContextClass implements IServicesContext {
  private _userBFFService?: UserBFFService;
  private _priceFeedsService?: PriceFeedsService;
  private _authService?: AuthService;

  constructor() {}

  get userBFFService() {
    if (!this._userBFFService) {
      this._userBFFService = new UserBFFService(
        new UserBFFClient(this.authService)
      );
    }
    return this._userBFFService;
  }

  get authService() {
    if (!this._authService) {
      this._authService = new AuthService();
    }
    return this._authService;
  }

  get priceFeedsService() {
    if (!this._priceFeedsService) {
      this._priceFeedsService = new PriceFeedsService(new PriceFeedsClient());
    }
    return this._priceFeedsService;
  }

  destroy() {
    this._priceFeedsService?.destroy();
  }
}

export const ServicesContext = createContext<IServicesContext>(null!);
export const InitialContext = new ServicesContextClass();
