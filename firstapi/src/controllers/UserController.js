const users = require('../mocks/users');
const produtos = require('../mocks/produtos');
const ordenObjects = require('../utils/ordenandoObjetos')

module.exports = {
  listUsers(request, response) {
    const { order } = request.query

    // Listando os objetos em ordem crescente ou decrescente
    const sortedUsers = ordenObjects(users, order)

    response.send(200, sortedUsers)
  },

  getUserById(request, response) {
    const { id } = request.params

    const user = users.find((user) => user.id === Number(id))

    if (!user) {
      return response.send(400, { error: 'User not found' })
    }

    response.send(200, user)
  },

  listProdutos(request, response) {
    const { order } = request.query

    // Listando os objetos em ordem crescente ou decrescente
    const sortedProdutos = ordenObjects(produtos, order)

    response.send(200, sortedProdutos)
  },


}