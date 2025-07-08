import { Console } from "console";
import CommonActions from "../Utils/CommonActions.js"
import { expect } from "@playwright/test";

export default class searchResults{
    constructor(page){
        this.page=page;
        this.actions= new CommonActions(page);
    }
    //Navigae to the selected book page

    async naviagte(){
        await this.actions.navigate('https://www.adlibris.com/se/bok/rivstart-b1b2-textbok-tredje-upplagan-9789127466852');
        
    }

    //Accept cookies
    async acceptCookies(){
        await this.actions.getByRole('Button', 'Agree and close')
       
    }

    //Print the Ttile, author and price of the book then click on add to cart button
    async addToCart(){
        //1. Prints the title of the book
      //await this.actions.wait();
      const titleOfBook=  await this.actions.getProductTitle('Heading','Rivstart B1/B2 Textbok, tredje upplagan'); 
      console.log(`The title of the bokk is: ${titleOfBook.trim()}`);

      //2.Print all the author names and combine them using separation ,  of the book
    //   const authorsOfTheBook= await this.actions.getAuthors('.product__stand-alone-attribute--authors a span');
    //   console.log(`Authors of the book:${authorsOfTheBook.join(',')}`);

        //3.Print only the selected (either first, second, third...) author from the list
        //const selectedFirstAuthor= await this.actions.getFirstAuthor('.product__stand-alone-attribute--authors a span', 0);
        const selectedFirstAuthor= await this.actions.getFirstAuthor('link', 'Paula Levy Scherrer')
        console.log(`First author of the book:${selectedFirstAuthor}`);

         const selectedSecondAuthor= await this.actions.getFirstAuthor('link', 'Karl Lindemalm');
        console.log(`Second author of the book:${selectedSecondAuthor}`);

        const authors=[selectedFirstAuthor,selectedSecondAuthor ]
        console.log(`Authors of the book:${authors.join(',')}`);

        //4. Print the rating
        // const rating=await this.actions.getFirstAuthor('title', 'Betyg 5.0 av 5');
        // console.log(`Rating of the book:${rating}`); //output Betyg 5.0 av 5
        // // const finalRating=await rating.match(/(\d+(\.\d+)?)/)[0]; //here \d+ means gets any digit and \. means match the literal .dot and \d+ again matches one or more digits and () means combining them [0] gets the first match of the array
        // // console.log(`Rating in digits form:${finalRating}`);          
        
        //5.print the price of the book
        // const price=await this.actions.getText('.product__price');
        // console.log(`Price of the book is:${price}`);

        //Click on the button add to cart
        //
        // await this.actions.wait();
        await this.actions.getByRole('Button', 'Lägg i varukorg');
        // const addedToCart=await this.actions.getText('.notifications-bar__added-to-cart__info-text');
        // console.log(`Confirmation message as book added to cart:${addedToCart}`);

        //Navigate to till kassan
     
        //await this.actions.getText('h2.step__heading');
        // await this.actions.getFirstStepHeading('h2', 'Steg 1 - Din varukorg');

        await this.actions.getTillKassan('link','Till kassan');
       // await this.actions.wait();
        const CartStep=await this.actions.getStepHeading('heading', 'Steg 1 - Din varukorg');
        console.log(`Step 1 in the cart:${CartStep}`);
        

    }


}