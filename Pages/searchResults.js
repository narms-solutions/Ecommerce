import CommonActions from "../Utils/CommonActions.js"

export default class searchResults{
    constructor(page){
        this.actions= new CommonActions(page);
    }

    async naviagte(){
        await this.actions.navigate()
    }
}