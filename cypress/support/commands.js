// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('PersonalDetails', (title, FirstName, LastName, DD, MM, YYYY, Sex, emailAddress, confirmEmailAddress, phoneNumber, password, confirmPassword, postcode, address1, Town, county, Country) =>{
     //Enter About you details
     cy.get('.personal-details')
       .find('select[id="title"]')
       .select(title);
     cy.get('.personal-details')
       .find('input[id="first_name"]')
       .click()
       .type(FirstName);
     cy.get('.personal-details')
       .find('input[id="last_name"]')
       .click()
       .type(LastName);
     cy.get('.personal-details')
       .find('input[name="dob-day"]')
       .click()
       .type(DD);
     cy.get('.personal-details')
       .find('input[name="dob-month"]')
       .click()
       .type(MM);
     cy.get('.personal-details')
       .find('input[name="dob-year"]')
       .click()
       .type(YYYY);
     cy.get('.personal-details')
       .find('select[name="sex"]')
       .select(Sex);
     cy.get('.personal-details')
       .find('input[name="email"]')
       .click()
       .type(emailAddress);
     cy.get('.personal-details')
       .find('input[name="email-confirm"]')
       .click()
       .type(confirmEmailAddress);
     cy.get('.personal-details')
       .find('input[name="phone_number"]')
       .click()
       .type(phoneNumber);
     cy.get('.personal-details')
       .find('input[name="password"]')
       .click()
       .type(password);
     cy.get('.personal-details')
       .find('input[name="password_confirm"]')
       .click()
       .type(confirmPassword);
     
     //Enter Your Address
     cy.get('.personal-details')
       .find('input[name="user_postcode"]')
       .click()
       .type(postcode);
     cy.get('.personal-details')
       .find('input[name="user_address1"]')
       .click()
       .type(address1);
     cy.get('.personal-details')
       .find('input[name="user_town"]')
       .click()
       .type(Town);
     cy.get('.personal-details')
       .find('input[name="user_county"]')
       .click()
       .type(county);
     cy.get('.personal-details')
       .find('select[name="user_country"]')
       .select(Country);
})

import '@testing-library/cypress/add-commands'
import "cypress-real-events";