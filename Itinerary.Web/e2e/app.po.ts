import { browser, element, by } from 'protractor';

export class TestNGPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('itinerary-root h1')).getText();
  }
}
