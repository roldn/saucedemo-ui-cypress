import { porDataTest } from '../support/helpers';

export const carrito = {
  iniciarCheckout: () => cy.get(porDataTest('checkout')).click(),

  seguirComprando: () => cy.get(porDataTest('continue-shopping')),
};
