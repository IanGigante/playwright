import { expect, type Locator, type Page } from '@playwright/test';

export class Login{
    
    private page:Page;
    private username: Locator;
    private password: Locator;
    private loginBtn: Locator;
    private errMsg: Locator;


    constructor(page:Page){
        this.page = page
        this.username = page.locator('[data-test="username"]')
        this.password = page.locator('[data-test="password"]')
        this.loginBtn = page.locator('[data-test="login-button"]')
        this.errMsg =  page.locator('[data-test="error"]')
    }

    /**
     * This function performs login
     * @param username 
     * @param password 
     */
    async login(username: string, password: string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }

    /**
     * This function validates that an error message is displayed in the login page
     * @param user 
     */
    async validateErrorMessage(user:string){
        await expect(this.errMsg).toBeVisible()
        if(user === "locked_out_user"){
            await expect(this.errMsg).toHaveText("Epic sadface: Sorry, this user has been locked out.")
        }
    }
}