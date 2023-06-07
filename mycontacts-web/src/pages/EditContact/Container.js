import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

import useSafeAsyncAction from '../../hooks/useSafeASyncAction';
import Presentation from './Presentation';

export default function Container() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  // useRef é utilizado para que o componente possa enviar referências para outros componentes
  const contactFormRef = useRef(null);

  const history = useHistory();
  // Pegando parametros passado pela rota
  const { id } = useParams();

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch (error) {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);


  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactsService.updateContact(id, contact);

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return (
    <Presentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />

  );
}
