"use strict";
require("angular2-universal-polyfills/node");
require("./__2.1.1.workaround.ts");
require("zone.js");
var core_1 = require("@angular/core");
var angular2_universal_1 = require("angular2-universal");
var aspnet_prerendering_1 = require("aspnet-prerendering");
// Grab the (Node) server-specific NgModule
var app_server_module_1 = require("./app/platform-modules/app.server.module");
var app_shared_1 = require("app-shared");
core_1.enableProdMode();
var platform = angular2_universal_1.platformNodeDynamic();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = aspnet_prerendering_1.createServerRenderer(function (params) {
    // Our Root application document
    var doc = '<app-root></app-root>';
    return new Promise(function (resolve, reject) {
        var requestZone = Zone.current.fork({
            name: 'Angular-Universal Request',
            properties: {
                ngModule: app_server_module_1.AppServerModule,
                baseUrl: '/',
                requestUrl: params.url,
                originUrl: params.origin,
                preboot: false,
                document: doc
            },
            onHandleError: function (parentZone, currentZone, targetZone, error) {
                // If any error occurs while rendering the module, reject the whole operation
                reject(error);
                return true;
            }
        });
        return requestZone.run(function () { return platform.serializeModule(app_server_module_1.AppServerModule); }).then(function (html) {
            resolve({ html: html, globals: app_shared_1.metaStore });
        }, reject);
    });
});
// export default function (params: IParams): Promise<{ html: string, globals?: any }> {
//     // Our Root application document
//     const doc = '<app-root></app-root>';
//     // hold platform reference
//     const platformRef = platformNodeDynamic();
//     let platformConfig = {
//         ngModule: AppServerModule,
//         document: doc,
//         preboot: false,
//         baseUrl: '/',
//         requestUrl: params.url,
//         originUrl: params.origin
//     };
//     // defaults
//     let cancel = false;
//     const _config = Object.assign({
//         get cancel() { return cancel; },
//         cancelHandler() { return Zone.current.get('cancel'); }
//     }, platformConfig);
//     // for each user
//     const zone = Zone.current.fork({
//         name: 'UNIVERSAL request',
//         properties: _config
//     });
//     return Promise.resolve(
//         zone.run(() => {
//             return platformRef.serializeModule(Zone.current.get('ngModule'));
//         })
//     ).then(html => {
//         // Something went wrong, return the original blank document at least
//         if (typeof html !== 'string') {
//             return { html: doc };
//         }
//         /*  Successfully serialized Application
//          *  You can pass "Globals" here if you want to pass some data to every request
//          *  (also you could pass in params.data if you want to pass data from the server that came through the Views/Index.cshtml page
//          *   inside of the asp-prerender-data="" attribute
//          *      globals: params.data
//          */
//         return { html, globals: metaStore };
//     }).catch(err => {
//         console.log(err);
//         return { html: doc };
//     });
// }
// export interface IParams {
//     origin: string;
//     url: string;
//     absoluteUrl: string;
//     data: {}; // custom user data sent from server (through asp-prerender-data="" attribute on index.cshtml)
// }
//# sourceMappingURL=bootstrap-server.js.map