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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var angular2_universal_1 = require("angular2-universal");
require("rxjs/add/observable/throw");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/share");
var universal_cache_1 = require("./universal-cache");
var HttpCacheService = (function () {
    function HttpCacheService(_http, _cache) {
        this._http = _http;
        this._cache = _cache;
    }
    HttpCacheService.prototype.get = function (url, options, autoClear) {
        var _this = this;
        if (autoClear === void 0) { autoClear = true; }
        // You want to return the cache if there is a response in it. 
        // This would cache the first response so if your API isn't idempotent you probably want to 
        // remove the item from the cache after you use it. LRU of 1 
        var key = url;
        if (this._cache.has(key)) {
            var cachedResponse = this._cache.get(key);
            // if autoClear is set to false, item will stay in cache until you manually clear it
            // ie: trigger CacheService.remove(url /* with the url/key used here */)
            if (autoClear) {
                // remove previous value automatically for now
                this._cache.remove(key);
            }
            return Observable_1.Observable.of(cachedResponse);
        }
        // note: you probably shouldn't .share() and you should write the correct logic
        return this._http.get(url, options)
            .map(function (res) { return res.json(); })
            .do(function (json) { if (angular2_universal_1.isNode) {
            _this._cache.set(key, json);
        } })
            .share();
    };
    return HttpCacheService;
}());
HttpCacheService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, universal_cache_1.CacheService])
], HttpCacheService);
exports.HttpCacheService = HttpCacheService;
//# sourceMappingURL=api.js.map