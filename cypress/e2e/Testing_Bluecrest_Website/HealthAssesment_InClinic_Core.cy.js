/// <reference types = "cypress"/>

context('Launch Bluecrest Website' , () =>{
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))

        //Resizing the screen to its properties
        cy.viewport(1348,979)

        //Accept pop up cookies
        cy.get('#onetrust-accept-btn-handler').click()

    })

    it('Checkout HealthChecks (In Clinic) Core as a new Customer in the main page', () =>{
        //Hover Health Checks and Click Core
        cy.get('#menu-item-660').trigger('mouseover')
        cy.get('#menu-item-669').should('contains.text','Core')
        cy.contains('Core').click()
        
        //Wait for any pop ups 
        cy.wait(5000)

        //Close any Pop ups
        cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
          .should('be.visible')
          .find('button[title="Close"]')
          .click();

        //Test Core Screen
        cy.url().should('include', '/tests/core')

        //Test Core Screen
        cy.get('.package-card-content').should('contains.text','Health MOTs')
        cy.get('.package-title').should('contain.text','Core')
        cy.get('.current-price').should('contains.text', '£179') // Current Prize £179
        cy.get('.package-detail-list').should('be.visible') // package-detail-list
        cy.log('Package detail lists include Sex and Age')
        cy.get('.separate-price').should('contain.text','£330 when bought separately');

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
          .should('contains.text','Core');
        cy.get('.order_summary_cards')
          .find('p')
          .should('contains.text','The Charmandean Centre, Forest Road');
        cy.contains('Date').should('be.visible')
        cy.contains('Time').should('be.visible')
        cy.contains('Duration').should('be.visible')
        cy.contains('Cost').should('be.visible')
        cy.get('.text-right')
          .find('span[class="total-price custom-price-color"]')
          .should('contains.text','Total £179.00');
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
        cy.contains('Order 1 - Core , at The Charmandean Centre, Forest Road').should('be.visible')
        cy.contains('About you').should('be.visible')
      
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
            .should('exist');
          //   .click();
          
          //Order Payment Screen Launch
          // cy.get('h1').should('contains.text','Order Payment')
    })

    it ('Checkout HealthChecks (In Clinic) Core as a new Customer in the health checks page via Book Now workflow', () =>{
          //Click HealthChecks
          cy.get('#menu-item-660').click()
          cy.url().should('include','/health-checks')
          cy.get('h1').should('contains.text','Private Health Checks')

          //Wait for any pop ups 
          cy.wait(3000)
        
          //Close any Pop ups
          cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
            .should('be.visible')
            .find('button[title="Close"]')
            .click();
          cy.wait(3000)

          //Book Health MOTS Core
          cy.get('.package-card-content')
              .find('span[class="tag"]')
              .should('contains.text','Health MOTs');
          cy.get('.package-card-content')
            .find('h3[class="package-title"]')
              .should('contains.text','Core');
          cy.get('.package-card-content')
            .find('span[class="current-price"]')
            .should('exist');
          cy.get('.package-card-content')
            .find('a[data-link_label="Book now"]').eq(1)
            .click();
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
            .should('contains.text','Core');
          cy.get('.order_summary_cards')
            .find('p')
            .should('contains.text','The Charmandean Centre, Forest Road');
          cy.contains('Date').should('be.visible')
          cy.contains('Time').should('be.visible')
          cy.contains('Duration').should('be.visible')
          cy.contains('Cost').should('be.visible')
          cy.get('.text-right')
            .find('span[class="total-price custom-price-color"]')
            .should('contains.text','Total £179.00');
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
          cy.contains('Order 1 - Core , at The Charmandean Centre, Forest Road').should('be.visible')
          cy.contains('About you').should('be.visible')

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
            .should('exist');
      //    .click();
            
          //Order Payment Screen Launch
          // cy.get('h1').should('contains.text','Order Payment')
    })

    it('Checkout HealthChecks (In Clinic) Core as a new Customer in the health checks page via More info Test Active workflow', () =>{
          //Click HealthChecks
          cy.get('#menu-item-660').click()
          cy.url().should('include','/health-checks')
          cy.get('h1').should('contains.text','Private Health Checks')

          //Wait for any pop ups 
          cy.wait(3000)
        
          //Close any Pop ups
          cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
            .should('be.visible')
            .find('button[title="Close"]')
            .click();
          cy.wait(3000)

          //Healt MOTS Core More Info route  
          cy.get('.package-card-content')
              .find('span[class="tag"]')
              .should('contains.text','Health MOTs');
            cy.get('.package-card-content')
              .find('h3[class="package-title"]')
              .should('contains.text','Core');
            cy.get('.package-card-content')
              .find('span[class="current-price"]')
              .should('exist');
            cy.get('.package-card-content')
              .find('a[data-link_label="More info"]').eq(1)
              .click();

            //Test Core Screen
            cy.url().should('include', '/tests/core')

            //Test Core Screen
            cy.get('.package-card-content').should('contains.text','Health MOTs')
            cy.get('.package-title').should('contain.text','Core')
            cy.get('.current-price').should('contains.text', '£179') // Current Prize £179
            cy.get('.package-detail-list').should('be.visible') // package-detail-list
            cy.log('Package detail lists include Sex and Age')
            cy.get('.separate-price').should('contain.text','£330 when bought separately');

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
              .should('contains.text','Core');
            cy.get('.order_summary_cards')
              .find('p')
              .should('contains.text','The Charmandean Centre, Forest Road');
            cy.contains('Date').should('be.visible')
            cy.contains('Time').should('be.visible')
            cy.contains('Duration').should('be.visible')
            cy.contains('Cost').should('be.visible')
            cy.get('.text-right')
              .find('span[class="total-price custom-price-color"]')
              .should('contains.text','Total £179.00');
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
            cy.contains('Order 1 - Core , at The Charmandean Centre, Forest Road').should('be.visible')
            cy.contains('About you').should('be.visible')
          
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
                .should('exist');
              //   .click();
              
              //Order Payment Screen Launch
              // cy.get('h1').should('contains.text','Order Payment')
        
    })
})
