const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Alison',
    email: 'alison@gmail.com',
    phone: '123-456',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Leticia',
    email: 'leticia@gmail.com',
    phone: '123-456',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      const oneContact = contacts.find((contact) => contact.id === id);
      resolve(oneContact);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      const oneContact = contacts.find((contact) => contact.email === email);
      resolve(oneContact);
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updateContact : contact
      ));

      resolve(updateContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      // Trazer todos os itens que seja diferente do id passado para deletar
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

// Design Pattern Singleton que faz a classe se instanciar apenas uma vez
module.exports = new ContactsRepository();
