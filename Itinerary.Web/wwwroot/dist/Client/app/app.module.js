/*
 * _Common_ NgModule to share between our "BASE" App.Browser & App.Server module platforms
 *
 *  If something belongs to BOTH, just put it Here.
 * - If you need something to be very "platform"-specific, put it
 *   in the specific one (app.browser or app.server)
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var ng2_bootstrap_1 = require("ng2-bootstrap");
// Main "APP" Root Component
var app_1 = require("app");
// Component imports
var app_components_1 = require("app-components");
// Container (aka: "pages") imports
var app_containers_1 = require("app-containers");
// Provider (aka: "shared" | "services") imports
var app_shared_1 = require("app-shared");
//////////////////////////////////////////////////////////////////
// This imports the variable that, in a hot loading situation, holds
// a reference to the previous application's last state before
// it was destroyed.
var app_2 = require("app");
/*
 * All of our Applications ROUTES Go here (imported in MODULES)
 */
var ROUTES = [
    // Base route
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // Other routes
    { path: 'home', component: app_containers_1.HomeComponent, data: { title: 'Home' } },
    { path: 'bootstrap', component: app_containers_1.BootstrapComponent, data: { title: 'Bootstrap Examples' } },
    { path: 'rest-test', component: app_containers_1.RestTestComponent, data: { title: 'WebAPI Examples' } },
    { path: 'login', component: app_containers_1.LoginComponent, data: { title: 'Login' } },
    { path: 'examples', component: app_containers_1.ExamplesComponent, data: { title: 'Platform Examples' } },
    { path: 'chat', component: app_containers_1.ChatComponent, data: { title: 'Chat' } },
    { path: 'not-found', component: app_containers_1.NotFoundComponent, data: { title: '404 - Not Found' } },
    {
        // Notice we don't reference the file anywhere else, imports, declarations, anywhere
        // Webpack2 will provide the separate "chunk" due to System.import
        path: 'faq',
        loadChildren: function () { return System.import('../containers/+faq/faq.module').then(function (file) {
            // We use .default here since we use `export default` 
            // in the FAQModule NgModule
            return file.default;
        }); },
        data: { title: 'FAQ' }
    },
    // loadChildren: '../containers/+faq/faq.module#FAQModule' },
    // All else fails - go home
    { path: '**', redirectTo: 'not-found' }
];
var PIPES = [];
var COMPONENTS = [
    // put shared components here
    app_1.AppComponent,
    app_components_1.NavMenuComponent,
    app_containers_1.RestTestComponent,
    app_containers_1.HomeComponent,
    app_containers_1.LoginComponent,
    app_containers_1.BootstrapComponent,
    app_containers_1.ExamplesComponent,
    app_containers_1.ChatComponent,
    app_containers_1.NotFoundComponent,
    // Directives
    app_shared_1.RxContextDirective
];
var PROVIDERS = [
    // put shared services here
    app_shared_1.CacheService,
    app_shared_1.HttpCacheService,
    app_shared_1.ApiGatewayService,
    app_shared_1.Meta // MetaService is a cross platform way to change title, and update anything in the <head>
];
/*
 * Common NgModule (remember this gets imported into app.browser.module & app.server.module)
 */
var AppCommonModule = (function () {
    function AppCommonModule() {
    }
    return AppCommonModule;
}());
AppCommonModule = __decorate([
    core_1.NgModule({
        imports: [
            // Do NOT include UniversalModule, HttpModule, or JsonpModule here
            // This has ALL the "Common" stuff (CommonModule, FormsModule, ReactiveFormsModule, etc etc)
            // You would import this into your child NgModules so you don't need to duplicate so much code
            app_1.BaseSharedModule,
            // Angular
            router_1.RouterModule,
            // NgRx
            store_1.StoreModule.provideStore(app_1.appReducer, app_2.appState),
            effects_1.EffectsModule,
            // Bootstrap
            ng2_bootstrap_1.Ng2BootstrapModule.forRoot(),
            // Routing
            router_1.RouterModule.forRoot(ROUTES)
        ],
        declarations: PIPES.concat(COMPONENTS),
        providers: PROVIDERS.slice()
    })
], AppCommonModule);
exports.AppCommonModule = AppCommonModule;
//# sourceMappingURL=app.module.js.map