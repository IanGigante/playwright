import { test, expect, type Page } from '@playwright/test';
import { Login } from '../pages/login';
import { TestParameters, Path } from '../data/testparameters';
import { Products } from '../pages/products';


test.describe("Add to cart for Saucedemo", ()=>{
    let products : Products;
    const singleItem = TestParameters.singleItem
    const multiItem = TestParameters.multiItem

    test.beforeEach( async({page})=>{
        const loginPage = new Login(page)
        products = new Products(page)
        await page.goto(Path.BASE_URL);
        await loginPage.login(TestParameters.validUser,TestParameters.validPassword)
    })

    test('should be able to add and remove a single item in a cart', async({page})=>{
        await products.addProduct(singleItem)
        await products.validateItemCount(1)
        await products.removeProduct(singleItem)
        await products.validateItemCount("")
    })

    test('should be able to add and remove a multiple item in a cart', async({page})=>{
        let itemCount = 0
        for(const item of multiItem){
            await products.addProduct(item)
            itemCount++
            await products.validateItemCount(itemCount)
        }
        for(const item of multiItem){
            await products.removeProduct(item)
            itemCount--
            await products.validateItemCount(itemCount)
        }
    })
})