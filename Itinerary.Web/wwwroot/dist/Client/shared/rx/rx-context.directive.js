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
var Rx_1 = require("rxjs/Rx");
/* tslint:disable */ // <-- disabled to ignore app- prefix 
var RxContextDirective = (function () {
    function RxContextDirective(templateRef, vcr, cdr) {
        this.templateRef = templateRef;
        this.vcr = vcr;
        this.cdr = cdr;
        this.cdr.detach();
    }
    RxContextDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.rxContextOn.subscribe(function (state) {
            if (!_this.viewRef) {
                _this.viewRef = _this.vcr.createEmbeddedView(_this.templateRef, { '$implicit': state });
            }
            _this.viewRef.context.$implicit = state;
        });
    };
    return RxContextDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Rx_1.Observable)
], RxContextDirective.prototype, "rxContextOn", void 0);
RxContextDirective = __decorate([
    core_1.Directive({
        selector: '[rxContext][apprxContextOn]'
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef, core_1.ViewContainerRef, core_1.ChangeDetectorRef])
], RxContextDirective);
exports.RxContextDirective = RxContextDirective;
//# sourceMappingURL=rx-context.directive.js.map