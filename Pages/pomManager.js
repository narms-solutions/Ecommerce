import HomePage from "./HomePage.js";
import searchResults from "./searchResults.js";
import CheckOutPage from "./CheckOutPage.js";

export default class pomManager{
    constructor(page){
        this.page=page;
        this.homepage=new HomePage(page);
        this.searchresults=new searchResults(page);
        this.checkOutPage=new CheckOutPage(page);
    }
}