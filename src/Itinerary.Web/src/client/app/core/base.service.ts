import { Config } from '../shared/config/env.config';

export abstract class BaseService {
  protected getBaseApiUrl(): string {
    return `${Config.API}/api/v1`;
  }

  protected urlEncode(obj: any): string {
    const urlSearchParams = new URLSearchParams();
    for (const key of Object.keys(obj)) {
      urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
  }
}
