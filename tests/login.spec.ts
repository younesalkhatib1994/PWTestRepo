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

  it('should display the login form on page load', async () => {
    await loginPage.usernameInput.waitFor({ state: 'visible' });
    await loginPage.passwordInput.waitFor({ state: 'visible' });
    await loginPage.loginButton.waitFor({ state: 'visible' });

    assert.ok(
      await loginPage.usernameInput.isVisible(),
      'Username input should be visible'
    );
    assert.ok(
      await loginPage.passwordInput.isVisible(),
      'Password input should be visible'
    );
  });

  it('should log in successfully with valid credentials', async () => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    const flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('You logged into a secure area!'),
      `Expected success message, got: "${flash}"`
    );

    // Confirm we are now on the secure page
    const url = loginPage.page.url();
    assert.ok(url.includes('/secure'), `Expected /secure URL, got: ${url}`);
  });

  it('should show an error with an invalid username', async () => {
    await loginPage.login('wronguser', 'SuperSecretPassword!');

    const flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('Your username is invalid!'),
      `Expected invalid username error, got: "${flash}"`
    );
  });

  it('should show an error with an invalid password', async () => {
    await loginPage.login('tomsmith', 'wrongpassword');

    const flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('Your password is invalid!'),
      `Expected invalid password error, got: "${flash}"`
    );
  });

  it('should show an error when both fields are empty', async () => {
    await loginPage.login('', '');

    const flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('Your username is invalid!'),
      `Expected validation error, got: "${flash}"`
    );
  });

  it('should log out successfully after login', async () => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.logout();

    const flash = await loginPage.getFlashMessage();
    assert.ok(
      flash.includes('You logged out of the secure area!'),
      `Expected logout message, got: "${flash}"`
    );

    // Should be back on the login page
    const url = loginPage.page.url();
    assert.ok(url.includes('/login'), `Expected /login URL after logout, got: ${url}`);
  });
});
