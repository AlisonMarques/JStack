import {
  useEffect, useState, useMemo, useCallback,
} from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // useMemo vai armazenar o valor de filteredContacts e só vai reexecutar o código
  // quando for alterado o valor de contacts ou searchTerm
  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    // Assim vai buscar todos os contatos que possuem a letra pequisada
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Vai buscar apenas as que começam com a letra pesquisada
    // contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

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

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContactModal(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteContactModal() {
    setContactBeingDeleted(null);
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      // Atualizando lista de contatos sem o contacto que foi deletado
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteContactModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDeleted,
    handleCloseDeleteContactModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    orderBy,
    handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContactModal,
  };
}
