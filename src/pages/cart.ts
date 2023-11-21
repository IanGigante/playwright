import { expect, type Locator, type Page } from '@playwright/test';

export class Cart{
    
    private page:Page;
    private checkout: Locator;


    constructor(page:Page){
        this.page = page
        this.checkout = page.locator('[data-test="checkout"]')
    }

    async clickCheckout(){
        await this.checkout.click()
    }

    /**
     * This function validates that the item is visible and the price displayed is correct
     * @param item 
     * @param price 
     */
    async validateItemInCart(item:string, price:string|null){
        await expect(this.page.getByRole('link', { name: item })).toBeVisible()
        const priceItem = this.page.locator("div.cart_item")
                 .filter({has: this.page.getByText(item)})
                 .locator("div.inventory_item_price")
        expect(await priceItem.textContent()).toBe(price)
    }



}