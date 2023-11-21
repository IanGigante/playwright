import { test, expect, type Page } from '@playwright/test';
import { Login } from '../pages/login';
import { TestParameters, Path } from '../data/testparameters';
import { Header } from '../pages/header';
import { Products } from '../pages/products';


test.describe("Logout for Saucedemo", ()=>{
    let header: Header;
    let loginPage: Login

    test.beforeEach( async({page})=>{
        loginPage = new Login(page)
        header = new Header(page)

        await page.goto(Path.BASE_URL);
        await loginPage.login(TestParameters.validUser,TestParameters.validPassword)
    })

    test('should be able logout', async({page})=>{
        await header.clickHamburgerMenu()
        await header.clickLogout()
        await loginPage.validateLoginPage()
    })
})