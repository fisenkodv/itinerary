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
var app_shared_1 = require("app-shared");
var RestTestComponent = (function () {
    // Use "constructor"s only for dependency injection
    function RestTestComponent(httpCache) {
        this.httpCache = httpCache;
    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    RestTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpCache.get('/api/test/users').subscribe(function (result) {
            _this.users = result;
        });
    };
    return RestTestComponent;
}());
RestTestComponent = __decorate([
    core_1.Component({
        selector: 'app-rest-test',
        templateUrl: './rest-test.component.html',
        animations: [
            // Animation example
            // Triggered in the ngFor with [@flyInOut]
            core_1.trigger('flyInOut', [
                core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
                core_1.transition('void => *', [
                    core_1.style({ transform: 'translateY(-100%)' }),
                    core_1.animate(1000)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(1000, core_1.style({ transform: 'translateY(100%)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [app_shared_1.HttpCacheService])
], RestTestComponent);
exports.RestTestComponent = RestTestComponent;
//# sourceMappingURL=rest-test.component.js.map