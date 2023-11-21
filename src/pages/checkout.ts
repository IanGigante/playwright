import { expect, type Locator, type Page } from '@playwright/test';

export class Checkout{
    
    private page:Page;
    private firstname: Locator;
    private lastname: Locator;
    private postalCode: Locator;
    private continueBtn: Locator
    private itemTotal: Locator;
    private tax: Locator;
    private checkoutTotal: Locator;


    constructor(page:Page){
        this.page = page
        this.firstname = page.locator('[data-test="firstName"]')
        this.lastname = page.locator('[data-test="lastName"]')
        this.postalCode = page.locator('[data-test="postalCode"]')
        this.continueBtn = page.locator('[data-test="continue"]')
        this.itemTotal = page.locator('div.summary_subtotal_label')
        this.tax = page.locator('div.summary_tax_label')
        this.checkoutTotal = page.locator('div.summary_total_label')
    }

    /**
     * This function populates the Checkout Info and click continue button
     * @param firstname 
     * @param lastname 
     * @param postalCode 
     */
    async populateCheckoutInfo(firstname: string, lastname: string, postalCode: string){
        await this.firstname.fill(firstname)
        await this.lastname.fill(lastname)
        await this.postalCode.fill(postalCode)
        await this.continueBtn.click()
    }

    /**
     * This function validates that the item in checkout page is visible and the price displayed is correct
     * @param item 
     * @param price 
     */
    async validateItemInCheckout(item:string, price:string|null){
        await expect(this.page.getByRole('link', { name: item })).toBeVisible()
        const priceItem = this.page.locator("div.cart_item")
                 .filter({has: this.page.getByText(item)})
                 .locator("div.inventory_item_price")
        expect(await priceItem.textContent()).toBe(price)
    }
    
    /**
     * This function validates that the Item Total price is equal to the price of item displayed
     * @param price 
     */
    async validateItemTotal(price:any){
       await expect(price).toBe(await this.getItemTotal())
    }

    /**
     * This function validated that the checkout page contains correct Total price
     */
    async validateCheckoutTotal(){
        const itemTotal = this.extractPrice(await this.getItemTotal())
        const tax = this.extractPrice(await this.getTax())
        const checkoutTotal = parseFloat(this.extractPrice(await this.getCheckoutTotal()))

        const total = parseFloat(itemTotal) +  parseFloat(tax)
        expect(checkoutTotal).toBe(total)
    }

    /**
     * This function return the item total in the checkout page
     * @returns 
     */
    async getItemTotal(){
        return (await this.itemTotal.textContent())?.replace("Item total: ","")
    }

     /**
     * This function return the tax in the checkout page
     * @returns 
     */
    async getTax(){
        return (await this.tax.textContent())?.replace("Tax: ","")
    }

     /**
     * This function return the checkout total in the checkout page
     * @returns 
     */
    async getCheckoutTotal(){
        return (await this.checkoutTotal.textContent())?.replace("Total: ","")
    }

    /**
     * This function removes the currency '$'
     * @param price 
     * @returns 
     */
    private extractPrice(price:any){
        return price.replace('$','')
    }

}