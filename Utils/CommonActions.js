

export default class CommonActions{
    constructor(page){
        this.page=page;
    }

    async navigate(Url){
        await this.page.goto(Url)
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
            
        //     await acceptButton.waitFor({ state: 'detached' });
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

    async waitForLoadState(){
       
       
       await this.page.waitForLoadState('domcontentloaded');
    }

    async typeTextBook(locator, text){
        await this.page.type(locator, text)
    }

    async waitForSelector(locator){
        await this.page.waitForSelector(locator, {state:'visible', timeout: 15000})
    }

    
    async getText( selector){
         //await this.page.waitFor(locator);
       // const element= await this.page.locator(selector).textContent();
        const price= await this.page.locator(selector);
        await this.page.waitForTimeout(1000);
       return price.textContent();
    //    await this.page.waitForTimeout(1000);
    //    // await element.waitFor({state:'visible',timeout:10000});
    //     return await element.textContent();
    }

    async getbyRoleFirstBook(locator,selector){
        const firstElement = await this.page.getByRole(locator, {name:selector}).first();
          await firstElement.click();

    }

    async gtSpecBook(BookTitle){
        const bookLink=  await this.page.getByRole('link').filter({hasText:BookTitle}).first();
        await bookLink.click(); 
    }

    async getAuthors(selector){
       const authors= await this.page.locator(selector).allTextContents();
       return authors;
    }
    async getFirstAuthor(locator, title){
 
       // const firstAuthor= await this.page.locator(selector).nth(index);
      const firstAuthor= await this.page.getByRole(locator,{name:title});
         return firstAuthor.textContent();
    }

    async getRating(locator){
       // return await this.page.locator(selector).getAttribute(attribute);
       const betyg= await this.page.getByText(locator);
    }

  

    async getTillKassan(selector,ButtonTitle){
        const buttonLink= await this.page.getByRole(selector, { name: ButtonTitle }); //.nth(index);
        await buttonLink.click();
    }
    async getStepHeading(selector, text){
      const firstStep= await this.page.getByRole(selector, {name:text});
      return await firstStep.textContent();
    }
    async fillPostalCode(selector1,selector2, locator,Name, code, selector3){
       
        await this.page.locator(selector1).contentFrame().locator(selector2).click();
        await this.page.locator(selector1).contentFrame().getByRole(locator, { name: Name }).fill(code);
        // await this.page.locator(selector1).contentFrame().locator(selector3).click();
        //await postalCode.fill(code);
    }

     async fillEmailAndCode(selector, locator, Email, element, postalcode,selector1 ,buttonRole, ButtonName){
         await this.page.locator(selector).contentFrame().locator(locator).fill(Email);
         await this.page.locator(selector).contentFrame().locator(element).fill(postalcode);
         const deliveryButton= await this.page.locator(selector).contentFrame().locator(selector1).getByRole(buttonRole,{name:ButtonName});
         await deliveryButton.waitFor({ state: 'visible', timeout: 10000 });
         await deliveryButton.click();
     }
     async betalakop(selector, buttonRole,ButtonName, klarnaHeading,KlarnaTitle){
         
        const payButton= await this.page.locator(selector).contentFrame().getByRole(buttonRole, { name: ButtonName});
         //await payButton.waitFor({ state: 'visible', timeout: 10000 });
         //const page1Promise = this.page.waitForEvent('popup');
         await payButton.click();
        //   const page1 = await page1Promise;
        //  const klarnaPopup=  await page1.getByRole(klarnaHeading, { name: KlarnaTitle})
          
         //await klarnaPopup.waitFor({ state: 'visible', timeout: 50000 });
        //  const title=await klarnaPopup.textContent();
        //  console.log(`Title of the klarna page:${title}`);
 
     }

    async getPriceofBook(locator,text){
       //const priceElement= await this.page.getByTestId(locator).getByText(text);
     return await this.page.getByTestId(locator).getByText(text).textContent();
      // await priceElement.waitFor({ state: 'visible' });
      // return  priceElement.textContent();

    }          
    
    async getProductTitle(locator, title){
        return await this.page.getByRole(locator, {name:title}).textContent();
    }

    async getRating(selector,rate){
    
        const ratingHandles = await this.page.locator(selector).elementHandles();
        let ratingText;
        for (const handle of ratingHandles) {
        const text = await handle.evaluate(node => node.textContent);
        if (text && text.includes(rate)) {
        ratingText = text;
        break;
    }
}
    console.log('Raw rating text:', ratingText);
   
    if(ratingText){
        const match = ratingText.match(/(\d+(\.\d+)?)/);
        if(match){
            
        const finalRating = match[0];
        console.log(`Rating in digits form: ${finalRating}`);
    } else {
        console.log('No numeric rating found in:', ratingText);
    }
} 
    else 
    {
    console.log('No rating element found.');
    }
}


async getPriceOfBook(selector){
    const rawPrice=await this.page.locator(selector).textContent();
    console.log('Raw price text:', rawPrice);
    const priceMatch=rawPrice.match(/(\d+(\.\d+)?)/);
    if(priceMatch){
        const price=priceMatch[0];
        console.log(`Book price: ${price} `);
    }
    else{
        console.log('Could not find exact price.')
    }
}

}

