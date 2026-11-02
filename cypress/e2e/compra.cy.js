import { carrito } from '../pages/carrito';
import { catalogo } from '../pages/catalogo';
import { encabezado } from '../pages/encabezado';
import { listaDeProductos } from '../pages/listaDeProductos';

describe('Compra', { testIsolation: false }, () => {
  let compra;
  let seleccionados;

  before(() => {
    cy.fixture('compra').then((contenido) => {
      compra = contenido;
    });

    cy.iniciarSesion();
    catalogo.visitar();
  });

  it('agrega los productos seleccionados al carrito', () => {
    catalogo.obtenerProductos(compra.productos).then((productos) => {
      seleccionados = productos;
    });

    catalogo.agregar(compra.productos);
    encabezado.contador().should('have.text', String(compra.productos.length));
  });

  it('muestra en el carrito los productos agregados', () => {
    encabezado.irAlCarrito();
    cy.location('pathname').should('eq', '/cart.html');
    encabezado.titulo().should('have.text', 'Your Cart');
    encabezado.contador().should('have.text', String(seleccionados.length));
    listaDeProductos.validarProductos(seleccionados);
    listaDeProductos.validarCantidades(1);
    carrito.seguirComprando().should('be.visible');
  });
});
