const express = require('express');

const routes = require('./routes');

const port = 3000;

const app = express();
app.use(routes);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
