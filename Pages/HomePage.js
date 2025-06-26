import CommonActions from "../Utils/CommonActions.js"
import {expect} from '@playwright/test'
export default class HomePage{
    constructor(page){
        this.page=page;
        this.actions=new CommonActions(page);

        
        this.cookieButton = page.locator('button:has-text("Agree and close")');
        this.searchInput = page.getByTestId('search-input-loaded');
    }
//Naviage to adlibris home page
 async navigate(){
        await this.actions.navigate();
        await this.page.waitForLoadState('domcontentloaded');
        //await this.actions.wait();
    }

    //Accept cookies on adlibris homepage
     async acceptCookies() {
        await this.actions.getByRole('Button', 'Agree and close')
        // if (await this.cookieButton.isVisible()) {
        //     await this.actions.click(this.cookieButton);
        //     // await this.cookieButton.waitFor({ state: 'detached' });
        // }
    }

    //Search for particular text book
    async searchTextBook(BookTitle){

        await this.actions.typeTextBook('input[name="q"]', BookTitle);
       
      await this.actions.gtSpecBook('rivstart b1 b2');
        await this.actions.waitForSelector('.search-result__product.search-result__list-view__product');
        const listOfSearchResults= await this.actions.locator('.search-result__product.search-result__list-view__product');
        const count=await listOfSearchResults.count();
        console.log(`Total serach results:${count}`)
        for(let i=0;i<count;i++){
            const BookTitle=await listOfSearchResults.nth(i).locator('.heading--searchlist-title').textContent();   //Gets each book title 
            console.log(`${i+1}.${BookTitle.trim()}`);
            }

        await this.actions.getbyRoleFirstBook('link','Rivstart B1/B2 Textbok, tredje upplagan');
       
        const priceOfBook=await this.actions.getText('.product__price__amount')
        console.log(`Price of the book is :${priceOfBook}`);
       // await expect(this.page).toHaveURL('https://www.adlibris.com/se/bok/rivstart-b1b2-textbok-tredje-upplagan-9789127466852');
}
}