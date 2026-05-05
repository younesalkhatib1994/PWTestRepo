import { Browser, BrowserContext, Page, chromium } from 'playwright';

/**
 * Manages browser lifecycle for tests.
 * A single Browser is shared; each test suite gets a fresh BrowserContext (isolated cookies/storage).
 */
export class BrowserHelper {
  private browser!: Browser;
  private context!: BrowserContext;
  public page!: Page;

  /** Launch the browser. Call once in before(). */
  async launch(): Promise<void> {
    this.browser = await chromium.launch({
      headless: process.env.HEADED !== 'true',
    });
  }

  /** Create a new isolated context + page. Call in beforeEach() for test isolation. */
  async newPage(): Promise<Page> {
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    this.page = await this.context.newPage();
    return this.page;
  }

  /** Close context after each test to clear cookies/state. */
  async closeContext(): Promise<void> {
    await this.context?.close();
  }

  /** Close browser. Call in after(). */
  async closeBrowser(): Promise<void> {
    await this.browser?.close();
  }
}
