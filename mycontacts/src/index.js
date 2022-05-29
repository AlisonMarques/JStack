const express = require('express');
// Necessário para error assincronos
require('express-async-errors');
const routes = require('./routes');

const port = 3000;

const app = express();
// Permitindo que a api receba objetos no body
app.use(express.json());
app.use(routes);

// Error Handler (Middleware express) -> Manipulador de erros
app.use((error, request, response, next) => {
  console.log('errorHandler', error);
  response.sendStatus(500);
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
