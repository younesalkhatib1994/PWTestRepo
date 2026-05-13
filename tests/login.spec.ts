import { strict as assert } from 'assert';
import { BrowserHelper } from '../utils/BrowserHelper';
import { LoginPage } from '../pages/LoginPage';
import { Page } from 'playwright';
import { test } from '@playwright/test'
/**
 * Login Test Suite
 *
 * Target: https://the-internet.herokuapp.com/login
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
describe('Login Page', () => {
  const browser = new BrowserHelper();

  before(async () => {
    await browser.launch();
  });

  beforeEach(async () => {
    const page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  let loginPage: LoginPage;
  // ── Hooks ────────────────────────────────────────────────────────────────

  it("navigate to login page", async () => {
    await loginPage.verifyLoginPageIsActive();
  })


  it("Login with right credentials", async () => {

    const username = "tomsmith";
    const password = "SuperSecretPassword!";

    await loginPage.login(username, password)
    await loginPage.verifyHomePageIsActive();


  })





});
