import { browser, by, element } from 'protractor';

export class SpaceRidersPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('space-root h1')).getText();
  }
}
