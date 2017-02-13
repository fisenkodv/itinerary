// ** HttpGateway **
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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/finally");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var ApiGatewayOptions = (function () {
    function ApiGatewayOptions() {
        this.headers = {};
        this.params = {};
        this.data = {};
    }
    return ApiGatewayOptions;
}());
exports.ApiGatewayOptions = ApiGatewayOptions;
var ApiGatewayService = (function () {
    function ApiGatewayService(http, router) {
        this.http = http;
        this.router = router;
        // Define the internal Subject we'll use to push the command count
        this.pendingCommandsSubject = new Subject_1.Subject();
        this.pendingCommandCount = 0;
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }
    // Http overrides 
    // -------------------
    ApiGatewayService.prototype.get = function (url, params) {
        var options = new ApiGatewayOptions();
        this.addBearerToken(options);
        return this.http.get(url, options);
    };
    ApiGatewayService.prototype.post = function (url, data, params) {
        if (!data) {
            data = params;
            params = {};
        }
        var options = new ApiGatewayOptions();
        options.method = http_1.RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    };
    ApiGatewayService.prototype.put = function (url, data, params) {
        if (!data) {
            data = params;
            params = {};
        }
        var options = new ApiGatewayOptions();
        options.method = http_1.RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    };
    ApiGatewayService.prototype.delete = function (url, params) {
        var options = new ApiGatewayOptions();
        options.method = http_1.RequestMethod.Delete;
        options.url = url;
        options.params = params;
        return this.request(options);
    };
    // Internal methods
    // --------------------
    ApiGatewayService.prototype.request = function (options) {
        var _this = this;
        options.method = (options.method || http_1.RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});
        this.interpolateUrl(options);
        this.addXsrfToken(options);
        this.addContentType(options);
        this.addBearerToken(options);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = JSON.stringify(options.data);
        var isCommand = (options.method !== http_1.RequestMethod.Get);
        if (isCommand) {
            this.pendingCommandsSubject.next(++this.pendingCommandCount);
        }
        var stream = this.http.request(options.url, requestOptions)
            .catch(function (error) {
            _this.handleError(error);
            return Observable_1.Observable.throw(error);
        })
            .map(this.unwrapHttpValue)
            .catch(function (error) {
            return Observable_1.Observable.throw(_this.unwrapHttpError(error));
        })
            .finally(function () {
            if (isCommand) {
                _this.pendingCommandsSubject.next(--_this.pendingCommandCount);
            }
        });
        return stream;
    };
    ApiGatewayService.prototype.addContentType = function (options) {
        if (options.method !== http_1.RequestMethod.Get) {
            options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        }
        return options;
    };
    ApiGatewayService.prototype.addBearerToken = function (options) {
        if (sessionStorage.getItem('accessToken')) {
            options.headers.Authorization = 'Bearer ' + sessionStorage.getItem('accessToken');
        }
        return options;
    };
    ApiGatewayService.prototype.extractValue = function (collection, key) {
        var value = collection[key];
        delete (collection[key]);
        return value;
    };
    ApiGatewayService.prototype.addXsrfToken = function (options) {
        var xsrfToken = this.getXsrfCookie();
        if (xsrfToken) {
            options.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
        return options;
    };
    ApiGatewayService.prototype.getXsrfCookie = function () {
        var matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return (matches && decodeURIComponent(matches[1]));
        }
        catch (decodeError) {
            return ('');
        }
    };
    ApiGatewayService.prototype.addCors = function (options) {
        options.headers['Access-Control-Allow-Origin'] = '*';
        return options;
    };
    ApiGatewayService.prototype.buildUrlSearchParams = function (params) {
        var searchParams = new http_1.URLSearchParams();
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    };
    ApiGatewayService.prototype.interpolateUrl = function (options) {
        var _this = this;
        options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, function ($0, token) {
            // Try to move matching token from the params collection.
            if (options.params.hasOwnProperty(token)) {
                return (_this.extractValue(options.params, token));
            }
            // Try to move matching token from the data collection.
            if (options.data.hasOwnProperty(token)) {
                return (_this.extractValue(options.data, token));
            }
            // If a matching value couldn't be found, just replace
            // the token with the empty string.
            return ('');
        });
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, '/');
        // Clean up any trailing slashes.
        options.url = options.url.replace(/\/+$/g, '');
        return options;
    };
    ApiGatewayService.prototype.handleError = function (error) {
        if (error.status === 401) {
            // use DI to abstract this
            // sessionStorage.clear();
            this.router.navigate(['/login']);
        }
    };
    ApiGatewayService.prototype.unwrapHttpError = function (error) {
        try {
            return (error.json());
        }
        catch (jsonError) {
            return ({
                code: -1,
                message: 'An unexpected error occurred.'
            });
        }
    };
    ApiGatewayService.prototype.unwrapHttpValue = function (value) {
        return (value.json());
    };
    return ApiGatewayService;
}());
ApiGatewayService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], ApiGatewayService);
exports.ApiGatewayService = ApiGatewayService;
//# sourceMappingURL=http-gateway.service.js.map