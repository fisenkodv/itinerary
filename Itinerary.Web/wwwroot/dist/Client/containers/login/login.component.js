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
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var core_1 = require("@angular/core");
var app_1 = require("app");
// Demo model
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
exports.UserModel = UserModel;
var LoginComponent = (function () {
    // Use "constructor"s only for dependency injection
    function LoginComponent(router, store) {
        this.router = router;
        this.store = store;
        this.user = new UserModel();
    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.submitUser = function () {
        this.store.dispatch({
            type: app_1.LOGIN_USER,
            payload: this.user
        });
        this.router.navigate(['/']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        template: "\n        <form (ngSubmit)=\"submitUser()\" #loginForm=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"username\">Username:</label>\n                <input [(ngModel)]=\"user.username\" name=\"username\" class=\"form-control\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\">Password:</label>\n                <input [(ngModel)]=\"user.password\" name=\"password\" type=\"password\" class=\"form-control\" required />\n            </div>\n\n            <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!loginForm.form.valid\">Login</button>\n            \n        </form>\n    "
    }),
    __metadata("design:paramtypes", [router_1.Router, store_1.Store])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map