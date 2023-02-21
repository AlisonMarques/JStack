import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';

// import Modal from '../../components/Modal';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // useMemo vai armazenar o valor de filteredContacts e só vai reexecutar o código
  // quando for alterado o valor de contacts ou searchTerm
  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    // Assim vai buscar todos os contatos que possuem a letra pequisada
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Vai buscar apenas as que começam com a letra pesquisada
    // contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);
        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    // sempre que precisar alterar um valor de state que depende do valor inicial
    // se usa o prevstate
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      {/* <Modal danger /> */}
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          {' '}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button
            type="button"
            onClick={handleToggleOrderBy}
          >
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name
                && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Editar" />
            </Link>

            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
