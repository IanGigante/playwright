import { test, expect, type Page } from '@playwright/test';
import { Login } from '../pages/login';
import { TestParameters, Path } from '../data/testparameters';
import { Products } from '../pages/products';
import { Cart } from '../pages/cart';
import { Checkout } from '../pages/checkout';

test.describe("Add to cart for Saucedemo", ()=>{
    let products : Products;
    let cart : Cart;
    let checkout : Checkout;

    const singleItem = TestParameters.singleItem
    const multiItem = TestParameters.multiItem

    test.beforeEach( async({page})=>{
        const loginPage = new Login(page)
        products = new Products(page)
        cart = new Cart(page)
        checkout = new Checkout(page)

        await page.goto(Path.BASE_URL);
        await loginPage.login(TestParameters.validUser,TestParameters.validPassword)
    })

    test('should be able to checkout a single item in a cart', async({page})=>{
        const itemPrice = await products.addProduct(singleItem)
        await products.clickShoppingCart()
        await cart.validateItemInCart(singleItem,itemPrice)
        await cart.clickCheckout()
        await checkout.populateCheckoutInfo(TestParameters.coFirstName,TestParameters.coLastName,TestParameters.coLastName)
        await checkout.validateItemInCheckout(singleItem,itemPrice)
        await checkout.validateItemTotal(itemPrice)
        await checkout.validateCheckoutTotal()
    })
})