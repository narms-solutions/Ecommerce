import{test, expect} from '@playwright/test'
import pomManager  from "../Pages/pomManager.js";

let pm;

test.describe('Add the book into the cart', ()=>{
    test.beforeEach('Navigate tot he homepage', async({page})=>{
        pm=new pomManager(page);
    })
    test.afterEach('close the browser', async({page})=>{
        await page.close();
    })

    test('Navigate to Adlibris home page and handle cookies', async()=>{
        await pm.homepage.navigate();
        await pm.homepage.acceptCookies();
        await pm.homepage.searchTextBook('rivstart b1 b2');
    })

    test('Add the selected book into cart', async()=>{
        await pm.searchresults.naviagte();
        await pm.searchresults.acceptCookies();
        await pm.searchresults.addToCart();
        
    })
    test('Checkout page', async()=>{
        await pm.checkOutPage.navigate();
        await pm.checkOutPage.acceptCookies();
        await pm.checkOutPage.secondStep();
        await pm.checkOutPage.thirdStep();
       // await pm.checkOutPage.finalStep();
    })
   

})