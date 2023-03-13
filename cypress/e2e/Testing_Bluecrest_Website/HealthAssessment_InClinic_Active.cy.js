/// <reference types="cypress" />

context('Launch Bluecrest Website' , () =>{
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
        //Accept pop up cookies
        cy.get('#onetrust-accept-btn-handler').click()
        //Resizing the screen to its properties
        cy.viewport(1348,979)

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

        cy.contains('Health MOTs').should('be.visible')
        cy.get('h3').should('contain.text','Active')
        cy.contains('.current-price').should('contains.text', '£149') // Current Prize £149


        cy.contains('.package-detail-list').should('be.visible')
        cy.log('Package detail lists include Sex and Age')
        //hover Sex tooltip
        cy.get('.tooltip').trigger('mouseover').invoke('show')
        cy.contains('This package is suitable for both men and women')
        cy.contains('.separate-price').should('contain.text','£290 when bought separately');
        
         
        
        

    })
})