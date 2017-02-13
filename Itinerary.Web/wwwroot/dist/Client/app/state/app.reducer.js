"use strict";
var app_1 = require("app");
// Action definitions
exports.LOGIN_USER = 'LOGIN_USER';
exports.LOGOUT_USER = 'LOGOUT_USER';
// The reducer function. Receives actions and produces new application states.
exports.appReducer = function (state, action) {
    if (state === void 0) { state = makeInitialState(); }
    switch (action.type) {
        case exports.LOGIN_USER:
            return state.merge({ loggedInUser: action.payload, loggedIn: true });
        case exports.LOGOUT_USER:
            return state.merge(makeInitialState());
        default:
            return state;
    }
};
// Initial AppState, used to bootstrap the reducer.
function makeInitialState() {
    return app_1.appStateFactory({
        loggedIn: false,
        loggedInUser: {}
    });
}
//# sourceMappingURL=app.reducer.js.map