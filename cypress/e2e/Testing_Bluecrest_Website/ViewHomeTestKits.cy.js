/// <reference types="cypress" />

context('Launch Bluecrest Website' , () =>{
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))

        //Resizing the screen to its properties
        cy.viewport(1348,979)

        //Accept pop up cookies
        cy.get('#onetrust-accept-btn-handler').click()
        
    })

    it('Can View Health Kits via home page slider' , () =>{
        cy.get('button[class="flickity-button flickity-prev-next-button next"]').click()
        cy.contains('Convenient Home Test Kits').should('exist')
        cy.contains('If you’d rather check your health from home, our range of home test kits are delivered straight to your door. From liver and kidney function to vitamin levels, find the kit you’re looking for today. You’ll also be able to view your results online via the My Wellness portal.').should('exist')
        cy.get('a[class="button read-more"]').should('exist')
        cy.contains('View Home Test Kits').click();

         //Wait for any pop ups 
        cy.wait(5000)
       
        //Close any Pop ups
        cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
          .should('be.visible')
          .find('button[title="Close"]')
          .click();

        cy.url().should('include','/home-blood-tests')
        cy.get('h1').should('contains.text','Private Home Blood Testing')
        cy.get('h3[class="package-title"]').eq(0).should('contains.text','Base Home Test Kit')
        cy.get('h3[class="package-title"]').eq(1).should('contains.text','Extra Home Test Kit')
        cy.get('h3[class="package-title"]').eq(2).should('contains.text','Total Home Test Kit')

        //Book Now Base Home Test Kit
        cy.get('a[class="btn productEntityAddToCart"]').eq(0).click()
        cy.get('h1[class="left custom-title-color"]').should('contains.text','Order Summary')
        cy.get('h5[class="custom-background-color"]').should('contains.text',' Base Home Test Kit')
        cy.contains('Home Test').should('exist')
        cy.contains('Cost').should('exist')
        cy.get('div[class="edit_remove"]').should('exist')
        cy.get('span[class="total-price custom-price-color"]').should('contains.text','Total £59.00')
        cy.get('button[id="discount-code-btn"]').should('exist')
        cy.get('button[id="discount-code-btn"]').click()
        cy.get('input[aria-label="Add discount code"]').should('exist')
        cy.get('div[aria-label="Apply discount code"]').should('exist')
        cy.get('.venue-continue-bar')
          .find('a[id="checkoutContinueButton"]')
          .should('exist')

        //Click Continue
        cy.get('.venue-continue-bar')
          .find('a[id="checkoutContinueButton"]')
          .click();

        //Personal Details Screen Loads
        cy.url().should('include','/personal/details')
        cy.get('h1').should('contains.text','Personal details')
        cy.contains('Already Registered?').should('be.visible')
        cy.contains('Save some time and Login here... if not, please continue below').should('be.visible')
        cy.contains('Order 1 - Base Home Test Kit').should('be.visible')
        cy.contains('About you').should('be.visible')

        //Continue button disabled when mandatory fields in personal details and address is not entered
        cy.PersonalDetails('1',' ','Wade','19','06','1982',"Male",'testtings@testingtest.com','testtings@testingtest.com','07123456789','Password@1','Password@1','BN112AA','3 Chesswood Road','Worthing','West Sussex','United Kingdom')
        cy.get('button[disabled="disabled"]')
          .should('exist');

        //Clear Personal and Address Textbox
        cy.get('input[id="first_name"]').clear()
        cy.get('input[id="last_name"]').clear()
        cy.get('input[name="dob-day"]').clear()
        cy.get('input[name="dob-month"]').clear()
        cy.get('input[name="dob-year"]').clear()
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email-confirm"]').clear()
        cy.get('input[name="phone_number"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password_confirm"]').clear()
        cy.get('input[name="user_postcode"]').clear()
        cy.get('input[name="user_address1"]').clear()
        cy.get('input[name="user_town"]').clear()
        cy.get('input[name="user_town"]').clear()
        cy.get('input[name="user_county"]').clear()

        //Enter PersonalDetails and Address(Title, FirstName, LastName, Day, Month, Year[DOB], emailAddress, confirm emailAddress, phone number, password, confirmPassword, PostCode, Address 1, Town, County, Country )
        cy.PersonalDetails('1','Dwayne','Wade','19','06','1982',"Male",'testtings@testingtest.com','testtings@testingtest.com','07123456789','Password@1','Password@1','BN112AA','3 Chesswood Road','Worthing','West Sussex','United Kingdom')

        //Ticks terms and Privacy checkboxes
        cy.get('.checkboxes')
          .find('input[id="terms"]')
          .click();
        cy.get('.checkboxes')
          .find('input[id="Privacy Policy"]')
          .click();
        
        //You order and total cost
        cy.get('#order-accordion')
          .find('span[class="accordion-title"]')
          .should('contains.text','YOUR ORDER');
          cy.get('#order-accordion')
          .find('div[class="accordion-title"]')
          .should('contains.text','Total cost');

        //Continue
        cy.get('.venue-continue-bar')
          .find('button[id="checkoutContinueButton"]')
          .should('be.enabled');
        //   .click();

        cy.get('input[id="first_name"]')
          .then((inputFirstName) => {
            if(inputFirstName.clear){
                cy.get('button[disabled="disabled"]')
                .should('exist');
            }
            else{
                cy.get('.venue-continue-bar')
                .find('button[id="checkoutContinueButton"]')
                .should('exist');
            }
            
          })        
    })
})