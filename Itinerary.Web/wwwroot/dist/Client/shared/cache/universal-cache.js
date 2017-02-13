"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var CacheService = (function () {
    function CacheService() {
        this._cache = new Map();
    }
    /**
     * check if there is a value in our store
     */
    CacheService.prototype.has = function (key) {
        var _key = this.normalizeKey(key);
        return this._cache.has(_key);
    };
    /**
     * store our state
     */
    CacheService.prototype.set = function (key, value) {
        var _key = this.normalizeKey(key);
        this._cache.set(_key, value);
    };
    /**
     * get our cached value
     */
    CacheService.prototype.get = function (key) {
        var _key = this.normalizeKey(key);
        return this._cache.get(_key);
    };
    /**
     * remove specific cache item
     */
    CacheService.prototype.remove = function (key) {
        var _key = this.normalizeKey(key);
        if (_key && this._cache.has(_key)) {
            this._cache.delete(_key);
            return true;
        }
        return false;
    };
    /**
     * release memory refs
     */
    CacheService.prototype.clear = function () {
        this._cache.clear();
    };
    /**
     * convert to json for the client
     */
    CacheService.prototype.dehydrate = function () {
        var json = {};
        this._cache.forEach(function (value, key) { return json[key] = value; });
        return json;
    };
    /**
     * convert server json into out initial state
     */
    CacheService.prototype.rehydrate = function (json) {
        var _this = this;
        Object.keys(json).forEach(function (key) {
            var _key = _this.normalizeKey(key);
            var value = json[_key];
            _this._cache.set(_key, value);
        });
    };
    /**
     * allow JSON.stringify to work
     */
    CacheService.prototype.toJSON = function () {
        return this.dehydrate();
    };
    /**
     * convert numbers into strings
     */
    CacheService.prototype.normalizeKey = function (key) {
        if (core_1.isDevMode() && this._isInvalidValue(key)) {
            throw new Error('Please provide a valid key to save in the CacheService');
        }
        return key + '';
    };
    CacheService.prototype._isInvalidValue = function (key) {
        return key === undefined ||
            key === undefined ||
            key === 0 ||
            key === '' ||
            typeof key === 'boolean' ||
            Number.isNaN(key);
    };
    return CacheService;
}());
CacheService.KEY = 'CacheService';
CacheService = __decorate([
    core_1.Injectable()
], CacheService);
exports.CacheService = CacheService;
//# sourceMappingURL=universal-cache.js.map