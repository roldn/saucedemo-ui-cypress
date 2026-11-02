import { porDataTest } from '../support/helpers';

const selectores = {
  contador: porDataTest('shopping-cart-badge'),
};

export const encabezado = {
  contador: () => cy.get(selectores.contador),
};
