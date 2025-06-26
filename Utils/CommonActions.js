import { TIMEOUT } from "dns";

export default class CommonActions{
    constructor(page){
        this.page=page;
    }

    async navigate(){
        await this.page.goto(`https://www.adlibris.com/sv`)
    }

    async wait(){
        await this.page.pause();
    }
    async acceptCookies(){
         
        await this.page.on('dialog',async(dialog)=>{
            console.log('Diaolog message:', dialog.message());
            await dialog.accept();
        })
    }
    // async click(locator){
    //     await this.page.click(locator);
    // }

     async click(locator){
          await locator.waitFor({ state: 'visible' });
        await locator.click();
    }
    async getByRole(locator, selector){
          const acceptButton = await this.page.getByRole(locator, {name:selector});
          await acceptButton.click();
        // if (await acceptButton.isVisible()) {
            
        //     //await acceptButton.waitFor({ state: 'detached' });
        // }
    }

   
    async getByTestID(testID, text){
        if (this.page.isClosed && this.page.isClosed()) {
            throw new Error('Page is already closed!');
        }
        const element = this.page.getByTestId(testID);
        await element.waitFor({state:'visible'});
        if (text !== undefined) {
            await element.fill(text);
        } else {
            await element.click();
        }
    }
    async type(locator, text){
         if (this.page.isClosed()) throw new Error('❌ Cannot type — page is already closed!');
        if (typeof locator === 'string') {
        await this.page.getByTestId(locator).fill(text); // ✅ string selector
    } else {
        await locator.fill(text); // ✅ Locator object
    }
    }

    async waitForVisible(locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async locator(selector){
       return  await this.page.locator(selector)
    }

    async enter(){
       
        await this.page.keyboard.press('Enter');
       await this.page.waitForLoadState('domcontentloaded');
    }

    async typeTextBook(locator, text){
        await this.page.type(locator, text)
    }

    async waitForSelector(locator){
        await this.page.waitForSelector(locator, {state:'visible', timeout: 15000})
    }

    
    async getText(selector){
        const element= await this.page.locator(selector);
        //await this.page.waitForTimeout(1000);
        await element.waitFor({state:'visible',timeout:10000});
        return await element.textContent();
    }

    async getbyRoleFirstBook(locator,selector){
        const firstElement = await this.page.getByRole(locator, {name:selector}).first();
          await firstElement.click();

    }

    async gtSpecBook(BookTitle){
        const bookLink=  await this.page.getByRole('link').filter({hasText:BookTitle}).first();
        await bookLink.click();
    }


}