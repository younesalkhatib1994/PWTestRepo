import { Page, Locator } from 'playwright';

/**
 * Page Object Model for the Login page.
 * Encapsulates all selectors and actions related to login.
 */
export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly logoutButton: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // https://the-internet.herokuapp.com/login — a free, stable public demo site
    this.usernameInput  = page.locator('#username');
    this.passwordInput  = page.locator('#password');
    this.loginButton    = page.locator('button[type="submit"]');
    this.errorMessage   = page.locator('#flash.error');
    this.logoutButton   = page.locator('a.button[href="/logout"]');
    this.welcomeMessage = page.locator('#flash.success');
  }

  /** Navigate to the login page */
  async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  /** Fill credentials and click login */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Returns trimmed text of the flash message (success or error) */
  async getFlashMessage(): Promise<string> {
    const flash = this.page.locator('#flash');
    await flash.waitFor({ state: 'visible' });
    const text = await flash.innerText();
    // Strip the × close button character
    return text.replace('×', '').trim();
  }

  /** Perform logout */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
