import HomePage from "./HomePage.js";
import searchResults from "./searchResults.js";
import CheckOutPage from "./CheckOutPage.js";
import Navigation from "./Navigation.js";


export default class pomManager{
    constructor(page, data){
        this.page=page;
        this.homepage=new HomePage(page, data);
        this.searchresults=new searchResults(page, data);
        this.checkOutPage=new CheckOutPage(page, data);
        this.navigation= new Navigation(page,data)
    }
}