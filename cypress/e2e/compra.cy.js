import { catalogo } from '../pages/catalogo';
import { encabezado } from '../pages/encabezado';

describe('Compra', { testIsolation: false }, () => {
  let compra;

  before(() => {
    cy.fixture('compra').then((contenido) => {
      compra = contenido;
    });

    cy.iniciarSesion();
    catalogo.visitar();
  });

  it('agrega los productos seleccionados al carrito', () => {
    catalogo.obtenerProductos(compra.productos);
    catalogo.agregar(compra.productos);
    encabezado.contador().should('have.text', String(compra.productos.length));
  });
});
