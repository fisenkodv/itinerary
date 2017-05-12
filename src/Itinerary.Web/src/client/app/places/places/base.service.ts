import { Config } from '../../shared/config/env.config';

export abstract class BaseService {
  protected getBaseServiceUrl(): string {
    return `${Config.API}api/${Config.APIVersion}/`;
  }

  protected urlEncode(obj: any): string {
    const urlSearchParams = new URLSearchParams();
    for (const key of Object.keys(obj)) {
      urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
  }
}
