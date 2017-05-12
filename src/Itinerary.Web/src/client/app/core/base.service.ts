import { Config } from '../shared/config/env.config';

export abstract class BaseService {
  protected getBaseServiceUrl(appendVersion: boolean = true): string {
    const version = appendVersion ? `api/${Config.APIVersion}` : '';
    return `${Config.API}${version}/`;
  }

  protected urlEncode(obj: any): string {
    const urlSearchParams = new URLSearchParams();
    for (const key of Object.keys(obj)) {
      urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
  }
}
