
import CommonActions from "../Utils/CommonActions.js"
import data from "./data.json"
import Navigation from "./Navigation.js";   

export default class searchResults extends Navigation{
    constructor(page){
        super(page, data)
        this.actions= new CommonActions(page);
    }

   
    //Print the Ttile, author and price of the book then click on add to cart button
    async addToCart(){

        //1. Prints the title of the book
        const titleOfBook=  await this.actions.getProductTitle('Heading','Rivstart B1/B2 Textbok, tredje upplagan'); 
        console.log(`The title of the bokk is: ${titleOfBook.trim()}`);

        //2.Print only the selected (either first, second, third...) author from the list
       
        const selectedFirstAuthor= await this.actions.getFirstAuthor('link', 'Paula Levy Scherrer')
        console.log(`First author of the book:${selectedFirstAuthor}`);

        const selectedSecondAuthor= await this.actions.getFirstAuthor('link', 'Karl Lindemalm');
        console.log(`Second author of the book:${selectedSecondAuthor}`);

        const authors=[selectedFirstAuthor,selectedSecondAuthor ]
        console.log(`Authors of the book:${authors.join(',')}`);

        //3. Print the rating
         await this.actions.getRating('span.sr-only','Betyg');
            
        
        //4.print the price of the book
        await this.actions.getPriceOfBook('div.text-content-sale.text-xl.font-bold.leading-\\[1\\]');
        
        //5.Click on the button add to cart
        
        await this.actions.getByRole('Button', 'Lägg i varukorg');
        

        //6.Navigate to till kassan
        await this.actions.getByRole('link','Till kassan')
       
        const firstStage=await this.actions.getStepHeading('heading','Steg 1 - Din varukorg');
        console.log(`Fist satge of the checkOut page:${firstStage}`)

        //get the second step title
        const step2Heading=await this.actions.getStepHeading('Heading', 'Steg 2 - Leveranssätt');
        console.log(`Step 2 Levarans heading: ${step2Heading}`);
       //get third stage title and fill the address
    
        const step3Heading=await this.actions.getStepHeading('heading', 'Steg 3 - Slutför köp');
            console.log(`Third step heading in checkout page: ${step3Heading}`);
            await this.actions.fillEmailAndCode('#klarna-checkout-iframe','#billing-email',data.email, '#billing-postal_code', data.postalCode,'#billing-baseWrapper', 'button', 'Fortsätt');
        

            await this.actions.betalakop('iframe[name="klarna-checkout-iframe"]','button','Betala köp' , 'Heading', 'Välkommen till')

    
      
    }


}