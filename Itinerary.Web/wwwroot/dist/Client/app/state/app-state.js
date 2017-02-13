"use strict";
/*
 * Model definition for the (immutable) application state.
 */
var typed_immutable_record_1 = require("typed-immutable-record");
// An Immutable.js record factory for the record.
exports.appStateFactory = typed_immutable_record_1.makeTypedFactory({
    loggedIn: false,
    loggedInUser: {}
});
//# sourceMappingURL=app-state.js.map