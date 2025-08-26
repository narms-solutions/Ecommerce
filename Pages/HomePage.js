import CommonActions from "../Utils/CommonActions.js"
import data from "./data.json"
import Navigation from "./Navigation.js";


export default class HomePage extends Navigation{
    constructor(page){
      super(page,data);
        this.actions=new CommonActions(page);
        
    }
    async searchTextBook(BookTitle){
       
        await this.actions.typeTextBook('input[name="q"]', BookTitle);
        await this.actions.gtSpecBook(BookTitle);
        await this.actions.waitForSelector('.search-result__product.search-result__list-view__product');
        const listOfSearchResults= await this.actions.locator('.search-result__product.search-result__list-view__product');
        const count=await listOfSearchResults.count();

        console.log(`Total serach results:${count}`)
        for(let i=0;i<count;i++){
            const BookTitle=await listOfSearchResults.nth(i).locator('.heading--searchlist-title').textContent();   //Gets each book title 
            console.log(`${i+1}.${BookTitle.trim()}`);
            }

        await this.actions.getbyRoleFirstBook('link','Rivstart B1/B2 Textbok, tredje upplagan');
       
        const priceOfBook=await this.actions.getPriceofBook('pdp-book','535 kr');
        
        console.log(`Price of the book is :${priceOfBook}`);
       
}
}