import CommonActions from "../Utils/CommonActions.js";

export default class Navigation{
    constructor(page, data){
        this.page=page;
        this.data=data;
        this.actions=new CommonActions(page);
    }

    async navigate(url){
        await this.actions.navigate(url);

}
    async acceptCookies(){
    await this.actions.getByRole('Button', 'Agree and close');
    

}
}