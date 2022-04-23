const { v4 } = require('uuid');

const db = require('../../database');

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

  async create({
    name, email, phone, category_id,
  }) {
    /**
     * [FORMA COM BAIXA SEGURANÇA] - INSERT INTO contacts(name, email, phone,
     * category_id) VALUES('${name}', '${email}', '${phone}', '${category_id}')
     *
     * [FORMA MAIS SEGURA] - INSERT INTO contacts(name, email, phone, category_id)
     *  VALUES($1, $2, $3, $4)`, [name, email, phone, category_id]
     *
     * Os dolares($) são binds do postgres que evita o problema de SQL Injections.
     * Dessa forma estamos deixando mais seguro.
     * Passamos o array para informar as variáveis que vamos setar no sql
     *
     * RETURNING -> serve para retornar os campos que queremos após o INSERT
     */
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
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
