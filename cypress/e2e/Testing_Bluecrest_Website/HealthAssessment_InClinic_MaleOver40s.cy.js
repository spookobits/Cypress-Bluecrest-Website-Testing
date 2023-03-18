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
        
        //// //Book Now via 
        // cy.get('a[href*="/buy/package"]').contains('Book now').click({ force: true });
        // cy.wait(2000)
        
        // //Book Now force true for there is Uncaught TypeError: __insp.ws is undefined when after clicking Book Now via Package Card
        // cy.get('a[href*="/buy/package"]').contains('Book now').click({ force: true });
        // cy.wait(2000)
        
        
        
    })
})