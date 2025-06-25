import HomePage from "./HomePage.js";

export default class pomManager{
    constructor(page){
        this.page=page;
        this.homepage=new HomePage(page);
    }
}