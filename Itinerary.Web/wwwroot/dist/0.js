webpackJsonp([0],{

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Lazy-Loaded Module & Component
 *  You can see that it wasn't referenced anywhere in the app / modules
 *  Except for in the app.routes.ts file
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(45);
var app_1 = __webpack_require__(21);
var faq_component_1 = __webpack_require__(673);
var FAQModule = (function () {
    function FAQModule() {
    }
    FAQModule = __decorate([
        core_1.NgModule({
            imports: [
                app_1.BaseSharedModule,
                router_1.RouterModule.forChild([
                    { path: '', component: faq_component_1.FAQComponent }
                ])
            ],
            declarations: [
                faq_component_1.FAQComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FAQModule);
    return FAQModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FAQModule;


/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var FAQComponent = (function () {
    // Use "constructor"s only for dependency injection
    function FAQComponent() {
    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    FAQComponent.prototype.ngOnInit = function () {
        console.log('\n\nFAQ Component lazy-loaded!!\n\n');
    };
    FAQComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.Default,
            encapsulation: core_1.ViewEncapsulation.Emulated,
            selector: 'app-faq',
            template: __webpack_require__(674)
        }), 
        __metadata('design:paramtypes', [])
    ], FAQComponent);
    return FAQComponent;
}());
exports.FAQComponent = FAQComponent;


/***/ }),

/***/ 674:
/***/ (function(module, exports) {

module.exports = "<h1>FAQ</h1>\n\n<blockquote>\n    <strong>Fun fact:</strong> This Component was <em>lazy loaded</em> :)<br>\n    Check your Network tab to see that the JS file came only when you first hit this Route.\n</blockquote>\n\n<h2>How to add a route in the app:</h2>\n\n<ul>\n    <li>Create a folder & your Component in Client\\Containers\\</li>\n    <li>Add the Component to: Client\\Containers\\index.ts (this is the \"barrels\" file for all containers)</li>\n    <li>Add the Component to MODULES & ROUTES within: \\Client\\app\\platform-modules\\app.module.ts</li>\n</ul>\n\n<h2>How can I disable Universal / SSR (Server-side rendering)?</h2>\n\nTo disable SSR, go to Views/Home/Index.cshtml and remove asp-prerender-module=\"Client/bootstrap-server\" from the <code>\"app-root\"</code> \ncomponent there in the cshtml file.\n\n<h2>How do I prevent XHR calls from running again on the Client?</h2>\n\nUsing the provided GET from HttpCacheService as opposed to regular Http, it will automatically Cache the \nresponse on the server, and pass it down through the html for you, and when the Client tries to run it again, \nit will instantly grab the result from there.\n\n<strong>This is essential for important XHR calls on a page that happen on page load</strong>\n\n<h2>How do I have code run only in the Browser?</h2>\n\nAngular Universal has isBrowser & isNode you can import from angular2-universal to conditionally run code. \nThis is perfect for situations where code could error on the server. <strong>Also, always remember that things like \nsetTimeout / setInterval / etc should always be wrapped in this</strong>, as you want to completely avoid doing them on the Server.\n\n<pre>\n{{ \" \nimport { isBrowser } from 'angular2-universal';\n\nif (isBrowser) {\n   // do something only in the Browser\n}\n\"}}\n</pre>\n\n<h2>How can I use Material2 with this Repo?</h2>\n\nFor now, Material2 is still in beta, and isn't fully functioning with Universal (it will sometime soon though!), \nso temporarily disable SSR (server-side rendering) so you can use it within your application until updates come \nfrom Material, and you can have it rendered on the server as well. Read the Material docs to see how to add Material \nto your Angular application, with SSR disabled everything should work without any problems.\n\n<h2>How can I use jQuery and/or some jQuery plugins with Angular Universal?</h2>\n\n<blockquote>Note: If at all possible, try to avoid using jQuery or libraries dependent on it, as there are better, \n    more abstract ways of dealing with the DOM in Angular (2+) such as using the Renderer, etc.</blockquote>\n\nYes, of course but there are a few things you need to setup before doing this. First, make sure jQuery is included in \nwebpack vendor file, and that you have a webpack Plugin setup for it. <code>{{ \"new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })\" }}</code>\n\nNow, make sure any \"plugins\" etc that you have, are only included in your bootstrap-client.ts file. \n(ie: import 'slick-carousel';) In a Component you want to use jQuery, make sure to import it near the top like so:\n\n<code>\nimport * as $ from 'jquery';\n</code>\n\n<strong>Always make sure to wrap anything jQuery oriented in Universal's isBrowser conditional!</strong>\n\n<br><br>"

/***/ })

});
//# sourceMappingURL=0.js.map