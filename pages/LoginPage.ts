import { url } from 'inspector';
import { Page, Locator } from 'playwright';
import {test , expect} from '@playwright/test'
/**
 * Page Object Model for the Login page.
 * Encapsulates all selectors and actions related to login.
 */
export class LoginPage {
  readonly page: Page;

  readonly usernameId="#username"
  readonly passwordId="#password"
  readonly loginButtonClass=".radius"

  constructor(page: Page) {
    this.page = page;

}

   async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }
   

  async login(username: string, password:string): Promise<void>{
    await this.page.locator(this.usernameId).fill(username);
    await this.page.locator(this.passwordId).fill(password);
    await this.page.locator(this.loginButtonClass).click();
  }

  async verifyHomePageIsActive(){
    await expect(this.page.getByText("Welcome to the Secure Area. When you are done click logout below.").isVisible()).toBeTruthy();
  }

   async verifyLoginPageIsActive(){
    await expect(this.page.getByText("Welcome to the Secure Area. When you are done click logout below.").isVisible()).toBeTruthy();
  }


    
  
}


