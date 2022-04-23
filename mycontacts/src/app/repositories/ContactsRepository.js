const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    // Quando usado toUpperCase() é necessário passar um valor padrão na variavel
    // Exemplo: orderBy = 'ASC'

    // Tratando o que é passado na query para nao ter perigo de sql injection
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
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

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

// Design Pattern Singleton que faz a classe se instanciar apenas uma vez
module.exports = new ContactsRepository();
