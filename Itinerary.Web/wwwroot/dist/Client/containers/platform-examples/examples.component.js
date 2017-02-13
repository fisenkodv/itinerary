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
var angular2_universal_1 = require("angular2-universal");
var Rx_1 = require("rxjs/Rx");
var app_shared_1 = require("app-shared");
var ExamplesComponent = (function () {
    // Use "constructor"s only for dependency injection
    function ExamplesComponent(storage) {
        this.storage = storage;
    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ExamplesComponent.prototype.ngOnInit = function () {
        /*
         * Platform specific -Example- ::
         * We don't want an interval to continuously run on the server (it will just timeout the server) or delay our response.
         * So avoid having things like "interval" run on the server. With Universal's "isBrowser" we can have it only run there.
         */
        if (angular2_universal_1.isBrowser) {
            this.browserPlatformInterval = Rx_1.Observable.interval(300);
        }
        // ************
        // Now let's play around with "Storage", but on a Platform level 
        // Node will use in memory variable, while the Browser uses "localStorage"
        // Both are abstracted out use Dependency Injection to provide different classes for each use-case.
        // [high-five] :)
        this.storage.setItem('test', 'This came from Storage within each Platform !!');
        var storedItem = this.storage.getItem('test');
        console.log('Platform [Storage] test :: ' + storedItem);
    };
    return ExamplesComponent;
}());
ExamplesComponent = __decorate([
    core_1.Component({
        selector: 'app-examples',
        template: "\n        <h1>Platform specific examples</h1>\n\n        <blockquote>\n            With Universal, we can decide which logic we want to run in \"what\" situation (or platform).\n            Certain things, we <strong>don't</strong> want running on the server:<br><br>\n\n            timeouts, intervals, references to window/document/navigator, etc...\n            <br><br>\n\n            We want to use platform detecting logic from Universal such as <strong>isBrowser | isNode</strong> to wrap<br>\n            around these things.\n        </blockquote>\n\n        <h3>Counter example = {{ browserPlatformInterval | async}}</h3>\n\n        <blockquote>\n            We can't let an \"interval\" run on the server, for it would loop endlessly and we'd never get a paint.<br>\n            In a situation like this we used \"isBrowser\" from Universal to wrap our logic per platform.\n        </blockquote>\n    "
    }),
    __metadata("design:paramtypes", [app_shared_1.StorageService])
], ExamplesComponent);
exports.ExamplesComponent = ExamplesComponent;
//# sourceMappingURL=examples.component.js.map