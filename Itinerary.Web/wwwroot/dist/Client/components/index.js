/*
    This is our "Barrels" index
    Here we can just export all individual things (in this folder)

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../components/'"

    We can just do:
        import { NavMenuComponent } from 'app-components';

    Makes life easier!
*/
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./navmenu/navmenu.component"));
//# sourceMappingURL=index.js.map