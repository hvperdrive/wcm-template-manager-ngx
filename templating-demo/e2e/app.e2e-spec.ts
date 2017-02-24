import { TemplatingDemoPage } from './app.po';

describe('templating-demo App', () => {
  let page: TemplatingDemoPage;

  beforeEach(() => {
    page = new TemplatingDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
