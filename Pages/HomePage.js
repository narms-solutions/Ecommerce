import CommonActions from "../Utils/CommonActions.js"

export default class HomePage{
    constructor(page){
        this.page=page;
        this.actions=new CommonActions(page);

        
        this.cookieButton = page.locator('button:has-text("Agree and close")');
        this.searchInput = page.getByTestId('search-input-loaded');
    }
//Naviaget to adlibris home page
 async navigate(){
        await this.actions.navigate();
         //await this.page.waitForLoadState('domcontentloaded');
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
    async searchTextBook(BookTitle){
        
        await this.actions.typeTextBook('input[name="q"]', BookTitle);
        await this.actions.enter();
    
       
       
    }
}