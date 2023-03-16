/// <reference types="cypress" />

context('Launch Bluecrest Website' , () =>{
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))

        //Resizing the screen to its properties
        cy.viewport(1348,979)

        //Accept pop up cookies
        cy.get('#onetrust-accept-btn-handler').click()
        

    })

    it('Checkout HealthChecks (In Clinic) Female Cancer Risk (Over 40s) as a new Customer in the main page', () =>{
        //Hover Health Checks and Click Active
        cy.get('#menu-item-660').trigger('mouseover')
        cy.get('#menu-item-3828').should('contains.text','Female Cancer Risk (Over 40s)')
        cy.contains('Female Cancer Risk (Over 40s)').click()
        
        // //Wait for any pop ups 
        // cy.wait(5000)
       
        // //Close any Pop ups
        // cy.get('#om-ekla71wjhnt9hjzuqta6-optin')
        //   .should('be.visible')
        //   .find('button[title="Close"]')
        //   .click();

        //Test Female Cancer Risk (Over 40s) Screen
        cy.url().should('include', 'tests/female-cancer-risk-over-40s')
        cy.get('.package-card-content').should('contains.text','Cancer Awareness')
        cy.get('.package-title').should('contain.text','Female Cancer Risk (Over 40s)')
        cy.get('.current-price').should('contains.text', '£269') // Current Prize £269
        cy.get('.package-detail-list').should('be.visible') // package-detail-list
        cy.log('Package detail lists include Sex and Age')
        cy.get('.separate-price').should('contain.text','£364 when bought separately');
        
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
          .find('button[id="screening-66226"]')
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
          .should('contains.text','Female Cancer Risk');
        cy.get('.order_summary_cards')
          .find('p')
          .should('contains.text','The Charmandean Centre, Forest Road');
        cy.contains('Date').should('be.visible')
        cy.contains('Time').should('be.visible')
        cy.contains('Duration').should('be.visible')
        cy.contains('Cost').should('be.visible')
        cy.get('.text-right')
          .find('span[class="total-price custom-price-color"]')
          .should('contains.text','Total £269.00');
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
        cy.contains('Order 1 - Female Cancer Risk , at The Charmandean Centre, Forest Road').should('be.visible')
        
        cy.contains('About you').should('be.visible')

        //Enter About you details and Address
        cy.PersonalDetails('2','Pamela','Wade','19','06','1982',"Female",'testtings@testingtest.com','testtings@testingtest.com','07123456789','Password@1','Password@1','BN112AA','3 Chesswood Road','Worthing','West Sussex','United Kingdom')

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

    it('Checkout HealthChecks (In Clinic) Female Cancer Risk (Over 40s) as a new Customer in the health checks page via View All Tests Book Now workflow',()=>{
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

        //View All tests
        cy.get('h2').should('contains.text','Health checks available')
        cy.contains('With various levels of testing and the choice between home and face-to-face health checks, you can find an option that is perfectly suited to your needs.').should('be.visible')
        cy.contains('View all tests').click()
        
        // Tests Page will load
        cy.url().should('include','/tests')
        cy.contains('Health Check Packages').should('be.visible')
        cy.get('#comparison_wrapper_27')
          .find('h2')
          .should('contains.text','Health MOTs')
        
        cy.get('#comparison_wrapper_2355')
          .find('h2')
          .should('contains.text','Home Test Kits')
        cy.get('#comparison_wrapper_28')
          .find('h2')
          .should('contains.text','Cancer Awareness')
        cy.get('#comparison_wrapper_29')
          .find('h2')
          .should('contains.text','Digestive Health')
        cy.get('#comparison_wrapper_30')
          .find('h2')
          .should('contains.text','Vitamins & Minerals')

        //Book Now Female Cancer Risk Over 40s
        cy.get('.slick-track')
          .find('h3[class="package-title"]')
          .should('contains.text','Female Cancer Risk (Over 40s)');
        cy.get('.slick-track')
          .find('span[class="current-price"]')
          .should('exist');
        cy.get('.slick-track')
          .find('a[data-link_label="Book now"]').eq(7)
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
          .find('button[id="screening-66226"]')
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
          .should('contains.text','Female Cancer Risk');
        cy.get('.order_summary_cards')
          .find('p')
          .should('contains.text','The Charmandean Centre, Forest Road');
        cy.contains('Date').should('be.visible')
        cy.contains('Time').should('be.visible')
        cy.contains('Duration').should('be.visible')
        cy.contains('Cost').should('be.visible')
        cy.get('.text-right')
          .find('span[class="total-price custom-price-color"]')
          .should('contains.text','Total £269.00');
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
        cy.contains('Order 1 - Female Cancer Risk , at The Charmandean Centre, Forest Road').should('be.visible')
        
        cy.contains('About you').should('be.visible')

        //Enter About you details and Address
        cy.PersonalDetails('2','Pamela','Wade','19','06','1982',"Female",'testtings@testingtest.com','testtings@testingtest.com','07123456789','Password@1','Password@1','BN112AA','3 Chesswood Road','Worthing','West Sussex','United Kingdom')

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

    it('Checkout HealthChecks (In Clinic) Active as a new Customer in the health checks page via More info Test Active workflow', () =>{
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
        //Healt MOTS Complete More Info route 
        cy.get('.package-card-content')
          .find('span[class="tag"]')
          .should('contains.text','Health MOTs');
        cy.get('.package-card-content')
          .find('h3[class="package-title"]')
          .should('contains.text','Complete');
        cy.get('.package-card-content')
          .find('span[class="current-price"]')
          .should('exist');
        cy.get('.package-card-content')
          .find('a[data-link_label="More info"]').eq(2)
          .click();

        //Test Complete Screen
        cy.url().should('include', '/tests/complete')
        cy.get('.package-card-content').should('contains.text','Health MOTs')
        cy.get('.package-title').should('contain.text','Complete')
        cy.get('.current-price').should('contains.text', '£279') // Current Prize £279
        cy.get('.package-detail-list').should('be.visible') // package-detail-list
        cy.log('Package detail lists include Sex and Age')
        cy.get('.separate-price').should('contain.text','£430 when bought separately');
        
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
          .should('contains.text','Complete');
        cy.get('.order_summary_cards')
          .find('p')
          .should('contains.text','The Charmandean Centre, Forest Road');
        cy.contains('Date').should('be.visible')
        cy.contains('Time').should('be.visible')
        cy.contains('Duration').should('be.visible')
        cy.contains('Cost').should('be.visible')
        cy.get('.text-right')
          .find('span[class="total-price custom-price-color"]')
          .should('contains.text','Total £279.00');
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
        cy.contains('Order 1 - Complete , at The Charmandean Centre, Forest Road').should('be.visible')
        
        cy.contains('About you').should('be.visible')

        //Enter About you details and Address
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