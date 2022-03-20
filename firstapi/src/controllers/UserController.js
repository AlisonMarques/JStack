const users = require('../mocks/users');
const produtos = require('../mocks/produtos');
const ordenObjects = require('../utils/ordenandoObjetos')

module.exports = {
  listUsers(request, response) {
    const { order } = request.query

    // Listando os objetos em ordem crescente ou decrescente
    const sortedUsers = ordenObjects(users, order)

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(sortedUsers))
  },

  listProdutos(request, response) {
    const { order } = request.query

    // Listando os objetos em ordem crescente ou decrescente
    const sortedProdutos = ordenObjects(produtos, order)

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(sortedProdutos))
  },


}