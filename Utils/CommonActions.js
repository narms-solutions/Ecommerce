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
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
            //await acceptButton.waitFor({ state: 'detached' });
        }
    }

    /**
     * Interacts with an element by test id. If text is provided, fills it; otherwise, clicks.
     * @param {string} testID - The data-testid value of the element.
     * @param {string} [text] - Optional text to fill into the element.
     */
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
    }

    async typeTextBook(locator, text){
        await this.page.type(locator, text)
    }
}