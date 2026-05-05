import { strict as assert } from 'assert';
import { BrowserHelper } from '../utils/BrowserHelper';
import { LoginPage } from '../pages/LoginPage';

/**
 * Login Test Suite
 *
 * Target: https://the-internet.herokuapp.com/login
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
describe('Login Page', () => {
  const browser = new BrowserHelper();
  let loginPage: LoginPage;

  // ── Hooks ────────────────────────────────────────────────────────────────

  before(async () => {
    await browser.launch();
  });

  beforeEach(async () => {
    const page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

 afterEach(async () => {
    await browser.closeContext();
  });

 after(async () => {
    await browser.closeBrowser();
  });

  // ── Test Cases ────────────────────────────────────────────────────────────

  it('positive scenario: logs in successfully with valid credentials and logs out', async () => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    let flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('You logged into a secure area!'),
      `Expected success message, got: "${flash}"`
    );

    let url = loginPage.page.url();
    assert.ok(url.includes('/secure'), `Expected /secure URL, got: ${url}`);

    await loginPage.logout();

    url = loginPage.page.url();
    assert.ok(url.includes('/login'), `Expected /login URL after logout, got: ${url}`);
  });

  it('negative scenario: shows an error with invalid credentials', async () => {
    await loginPage.login('wronguser', 'wrongpassword');

    const flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('Your username is invalid!') || flash.includes('Your password is invalid!'),
      `Expected login failure message, got: "${flash}"`
    );
  });
});
