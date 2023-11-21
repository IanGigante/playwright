import { test, expect, type Page } from '@playwright/test';
import { Login } from '../pages/login';
import { TestParameters, Path } from '../data/testparameters';
import { Products } from '../pages/products';

const validUsers = TestParameters.validUsers
const invalidUsers = TestParameters.invalidUsers

test.beforeEach( async({page})=>{
    await page.goto(Path.BASE_URL);
})

test.describe("Login tests for Saucedemo", ()=>{
    for (const user of validUsers){
        const username = user.username
        const password = user.password

        test(`should be able to login using ${username}`, async({page}) =>{
            const loginPage = new Login(page)
            const products = new Products(page)

            await loginPage.login(username,password)
            await products.validateProductsHeader(true)
        })
    }

    for (const user of invalidUsers){
        const username = user.username
        const password = user.password

        test(`should not be able to login using ${username}`, async({page}) =>{
            const loginPage = new Login(page)
            const products = new Products(page)

            await loginPage.login(username,password)
            await products.validateProductsHeader(false)
            await loginPage.validateErrorMessage(username)
        })
    }
})