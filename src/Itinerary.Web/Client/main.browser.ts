import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { AppModule } from './app';
import { decorateModuleRef } from './app/environment';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

bootloader(main);
