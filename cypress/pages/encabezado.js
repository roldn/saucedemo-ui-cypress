import { porDataTest } from '../support/helpers';

const selectores = {
  titulo: porDataTest('title'),
  contador: porDataTest('shopping-cart-badge'),
  carrito: porDataTest('shopping-cart-link'),
};

export const encabezado = {
  titulo: () => cy.get(selectores.titulo),

  contador: () => cy.get(selectores.contador),

  irAlCarrito: () => cy.get(selectores.carrito).click(),
};
