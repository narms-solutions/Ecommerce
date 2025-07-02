
import { constants } from "buffer";
import CommonActions  from "../Utils/CommonActions.js";

export default class CheckOutPage{
    constructor(page){
        this.actions=new CommonActions(page);
    }
    

    async navigate(){
        await this.actions.navigate('https://www.adlibris.com/se/check-out/140aa862-c158-4097-a5d2-49555bf9457d');
    }
    async acceptCookies(){
          await this.actions.getByRole('Button', 'Agree and close');
        
    }
    async secondStep(){
        const step2Heading=await this.actions.getStepHeading('Heading', 'Steg 2 - Leveranssätt');
        console.log(`Step 2 Levarans heading: ${step2Heading}`);
       //await this.actions.wait();
        await this.actions.fillPostalCode('[data-test="iframe-checkout"]','#inline-postalcode-input','textbox',  'Postnummer',  '16289',);
        }
        async thirdStep(){
            const step3Heading=await this.actions.getStepHeading('heading', 'Steg 3 - Slutför köp');
            console.log(`Third step heading in checkout page: ${step3Heading}`);
            //await this.actions.wait();
            await this.actions.fillEmailAndCode('#klarna-checkout-iframe','#billing-email','narmada.nalubolu@gmail.com', '#billing-postal_code','16256','#billing-baseWrapper', 'button', 'Fortsätt');
        }
        async finalStep(){
            await this.actions.betalakop('iframe[name="klarna-checkout-iframe"]','button','Betala köp' , 'Heading', 'Välkommen till')

        }

   

}