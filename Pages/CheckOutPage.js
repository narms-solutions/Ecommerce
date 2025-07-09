

import CommonActions  from "../Utils/CommonActions.js";
import data from "./data.json"
import Navigation from "./Navigation.js";


export default class CheckOutPage extends Navigation{
    constructor(page){
        super(page,data)
        this.actions=new CommonActions(page);
        
    }
async navigate(){
        await super.navigate(this.data.checkOutPageUrl);
        await super.acceptCookies();
    }
    
    async secondStep(){
        const step2Heading=await this.actions.getStepHeading('Heading', 'Steg 2 - Leveranssätt');
        console.log(`Step 2 Levarans heading: ${step2Heading}`);
       
        }
        async thirdStep(){
            const step3Heading=await this.actions.getStepHeading('heading', 'Steg 3 - Slutför köp');
            console.log(`Third step heading in checkout page: ${step3Heading}`);
            await this.actions.fillEmailAndCode('#klarna-checkout-iframe','#billing-email','narmada.nalubolu@gmail.com', '#billing-postal_code','16256','#billing-baseWrapper', 'button', 'Fortsätt');
        }
        async finalStep(){
            await this.actions.betalakop('iframe[name="klarna-checkout-iframe"]','button','Betala köp' , 'Heading', 'Välkommen till')

        }
}