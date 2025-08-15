/// <reference types="cypress" />
export { };

// Lightweight auth stubbing: set a cookie/localStorage flag your app can read
Cypress.Commands.add("login", () => {
    // Flag requests as authenticated for E2E runs
    cy.setCookie("e2e-auth", "1");
});

declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable;
        }
    }
}
