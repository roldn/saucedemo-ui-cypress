import { porDataTest } from '../support/helpers';

const selectores = {
  nombre: porDataTest('firstName'),
  apellido: porDataTest('lastName'),
  codigoPostal: porDataTest('postalCode'),
  continuar: porDataTest('continue'),
};

export const checkout = {
  completarDatos({ nombre, apellido, codigoPostal }) {
    cy.get(selectores.nombre).type(nombre);
    cy.get(selectores.apellido).type(apellido);
    cy.get(selectores.codigoPostal).type(codigoPostal);
    cy.get(selectores.continuar).click();
  },
};
