import { porDataTest } from './helpers';

Cypress.Commands.add('iniciarSesion', () =>
  cy.env(['username', 'password']).then(({ username, password }) =>
    cy.session(
      username,
      () => {
        cy.visit('/');
        cy.get(porDataTest('username')).type(username);
        cy.get(porDataTest('password')).type(password, { log: false });
        cy.get(porDataTest('login-button')).click();
        cy.location('pathname').should('eq', '/inventory.html');
      },
      {
        validate: () => cy.getCookie('session-username').should('have.property', 'value', username),
      }
    )
  )
);
