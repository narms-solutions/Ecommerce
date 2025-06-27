import HomePage from "./HomePage.js";
import searchResults from "./searchResults.js";

export default class pomManager{
    constructor(page){
        this.page=page;
        this.homepage=new HomePage(page);
        this.searchresults=new searchResults(page);
    }
}