import { carrito } from '../pages/carrito';
import { catalogo } from '../pages/catalogo';
import { checkout } from '../pages/checkout';
import { encabezado } from '../pages/encabezado';
import { listaDeProductos } from '../pages/listaDeProductos';
import { redondear, sumarPrecios } from '../support/helpers';

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

  it('completa los datos del comprador', () => {
    carrito.iniciarCheckout();
    cy.location('pathname').should('eq', '/checkout-step-one.html');
    encabezado.titulo().should('have.text', 'Checkout: Your Information');

    checkout.completarDatos(compra.comprador);
    cy.location('pathname').should('eq', '/checkout-step-two.html');
  });

  it('muestra el resumen con los productos y los importes correctos', () => {
    encabezado.titulo().should('have.text', 'Checkout: Overview');
    listaDeProductos.validarProductos(seleccionados);
    listaDeProductos.validarCantidades(1);

    checkout.leerImportes().then(({ subtotal, impuestos, total }) => {
      expect(subtotal, 'subtotal').to.eq(sumarPrecios(seleccionados));
      expect(total, 'total').to.eq(redondear(subtotal + impuestos));
    });
  });

  it('finaliza la compra y muestra la confirmación', () => {
    const { confirmacion } = compra;

    checkout.finalizar();
    cy.location('pathname').should('eq', '/checkout-complete.html');
    encabezado.titulo().should('have.text', confirmacion.titulo);
    checkout.encabezadoConfirmacion().should('have.text', confirmacion.encabezado);
    checkout.textoConfirmacion().should('have.text', confirmacion.texto);
    encabezado.contador().should('not.exist');
    checkout.volver().should('be.visible');
  });
});
