/*
    This is our "Barrels" index
    Here we can just export all individual things (in this folder)

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../app/'"

    We can just do:
        import { AppState } from 'app';

    Makes life easier!
*/
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./app.component"));
__export(require("./state/app.reducer"));
__export(require("./state/app-state"));
__export(require("./state/hmr"));
__export(require("./shared-module/base.shared.module"));
//# sourceMappingURL=index.js.map