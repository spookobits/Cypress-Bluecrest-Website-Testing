/// <reference types="cypress" />

context('Launch Bluecrest Website' , () =>{
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))

        //Resizing the screen to its properties
        cy.viewport(1348,979)

        //Accept pop up cookies
        cy.get('#onetrust-accept-btn-handler').click()
        

    })

    it('Hover HealthChecks (In Clinic) Active and Checkeout as a new Customer', () =>{
        //Hover Health Checks
        cy.get('#menu-item-660').trigger('mouseover')
        cy.get('#menu-item-662').should('contains.text','Active')
        cy.contains('Active').click()
        
        //Wait for any pop ups 
        cy.wait(5000)
       
        //Close any Pop ups
        cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
          .should('be.visible')
          .find('button[title="Close"]')
          .click();

        cy.url().should('include', '/tests/active') //Test Active Screen

        cy.get('.package-card-content').should('contains.text','Health MOTs')
        cy.get('.package-title').should('contain.text','Active')
        cy.get('.current-price').should('contains.text', '£149') // Current Prize £149


        cy.get('.package-detail-list').should('be.visible') // package-detail-list
        cy.log('Package detail lists include Sex and Age')
        cy.get('.separate-price').should('contain.text','£290 when bought separately');
        
        //Book Now
        cy.get('a[href*="/buy/package"]').contains('Book now').click({ force: true });
        cy.wait(2000)
        
        // New Page will load
        cy.get('h1').should('contains.text','Choose a venue')
        cy.contains('Please find a location and date for your order:').should('be.visible')

        //Find a location
        cy.get('.venue-search-box')
          .find('input[id="address-search"]')
          .click()
          .type('BN112AA');
        cy.get('.venue-search-box')
          .find('input[id="address-search-btn"]')
          .should('be.visible')
          .click();
          //Wait until Venue will load
          cy.wait(3000)
        
        //Your order  
        cy.get('.venue-map-col')
          .find('span[class="accordion-title"]')
          .should('contains.text','YOUR ORDER')

        cy.get('.venue-map-col')
          .find('div[id="accordion-close-container"]')
          .click();       
        
        cy.get('#expand-basket-button').should('contains.text', 'YOUR ORDER')
        cy.get('#collapseOne').should('contains.text','Total cost')

        //Select a venue
        cy.get('#venue-list')
          .find('button[id="venue-303"]')
          .click();
        // Wait untit available dates will load  
          cy.wait(2000)

        //Select a Date
        cy.get('#venue-303-screenings')
          .find('button[id="screening-70097"]')
          .click();

        //Select available times
        cy.get('#venue-303-appointments')
          .find('div[class="time_cards_holder time"]')
          .eq(0)
          .click();

        cy.get('#venue-303-reservation').should('contains.text',"If you are happy with your location, date and time, then please 'Confirm' to continue")

        //Click Confirm
        cy.get('#venue-303-reservation')
          .find('button[data-link_label="Continue"]')
          .click();
        
        //Order Summary will load
        cy.get('h1').should('contains.text','Order Summary')
        
        //Order Summary
        cy.get('.order_summary_cards')
          .find('h5[class="custom-background-color"]')
          .should('contains.text','Active Package');
        cy.get('.order_summary_cards')
          .find('p')
          .should('contains.text','The Charmandean Centre, Forest Road');
        cy.contains('Date').should('be.visible')
        cy.contains('Time').should('be.visible')
        cy.contains('Duration').should('be.visible')
        cy.contains('Cost').should('be.visible')
        cy.get('.text-right')
          .find('span[class="total-price custom-price-color"]')
          .should('contains.text','Total £149.00');
        cy.get('.text-right')
          .find('button[id="discount-code-btn"]')
          .should('contains.text','Got a discount code?');
        
        //Click Got a discount code
        cy.get('.text-right')
          .find('button[id="discount-code-btn"]')
          .click();
        cy.get('#discount-code-field')
          .find('input[name="offer_code"]')
          .should('exist');  
        cy.get('#discount-code-field')
          .find('button[class="btn btn-outline-secondary"]')
          .should('contains.text','Apply'); 
        
        //Click Continue
        cy.get('.venue-continue-bar')
          .find('a[id="checkoutContinueButton"]')
          .click();
        
        //Personal Details Loads
        cy.get('h1').should('contains.text','Personal details')
        cy.contains('Already Registered?').should('be.visible')
        cy.contains('Save some time and Login here... if not, please continue below').should('be.visible')
        cy.contains('Order 1 - Active Package , at The Charmandean Centre, Forest Road').should('be.visible')
        // cy.get('.container checkoutStep')
        //   .find('p[class="personal-details-order-info"]')
        //   .should('contains.text','Order 1 - Active Package , at The Charmandean Centre, Forest Road');
        
        cy.contains('About you').should('be.visible')
        //Enter About you details
        cy.get('.personal-details')
          .find('select[id="title"]')
          .select("1")
          .should('contains.text','Mr');
        cy.get('.personal-details')
          .find('input[id="first_name"]')
          .click()
          .type('Dwayne');
        cy.get('.personal-details')
          .find('input[id="last_name"]')
          .click()
          .type('Wade');
        cy.get('.personal-details')
          .find('input[name="dob-day"]')
          .click()
          .type('19');
        cy.get('.personal-details')
          .find('input[name="dob-month"]')
          .click()
          .type('06');
        cy.get('.personal-details')
          .find('input[name="dob-year"]')
          .click()
          .type('1982');
        cy.get('.personal-details')
          .find('select[name="sex"]')
          .select("Male")
          .should('contains.text','Male');
        cy.get('.personal-details')
          .find('input[name="email"]')
          .click()
          .type('testtings@testingtest.com');
        cy.get('.personal-details')
          .find('input[name="email-confirm"]')
          .click()
          .type('testtings@testingtest.com');
        cy.get('.personal-details')
          .find('input[name="phone_number"]')
          .click()
          .type('07123456789');
        cy.get('.personal-details')
          .find('input[name="password"]')
          .click()
          .type('Password@1');
        cy.get('.personal-details')
          .find('input[name="password_confirm"]')
          .click()
          .type('Password@1');
        
        cy.contains('Your address').should('be.visible')
        //Enter Your Address
        cy.get('.personal-details')
          .find('input[name="user_postcode"]')
          .click()
          .type('BN112AA');
        cy.get('.personal-details')
          .find('input[name="user_address1"]')
          .click()
          .type('3 Chesswood Road');
        cy.get('.personal-details')
          .find('input[name="user_town"]')
          .click()
          .type('Worthing');
        cy.get('.personal-details')
          .find('input[name="user_county"]')
          .click()
          .type('West Sussex');
        cy.get('.personal-details')
          .find('select[name="user_country"]')
          .select("United Kingdom")
          .should('contains.text','United Kingdom');

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
          .should('exist');
        //   .click();
        
        //Order Payment Screen Launch
        // cy.get('h1').should('contains.text','Order Payment')


         
        
        

    })
})