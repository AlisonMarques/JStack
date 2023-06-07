import { useEffect, useState, useImperativeHandle } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import CategoriesService from '../../services/CategoriesService';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  // useImperativeHandle passando os valores do componente pai para o filho(ContactForm)
  useImperativeHandle(ref, () => ({
    // Montando função com objeto da referência para ser enviado para o component pai
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    /**
     * Validamos o event pois o useState é assincrono e não vamos ter valores atualizados
     * dentro de name ainda nesta função.
    */
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    // Verificando se foi informado um e-mail e se ele é válido.
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    // Previne o comportamento padrão do formulário para que execute o javascript da função.
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    handleNameChange,
    handlePhoneChange,
    handleEmailChange,
    getErrorMessageByFieldName,
    setCategoryId,
    name,
    email,
    phone,
    categoryId,
    categories,
    isSubmitting,
    isLoadingCategories,
    isFormValid,
  };
}
