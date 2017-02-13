"use strict";
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var hmr_1 = require("@angularclass/hmr");
require("rxjs/add/operator/take");
// Called from main.ts when a hot bootstrap should be done.
// This function is called every time the application loads
// (first when the page loads, and then again after each hot reload)
function handleHmr(module, // The module that we're handling HMR for (it'll be the main.ts module)
    bootstrap) {
    // Store a reference to the NgModule that we will bootstrap.
    // We'll need it during unload.
    var moduleRef;
    // Bootstrap the module and grab the NgModule reference from the
    // promise when it's resolved. This will start the application.
    bootstrap()
        .then(function (mod) { return moduleRef = mod; });
    // Let Webpack know that we can handle hot loading for this module
    module.hot.accept();
    // Attach a callback to module unload. This'll be called during a hot
    // reload, before the new version of the application comes in. We need to:
    // 1) Grab the current state of the previous application so we can reuse it.
    // 2) Destroy the previous application so that the new one can load cleanly.
    module.hot.dispose(function () {
        // Grab a reference to the running Angular application.
        var appRef = moduleRef.injector.get(core_1.ApplicationRef);
        // Grab a reference to the application's @ngrx/store.
        var store = moduleRef.injector.get(store_1.Store);
        // Get the current state from the Store. The store is an Observable so
        // we can use the Observable API to get the state. We'll get it synchronously
        // though this code may look like we might not.
        store.take(1).subscribe(function (s) {
            exports.appState = s;
        });
        // When an Angular app is destroyed, it will also remove the DOM elements
        // of its root component(s) from the page. When doing hot loading, this is
        // a problem because the next version of the app will have nothing to
        // attach to. We need to clone the DOM nodes of the current application's root
        // component(s)
        var cmpLocations = appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        var disposeOldHosts = hmr_1.createNewHosts(cmpLocations);
        moduleRef.destroy();
        hmr_1.removeNgStyles();
        disposeOldHosts();
        // After this, the next version of the app will load momentarily.
        // Webpack dev server will execute the new `main.ts` which will then call 
        // `handleHmr` again...
    });
}
exports.handleHmr = handleHmr;
//# sourceMappingURL=hmr.js.map