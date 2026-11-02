import { aImporte, porDataTest } from '../support/helpers';

const selectores = {
  nombre: porDataTest('firstName'),
  apellido: porDataTest('lastName'),
  codigoPostal: porDataTest('postalCode'),
  continuar: porDataTest('continue'),
  subtotal: porDataTest('subtotal-label'),
  impuestos: porDataTest('tax-label'),
  total: porDataTest('total-label'),
  finalizar: porDataTest('finish'),
  encabezadoConfirmacion: porDataTest('complete-header'),
  textoConfirmacion: porDataTest('complete-text'),
  volver: porDataTest('back-to-products'),
};

const leerImporte = (selector) => cy.get(selector).invoke('text').then(aImporte);

export const checkout = {
  completarDatos({ nombre, apellido, codigoPostal }) {
    cy.get(selectores.nombre).type(nombre);
    cy.get(selectores.apellido).type(apellido);
    cy.get(selectores.codigoPostal).type(codigoPostal);
    cy.get(selectores.continuar).click();
  },

  leerImportes: () =>
    leerImporte(selectores.subtotal).then((subtotal) =>
      leerImporte(selectores.impuestos).then((impuestos) =>
        leerImporte(selectores.total).then((total) => ({ subtotal, impuestos, total }))
      )
    ),

  finalizar: () => cy.get(selectores.finalizar).click(),

  encabezadoConfirmacion: () => cy.get(selectores.encabezadoConfirmacion),

  textoConfirmacion: () => cy.get(selectores.textoConfirmacion),

  volver: () => cy.get(selectores.volver),
};
