/*
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../containers/'"

    We can just do:
        import { HomeComponent } from 'app-containers';

    Makes life easier!
*/
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./rest-test/rest-test.component"));
__export(require("./home/home.component"));
__export(require("./bootstrap/bootstrap.component"));
__export(require("./login/login.component"));
__export(require("./platform-examples/examples.component"));
__export(require("./not-found/not-found.component"));
__export(require("./chat/chat.component"));
//# sourceMappingURL=index.js.map