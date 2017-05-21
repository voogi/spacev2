import { SpaceRidersPage } from './app.po';

describe('space-riders App', () => {
  let page: SpaceRidersPage;

  beforeEach(() => {
    page = new SpaceRidersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('space works!');
  });
});
