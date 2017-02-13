/*
 * Lazy-Loaded Module & Component
 *  You can see that it wasn't referenced anywhere in the app / modules
 *  Except for in the app.routes.ts file
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
var app_1 = require("app");
var faq_component_1 = require("./faq.component");
var FAQModule = (function () {
    function FAQModule() {
    }
    return FAQModule;
}());
FAQModule = __decorate([
    core_1.NgModule({
        imports: [
            app_1.BaseSharedModule,
            router_1.RouterModule.forChild([
                { path: '', component: faq_component_1.FAQComponent }
            ])
        ],
        declarations: [
            faq_component_1.FAQComponent
        ]
    })
], FAQModule);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FAQModule;
//# sourceMappingURL=faq.module.js.map