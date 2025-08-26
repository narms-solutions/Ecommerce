import{test, expect} from '@playwright/test'
import pomManager  from "../Pages/pomManager.js";
import data from "../Pages/data.json";

let pm;

test.describe('Add the book into the cart', ()=>{
    test.beforeEach('Navigate tot he homepage', async({page})=>{
        pm=new pomManager(page, data);
    })
    test.afterEach('close the browser', async({page})=>{
        await page.close();
    })

    test('Navigate to Adlibris home page and handle cookies', async()=>{
        
        await pm.navigation.navigate(data.HomePageUrl);
        await pm.navigation.acceptCookies();
        await pm.homepage.searchTextBook(data.searchBook);
    })

    test('Add the selected book into cart', async()=>{
         await pm.navigation.navigate(data.SearchPageUrl);
        await pm.navigation.acceptCookies();
        await pm.searchresults.addToCart();
        
    })
   
   

})