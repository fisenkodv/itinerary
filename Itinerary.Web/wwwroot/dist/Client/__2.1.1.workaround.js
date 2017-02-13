/*
 * THIS IS TEMPORARY TO PATCH 2.1.1+ Core bugs
 */
"use strict";
/* tslint:disable */
var __compiler__ = require('@angular/compiler');
var core_1 = require("@angular/core");
var patch = false;
if (!core_1.__core_private__['ViewUtils']) {
    patch = true;
    core_1.__core_private__['ViewUtils'] = core_1.__core_private__['view_utils'];
}
if (!__compiler__.__compiler_private__) {
    patch = true;
    (__compiler__).__compiler_private__ = {
        SelectorMatcher: __compiler__.SelectorMatcher,
        CssSelector: __compiler__.CssSelector
    };
}
var __universal__ = require('angular2-platform-node/__private_imports__');
if (patch) {
    __universal__.ViewUtils = core_1.__core_private__['view_utils'];
    __universal__.CssSelector = __compiler__.CssSelector;
    __universal__.SelectorMatcher = __compiler__.SelectorMatcher;
}
//# sourceMappingURL=__2.1.1.workaround.js.map