const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Alison',
    email: 'alison@gmail.com',
    phone: '123-456',
    category: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => resolve(contacts));
  }
}

// Design Pattern Singleton que faz a classe se instanciar apenas uma vez
module.exports = new ContactsRepository();
