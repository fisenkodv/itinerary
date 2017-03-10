import './app/polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

const rootElemTagName = 'itinerary-root';

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
const platform = platformBrowserDynamic();
const bootApplication = () => { platform.bootstrapModule(AppModule); };
if (document.readyState === 'complete') {
  bootApplication();
} else {
  document.addEventListener('DOMContentLoaded', bootApplication);
}