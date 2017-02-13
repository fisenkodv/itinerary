"use strict";
require("angular2-universal-polyfills/browser"); // This needs to be at the top, Universal neccessary polyfills
require("./__2.1.1.workaround.ts"); // temporary until 2.1.1 things are patched in Core
var core_1 = require("@angular/core");
// We're going to let Universal take over the Clients "bootstrap" (instead of the normal platformBrowserDynamic)
var angular2_universal_1 = require("angular2-universal");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// HMR state management 
var app_1 = require("app");
// Grab the browser-specific NgModule
var app_browser_module_1 = require("./app/platform-modules/app.browser.module");
var platform;
if (process.env.production) {
    core_1.enableProdMode();
    platform = angular2_universal_1.platformUniversalDynamic();
}
else {
    // Development mode
    platform = platform_browser_dynamic_1.platformBrowserDynamic();
}
// Boot the application normally
var bootApplication = function () { return platform.bootstrapModule(app_browser_module_1.AppBrowserModule); };
// HMR bootstrap overload
var hmrBootstrap = function () { app_1.handleHmr(module, bootApplication); };
if (module.hot && process.env.development) {
    hmrBootstrap();
}
else {
    bootApplication();
}
//# sourceMappingURL=bootstrap-client.js.map