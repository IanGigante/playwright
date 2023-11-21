import { expect, type Locator, type Page } from '@playwright/test';
import { Path } from '../data/testparameters';

export class Products{
    
    private page:Page;
    private productsHeader: Locator;
    private shoppingCart: Locator;


    constructor(page:Page){
        this.page = page
        this.productsHeader = page.getByText('Products')
        this.shoppingCart = page.locator("a.shopping_cart_link")
    }

    /**
     * This function clicks the shopping cart icon
     */
    async clickShoppingCart(){
        await this.shoppingCart.click()
    }

    /**
     * This function adds item in the cart and validate that the transition of Add to Cart Button is correct
     * @param product 
     * @returns 
     */
    async addProduct(product:string) : Promise<string | null> {
        const item = this.page.locator("div.inventory_item_description").filter({has: this.page.getByText(product)})
        const addItem = item.getByRole('button', { name: 'Add to cart' })
        const itemPrice = item.locator("div.inventory_item_price")

        await expect(addItem).toBeVisible()
        await addItem.click()
        await expect(addItem).not.toBeVisible()

        return await itemPrice.textContent()
    }

    /**
     * This function removes item in the cart and validate that the transition of Remove Button is correct
     * @param product 
     * @returns 
     */
    async removeProduct(product:string){
        const removeItem = this.page.locator("div.inventory_item_description")
                 .filter({has: this.page.getByText(product)})
                 .getByRole('button', { name: 'Remove' })
        
        await expect(removeItem).toBeVisible()
        await removeItem.click()
        await expect(removeItem).not.toBeVisible()
    }

    /**
     * This function validates that the shopping cart icon contains correct number of item/s
     * @param count 
     */
    async validateItemCount(count:number|string){
        const itemCount = await this.shoppingCart.textContent()
        expect(itemCount).toBe(typeof count === "number"?
                count !=0?String(count):"":count)
    }   

    /**
     * This validates that the Products header is displayed
     * @param isExist 
     */
    async validateProductsHeader(isExist:boolean){
        isExist?
            await expect(this.productsHeader).toBeVisible() :
            await expect(this.productsHeader).not.toBeVisible()
    }

    /**
     * This validates that the Products URL is correct
     * @param isExist 
     */
    async validateProductsURL(isExist:boolean){
        isExist?
            await expect(this.page.url).toBe(Path.PRODUCTS_URL) :
            await expect(this.page.url).not.toBe(Path.PRODUCTS_URL)
    }
}