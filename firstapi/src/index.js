// Criando api sem bibliotecas de terceiros

const http = require('http');
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {

  // Forma atualizada de pegar as querys com a classe URL
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)
  console.log(`Request methor: ${request.method} / Endpoint: ${parsedUrl.pathname}`);
  const parsedSearchParams = Object.fromEntries(parsedUrl.searchParams)

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ))

  if (route) {
    request.query = parsedSearchParams
    route.handler(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }

})

const port = 3000
server.listen(port, () => console.log(`🚀 Server started at http://localhost:${port}`)) 