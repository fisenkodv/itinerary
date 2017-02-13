"use strict";
var platform_browser_1 = require("@angular/platform-browser");
var testing_1 = require("@angular/core/testing");
var home_component_1 = require("./home.component");
describe('Home Component', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [home_component_1.HomeComponent]
        });
        fixture = testing_1.TestBed.createComponent(home_component_1.HomeComponent);
        // HomeComponent test instance
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should display a title', testing_1.async(function () {
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        var titleText = de.nativeElement.textContent;
        expect(titleText).toContain(comp.title);
    }));
});
//# sourceMappingURL=home.component.spec.js.map