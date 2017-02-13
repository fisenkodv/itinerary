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
var router_1 = require("@angular/router");
var angular2_universal_1 = require("angular2-universal");
var app_shared_1 = require("app-shared");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/filter");
var AppComponent = (function () {
    function AppComponent(router, activatedRoute, meta) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.meta = meta;
        this.defaultPageTitle = 'Itinerary.Web';
    }
    AppComponent.prototype.ngOnInit = function () {
        // Change "Title" on every navigationEnd event
        // Titles come from the data.title property on all Routes (see app.routes.ts)
        this.changeTitleOnNavigation();
        console.log('oninit');
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // Subscription clean-up
        this.sub.unsubscribe();
    };
    AppComponent.prototype.changeTitleOnNavigation = function () {
        var _this = this;
        this.sub = this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (event) {
            // Set Title if available, otherwise leave the default Title
            var title = event['title']
                ? (event['title'] + ' - ' + _this.defaultPageTitle)
                : _this.defaultPageTitle;
            app_shared_1.metaStore.title = title;
            app_shared_1.metaStore.meta = {};
            // Temporarily only do this in the Browser
            // Until we can get entire Html doc (this is a .NET issue since we never pass the entire Document (only root-app))
            return angular2_universal_1.isBrowser ? _this.meta.setTitle(title) : '';
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        template: "\n        <div class=\"container-fluid\">\n            <app-nav-menu></app-nav-menu>\n            <router-outlet></router-outlet>\n        </div>\n    ",
        styleUrls: ['./app.component.css'],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        app_shared_1.Meta])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map