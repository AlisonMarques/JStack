// Criando api sem bibliotecas de terceiros

const http = require('http');
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {

  // Forma atualizada de pegar as querys com a classe URL
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)
  console.log(`Request methor: ${request.method} / Endpoint: ${parsedUrl.pathname}`);
  const parsedSearchParams = Object.fromEntries(parsedUrl.searchParams)

  let { pathname } = parsedUrl
  let id = null

  /**
   * .filter((routeItem) => Boolean(routeItem))
   * or
   * filter(Boolean)
   */
  const splitEndpoint = pathname.split('/').filter(Boolean)

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`
    id = splitEndpoint[1]
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ))

  if (route) {
    // Injetando informaçoes no response da api
    request.query = parsedSearchParams
    request.params = { id }
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body))
    }

    route.handler(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }

})

const port = 3000
server.listen(port, () => console.log(`🚀 Server started at http://localhost:${port}`)) 