import { TestNGPage } from './app.po';

describe('test-ng App', function() {
  let page: TestNGPage;

  beforeEach(() => {
    page = new TestNGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('itinerary works!');
  });
});
