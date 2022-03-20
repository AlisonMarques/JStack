let users = require('../mocks/users');
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
    const { body } = request

    const lastUserId = users[users.length - 1].id
    const newUser = {
      id: lastUserId + 1,
      name: body.name
    }

    users.push(newUser)
    response.send(200, newUser)

  },

  updateUser(request, response) {
    let { id } = request.params
    const { name } = request.body
    id = Number(id)

    const userExists = users.find((user) => user.id === id)

    if (!userExists) return response.send(400, { error: 'User not found' })

    users = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name
        }
      }
      return user
    })
    response.send(200, { id, name })
  },

  deleteUser(request, response) {
    let { id } = request.params
    id = Number(id)

    users = users.filter((user) => user.id !== id)

    response.send(200, { deleted: true })

  },

  listProdutos(request, response) {
    const { order } = request.query

    // Listando os objetos em ordem crescente ou decrescente
    const sortedProdutos = ordenObjects(produtos, order)

    response.send(200, sortedProdutos)
  },


}