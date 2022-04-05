const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros

    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  show() {
    // Obter UM registro
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

// Design Pattern Singleton que faz a classe se instanciar apenas uma vez
module.exports = new ContactController();
