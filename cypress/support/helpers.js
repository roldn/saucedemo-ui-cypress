export const porDataTest = (valor) => `[data-test="${valor}"]`;

export const aImporte = (texto) => Number(texto.replace(/[^\d.]/g, ''));

export const redondear = (importe) => Math.round(importe * 100) / 100;

export const sumarPrecios = (productos) =>
  redondear(productos.reduce((total, { precio }) => total + precio, 0));
