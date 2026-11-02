# saucedemo-ui-cypress

Prueba E2E con Cypress del flujo de compra de [Sauce Demo](https://www.saucedemo.com/) con el
usuario standard_user.

## Requisitos

Node 18 o superior.

## Instalación

```bash
npm install
cp cypress.env.example.json cypress.env.json
```

Completar cypress.env.json con las credenciales:

```json
{
  "username": "standard_user",
  "password": "secret_sauce"
}
```

## Ejecución

| Script | Descripción |
|---|---|
| `npm test` | Corre la prueba en modo headless |
| `npm run test:chrome` | Corre la prueba en Chrome |
| `npm run cy:open` | Abre la interfaz de Cypress |
