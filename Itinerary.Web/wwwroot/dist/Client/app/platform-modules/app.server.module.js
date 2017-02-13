"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
// for AoT we need to manually split universal packages (/browser & /node)
var node_1 = require("angular2-universal/node");
var app_module_1 = require("../app.module");
var app_1 = require("app");
// Universal : XHR Cache 
var app_shared_1 = require("app-shared");
function getRequest() {
    return Zone.current.get('req') || {};
}
exports.getRequest = getRequest;
function getResponse() {
    return Zone.current.get('res') || {};
}
exports.getResponse = getResponse;
var AppServerModule = (function () {
    function AppServerModule(cache) {
        var _this = this;
        this.cache = cache;
        /** Universal Cache "hook"
         * We need to use the arrow function here to bind the context as this is a gotcha
         * in Universal for now until it's fixed
         */
        this.universalDoDehydrate = function (universalCache) {
            console.log('universalDoDehydrate ****');
            universalCache[app_shared_1.CacheService.KEY] = JSON.stringify(_this.cache.dehydrate());
        };
        /** Universal Cache "hook"
         * Clear the cache after it's rendered
         */
        this.universalAfterDehydrate = function () {
            _this.cache.clear();
        };
    }
    return AppServerModule;
}());
AppServerModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_1.AppComponent],
        imports: [
            // "UniversalModule" Must be first import.
            // ** NOTE ** : This automatically imports BrowserModule, HttpModule, and JsonpModule for Browser,
            // and NodeModule, NodeHttpModule etc for the server.
            node_1.UniversalModule,
            app_module_1.AppCommonModule
        ],
        providers: [
            // Angular -Universal- providers below ::
            // Use them as found in the example in /containers/home.component using for example:
            //     ` @Inject('isBrowser') private isBrowser: boolean ` in your constructor
            { provide: 'isBrowser', useValue: node_1.isBrowser },
            { provide: 'isNode', useValue: node_1.isNode },
            { provide: 'req', useFactory: getRequest },
            { provide: 'res', useFactory: getResponse },
            // We're using Dependency Injection here to use a Server/Node specific "Storage" through the empty shell class StorageService
            { provide: app_shared_1.StorageService, useClass: app_shared_1.ServerStorage }
        ]
    }),
    __metadata("design:paramtypes", [app_shared_1.CacheService])
], AppServerModule);
exports.AppServerModule = AppServerModule;
//# sourceMappingURL=app.server.module.js.map