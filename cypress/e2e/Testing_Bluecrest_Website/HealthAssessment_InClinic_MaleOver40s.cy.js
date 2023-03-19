/// <reference types="cypress" />

context('Launch Bluecrest Website' , () =>{
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))

        //Resizing the screen to its properties
        cy.viewport(1348,979)

        //Accept pop up cookies
        cy.get('#onetrust-accept-btn-handler').click()
        
    })

    it('Checkout HealthChecks (In Clinic) Male Cancer Risk (Over 40s) as a new Customer in the main page', () =>{
        //Hover Health Checks and Click Active
        cy.get('#menu-item-660').trigger('mouseover')
        cy.get('#menu-item-3829').should('contains.text','Male Cancer Risk (Over 40s)')
        cy.contains('Male Cancer Risk (Over 40s)').click()
        
        // //Wait for any pop ups 
        // cy.wait(5000)
       
        // //Close any Pop ups
        // cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
        //   .should('be.visible')
        //   .find('button[title="Close"]')
        //   .click();

        //Test Female Cancer Risk (Over 40s) Screen
        cy.url().should('include', 'tests/male-cancer-risk-over-40s')
        cy.get('.package-card-content').should('contains.text','Cancer Awareness')
        cy.get('.package-title').should('contain.text','Male Cancer Risk (Over 40s)')
        cy.get('.current-price').should('contains.text', '£249') // Current Prize £249
        // package-detail-list
        cy.get('.package-card-content')
          .find('div[class="tooltip"]').should('contain.text','Sex');
        cy.get('.package-card-content')
          .find('span[class="detail-value"]').should('contains.text','Male');
        cy.get('.package-card-content')
          .find('span[class="detail"]').should('contain.text','Age');
        cy.get('.package-card-content')
          .find('span[class="detail-value"]').should('contains.text','40-79'); 
        //Hover the tooltip  
        cy.get('div[class="tooltip"]').eq(0)
          .realHover()
          .should('contains.text','This package is only suitable for men');
        cy.get('.separate-price').should('contain.text','£329 when bought separately')

        //Package Banner
        cy.get('.package-cta-banner')
          .find('h3')
          .should('contains.text','Male Cancer Risk (Over 40s');
        cy.get('.package-cta-banner')
          .find('p[class="package-stats"]')
          .should('contain.text','37 Blood Readings - 1 Clinician Check - 2 Sample tests - GP Consultation & 24/7 GP Helpline');
        cy.get('.package-cta-banner')
          .find('span[class="current-price"]')
          .should('contains.text','£249');
        
        //Book Now via Package Banner
        cy.get('.package-cta-banner')
          .find('a[data-link_label="Book now"]').contains('Book now').click();
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
          .find('button[id="screening-70091"]')
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
          .should('contains.text','Male Cancer Risk');
        cy.get('.order_summary_cards')
          .find('p')
          .should('contains.text','The Charmandean Centre, Forest Road');
        cy.contains('Date').should('be.visible')
        cy.contains('Time').should('be.visible')
        cy.contains('Duration').should('be.visible')
        cy.contains('Cost').should('be.visible')
        cy.get('.text-right')
          .find('span[class="total-price custom-price-color"]')
          .should('contains.text','Total £249.00');
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
        cy.contains('Order 1 - Male Cancer Risk , at The Charmandean Centre, Forest Road').should('be.visible')
        
        cy.contains('About you').should('be.visible')

        //Continue button disabled when mandatory fields in personal details and address is not entered
        cy.PersonalDetails('1',' ','Wade','19','06','1982',"Male",'testtings@testingtest.com','testtings@testingtest.com','07123456789','Password@1','Password@1','BN112AA','3 Chesswood Road','Worthing','West Sussex','United Kingdom')
        cy.get('button[disabled="disabled"]')
          .should('exist');

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
        
        //Order Payment Screen Launch
        // cy.get('h1').should('contains.text','Order Payment')
        
        //// //Book Now via 
        // cy.get('a[href*="/buy/package"]').contains('Book now').click({ force: true });
        // cy.wait(2000)
        
        // //Book Now force true for there is Uncaught TypeError: __insp.ws is undefined when after clicking Book Now via Package Card
        // cy.get('a[href*="/buy/package"]').contains('Book now').click({ force: true });
        // cy.wait(2000)
        
        
        
    })
})