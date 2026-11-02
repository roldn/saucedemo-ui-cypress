import { porDataTest } from '../support/helpers';

export const carrito = {
  seguirComprando: () => cy.get(porDataTest('continue-shopping')),
};
