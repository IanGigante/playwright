import { expect, type Locator, type Page } from '@playwright/test';

export class Header{
    
    private page:Page;
    private hamburgerMenu: Locator;
    private logout: Locator


    constructor(page:Page){
        this.page = page
        this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' })
        this.logout = page.locator("a#logout_sidebar_link")
    }

    /**
     * This function clicks the hamburger menu in the header
     */
    async clickHamburgerMenu(){
        await this.hamburgerMenu.click()
    }

    /**
     * This function clicks the logout link under the Open Menu
     */
    async clickLogout(){
        await this.logout.click()
    }

}