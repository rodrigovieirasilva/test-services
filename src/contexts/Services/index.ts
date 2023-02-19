import { createContext } from 'react';
import { PriceFeedsClient } from '../../clients/PriceFeeds';
import { UserBFFClient } from '../../clients/UserBFF';
import { AuthService } from '../../services/Auth';
import { IAuthService } from '../../services/Auth/types';
import { PriceFeedsService } from '../../services/PriceFeeds';
import { IPriceFeedsService } from '../../services/PriceFeeds/types';
import { UserBFFService } from '../../services/UserBFF';
import { IUserBFFService } from '../../services/UserBFF/types';

export interface IServicesContext {
  userBFFService: IUserBFFService;
  priceFeedsService: IPriceFeedsService;
  authService: IAuthService;
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

interface IService {}

type ValueMapContextType = IService | (() => IService);

const cache = new Map<string, ValueMapContextType>();

const get = <T extends IService>(serviceName: string): T => {
  const result = cache.get(serviceName);
  console.log(typeof result);
  if (result) {
    if (typeof result === 'function') {
      return result();
    }
  }
  return result as T;
};

const set = (serviceName: string, service: ValueMapContextType): void => {
  cache.set(serviceName, service);
};
class Outra implements IService {
  constructor() {
    console.log('testeOutra');
  }
  teste() {
    console.log('teste function');
  }
}
const OutraServiceName = 'OutraService';
set(OutraServiceName, () => new Outra());
const outra = get<Outra>(OutraServiceName);
