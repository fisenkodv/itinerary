import { EnvConfig } from './env-config.interface';

const BaseConfig: EnvConfig = {
  API: 'http://localhost:5000/',
  APIVersion: 'v1',
  APIKeys: {
    Google: {
      Places: 'AIzaSyBkxFjVilFXxTMLb6JxL2x-AGeCOLIRO1M'
    }
  }
};

export = BaseConfig;
