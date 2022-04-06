const express = require('express');

const routes = require('./routes');

const port = 3000;

const app = express();
// Permitindo que a api receba objetos no body
app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
