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
        cy.get('.search-box-text custom-background-color').should('contains.text','Please find a location and date for your order:')
        cy.contains('YOUR ORDER').should('be.visible')
          .find('button[onclick="window.expandBasketButtonClickHandler(this)"]')
          .click();       
        //Your order
        cy.get('#expand-basket-button').should('contains.text', 'YOUR ORDER')
        cy.contains('TOTAL COST').should('be.visible')


         
        
        

    })
})