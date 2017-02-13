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
var store_1 = require("@ngrx/store");
var app_1 = require("app");
var NavMenuComponent = (function () {
    // Use "constructor"s only for dependency injection
    function NavMenuComponent(store) {
        this.store = store;
    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    NavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select('loggedIn').subscribe(function (loggedIn) {
            _this.loggedIn$ = loggedIn;
        });
        this.store.select('loggedInUser').subscribe(function (user) {
            _this.user$ = user;
        });
    };
    NavMenuComponent.prototype.logout = function () {
        this.store.dispatch({ type: app_1.LOGOUT_USER });
    };
    return NavMenuComponent;
}());
NavMenuComponent = __decorate([
    core_1.Component({
        selector: 'app-nav-menu',
        templateUrl: './navmenu.component.html',
        styleUrls: ['./navmenu.component.css']
    }),
    __metadata("design:paramtypes", [store_1.Store])
], NavMenuComponent);
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=navmenu.component.js.map