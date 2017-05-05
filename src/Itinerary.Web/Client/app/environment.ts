import { ApplicationRef, enableProdMode } from '@angular/core';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';

// Environment Providers
let providers: any[] = [
  // common env directives
];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let decorateModuleRefInternal = <T>(value: T): T => value;

if ('production' === ENV) {
  enableProdMode();

  // Production
  decorateModuleRefInternal = (modRef: any) => {
    disableDebugTools();

    return modRef;
  };

  providers = [
    ...providers
    // custom providers in production
  ];

} else {

  decorateModuleRefInternal = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    const ng = (window as any).ng;
    enableDebugTools(cmpRef);
    (window as any).ng.probe = ng.probe;
    (window as any).ng.coreTokens = ng.coreTokens;
    return modRef;
  };

  // Development
  providers = [
    ...providers
    // custom providers in development
  ];

}

export const decorateModuleRef = decorateModuleRefInternal;

export const envProviders = [
  ...providers
];
