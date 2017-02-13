/*
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../shared/'"

    We can just do:
        import { WebSocketService } from 'app-shared';

    Makes life easier!
*/
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Put Shared SERVICES here in /shared
__export(require("./cache/api"));
__export(require("./cache/universal-cache"));
__export(require("./cache/storage"));
__export(require("./http/http-gateway.service"));
__export(require("./rx/rx-context.directive"));
__export(require("./meta/meta.service"));
__export(require("./meta/meta.store"));
//# sourceMappingURL=index.js.map