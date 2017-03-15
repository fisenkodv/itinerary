import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';
import { decorateModuleRef } from './app/environment';

const rootElemTagName = 'itinerary-root';
const platform = platformBrowserDynamic();

// Enable either Hot Module Reloading or production mode
if (module['hot']) {
 module['hot'].accept();
 module['hot'].dispose(() => {
   // Before restarting the app, we create a new root element and dispose the old one
   const oldRootElem = document.querySelector(rootElemTagName);
   const newRootElem = document.createElement(rootElemTagName);
   oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
   platform.destroy();
 });
} else {
 enableProdMode();
}

// Boot the application, either now or when the DOM content is loaded
const bootApplication = () => {
  platform.bootstrapModule(AppModule)
    .then(decorateModuleRef);
};
if (document.readyState === 'complete') {
  bootApplication();
} else {
  document.addEventListener('DOMContentLoaded', bootApplication);
}
