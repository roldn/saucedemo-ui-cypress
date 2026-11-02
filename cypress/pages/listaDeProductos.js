import { aImporte, porDataTest } from '../support/helpers';

const selectores = {
  item: porDataTest('inventory-item'),
  nombre: porDataTest('inventory-item-name'),
  descripcion: porDataTest('inventory-item-desc'),
  precio: porDataTest('inventory-item-price'),
  cantidad: porDataTest('item-quantity'),
};

const leerItem = (item) => ({
  nombre: item.find(selectores.nombre).text().trim(),
  descripcion: item.find(selectores.descripcion).text().trim(),
  precio: aImporte(item.find(selectores.precio).text()),
});

export const listaDeProductos = {
  selectores,

  items: () => cy.get(selectores.item),

  item: (nombre) => cy.contains(selectores.nombre, nombre).parents(selectores.item),

  leer: () => cy.get(selectores.item).then((items) => [...items].map((item) => leerItem(Cypress.$(item)))),

  validarProductos(esperados) {
    this.items().should('have.length', esperados.length);

    this.leer().should((mostrados) => {
      expect(mostrados).to.deep.equal(esperados);
    });
  },

  validarCantidades(cantidad) {
    this.items().each((item) => {
      cy.wrap(item).find(selectores.cantidad).should('have.text', String(cantidad));
    });
  },
};
