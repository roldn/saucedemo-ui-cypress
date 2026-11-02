import { listaDeProductos } from './listaDeProductos';

const selectores = {
  agregar: '[data-test^="add-to-cart"]',
  quitar: '[data-test^="remove"]',
};

export const catalogo = {
  visitar: () => cy.visit('/inventory.html'),

  obtenerProductos: (nombres) =>
    listaDeProductos.leer().then((productos) =>
      nombres.map((nombre) => {
        const producto = productos.find((candidato) => candidato.nombre === nombre);

        expect(producto, `"${nombre}" en el catálogo`).to.exist;

        return producto;
      })
    ),

  agregar: (nombres) =>
    nombres.forEach((nombre) => {
      listaDeProductos.item(nombre).within(() => {
        cy.get(selectores.agregar).click();
        cy.get(selectores.quitar).should('be.visible');
      });
    }),
};
