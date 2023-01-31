const express = require('express');
// Necessário para error assincronos
require('express-async-errors');

const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')

const routes = require('./routes');

const port = 3000;

const app = express();

// Permitindo que a api receba objetos no body
app.use(express.json());

//middleware cors
app.use(cors)

app.use(routes);

// Error Handler (Middleware express) -> Manipulador de erros
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
