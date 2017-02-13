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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var angular2_universal_1 = require("angular2-universal");
/**
 * A service that can be used to get and add meta tags.
 *
 * @experimental
 */
var Meta = (function () {
    function Meta(_document) {
        this._document = _document;
        this._dom = platform_browser_1.__platform_browser_private__.getDOM();
    }
    /**
     * Sets the title of the page
     */
    Meta.prototype.setTitle = function (title) {
        this._document.title = title;
    };
    /**
     * Adds a new meta tag to the dom.
     *
     *  ### Example
     *
     * ```ts
     * const name: MetaDefinition = {name: 'application-name', content: 'Name of my application'};
     * const desc: MetaDefinition = {name: 'description', content: 'A description of the page'};
     * const tags: HTMLMetaElement[] = this.meta.addTags([name, desc]);
     * ```
     *
     * @param tags
     * @returns {HTMLMetaElement[]}
     */
    Meta.prototype.addTags = function () {
        var _this = this;
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        if (angular2_universal_1.isNode) {
            var presentTags = this._flattenArray(tags);
            if (presentTags.length === 0)
                return [];
            return presentTags.map(function (tag) { return _this._addInternal(tag); });
        }
    };
    Meta.prototype._addInternal = function (tag) {
        var meta = this._createMetaElement();
        this._prepareMetaElement(tag, meta);
        this._appendMetaElement(meta);
        return meta;
    };
    Meta.prototype._createMetaElement = function () {
        return this._dom.createElement('meta');
    };
    Meta.prototype._prepareMetaElement = function (tag, el) {
        var _this = this;
        Object.keys(tag).forEach(function (prop) { return _this._dom.setAttribute(el, prop, tag[prop]); });
        return el;
    };
    Meta.prototype._appendMetaElement = function (meta) {
        var head = this._document.head;
        this._dom.appendChild(head, meta);
    };
    Meta.prototype._flattenArray = function (input, out) {
        if (out === void 0) { out = []; }
        if (input) {
            for (var i = 0; i < input.length; i++) {
                var item = input[i];
                if (Array.isArray(item)) {
                    this._flattenArray(item, out);
                }
                else if (item) {
                    out.push(item);
                }
            }
        }
        return out;
    };
    return Meta;
}());
Meta = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], Meta);
exports.Meta = Meta;
//# sourceMappingURL=meta.service.js.map