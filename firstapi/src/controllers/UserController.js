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

  createUser(request, response) {
    /**
     * Recebendo o body do Post
     * As mensagens do body sao enviadas aos poucos(streams)
     * entao e preciso criar um event list para ficar ouvindo as mensagens
     */
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      //Criando novo usuário
      body = JSON.parse(body)

      const lastUserId = users[users.length - 1].id
      const newUser = {
        id: lastUserId + 1,
        name: body.name
      }

      users.push(newUser)
      response.send(200, newUser)
    })

  },

  listProdutos(request, response) {
    const { order } = request.query

    // Listando os objetos em ordem crescente ou decrescente
    const sortedProdutos = ordenObjects(produtos, order)

    response.send(200, sortedProdutos)
  },


}