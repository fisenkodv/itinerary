"use strict";
// Our pseudo server Storage we'll use on the server to replace localStorage
// This can handle most scenarios, but if you truly needed a server Memory Cache
// you'd want to use Redis or something here
var fakeInMemoryStore = {};
var ServerStorage = (function () {
    function ServerStorage() {
    }
    ServerStorage.prototype.getItem = function (key) {
        return fakeInMemoryStore[key] || undefined;
    };
    ServerStorage.prototype.setItem = function (key, value) {
        return fakeInMemoryStore[key] = value;
    };
    ServerStorage.prototype.removeItem = function (key) {
        try {
            delete fakeInMemoryStore[key];
        }
        catch (ex) { }
    };
    ServerStorage.prototype.clear = function () {
        fakeInMemoryStore = {};
    };
    return ServerStorage;
}());
exports.ServerStorage = ServerStorage;
//# sourceMappingURL=storage.node.js.map