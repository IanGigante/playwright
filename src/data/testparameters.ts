import valid = require('../data/credentials/valid-login-credentials.json') 
import invalid = require('../data/credentials/invalid-login-credentials.json')  

interface User  {
    username: string,
    password: string
}

export enum Path {
    BASE_URL = "https://www.saucedemo.com/",
    PRODUCTS_URL = `${BASE_URL}/inventory.html`
}

export class TestParameters{
     public static validUsers : User[] = valid    
     public static invalidUsers : User[] = invalid
     public static validUser = valid[0].username
     public static validPassword = valid[0].password
     public static coFirstName = "Ian"
     public static coLastName = "Gigante"
     public static postalCode = "2024"

     public static singleItem = "Sauce Labs Backpack"
     public static multiItem = ["Sauce Labs Backpack","Sauce Labs Bolt T-Shirt"]

}



