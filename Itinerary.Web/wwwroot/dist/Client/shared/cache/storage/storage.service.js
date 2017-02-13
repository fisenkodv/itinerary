"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// This is our "shell" Service that will be used through out the application
// Each "platform" will inject its own implementation (storage.browser & storage.node)
// Browser is using window.localStorage
// Node is using inMemory variable Object (which can work for most scenarios),
// If you needed a true cache you'd need to implement Redis or similar here.
// Useage within the app:
//    constructor (private storage: StorageService) {}
// this.storage.setItem('someKey', 123);
var StorageService = (function () {
    function StorageService() {
        this.getItem = function (key) { };
        this.setItem = function (key, value) { };
        this.removeItem = function (key) { };
        this.clear = function () { };
    }
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable()
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map