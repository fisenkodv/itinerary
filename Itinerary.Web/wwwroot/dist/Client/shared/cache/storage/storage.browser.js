"use strict";
var BrowserStorage = (function () {
    function BrowserStorage() {
    }
    BrowserStorage.prototype.getItem = function (key) {
        var storedItem = window.localStorage.getItem(key);
        try {
            return JSON.parse(storedItem);
        }
        catch (ex) {
            return storedItem;
        }
    };
    BrowserStorage.prototype.setItem = function (key, value) {
        // We need to try and stringify it first (we can't save Objects/etc or it'll error out)
        if (typeof value !== 'string') {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            window.localStorage.setItem(key, value);
        }
    };
    BrowserStorage.prototype.removeItem = function (key) {
        window.localStorage.removeItem(key);
    };
    BrowserStorage.prototype.clear = function () {
        window.localStorage.clear();
    };
    return BrowserStorage;
}());
exports.BrowserStorage = BrowserStorage;
//# sourceMappingURL=storage.browser.js.map