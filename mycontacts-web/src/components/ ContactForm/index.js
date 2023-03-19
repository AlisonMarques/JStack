import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonContainer, Form } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

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
    setFone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    // Previne o comportamento padrão do formulário para que execute o javascript da função.
    event.preventDefault();

    // console.log({
    //   name,
    //   email,
    //   fone,
    //   category,
    // });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup
        error={getErrorMessageByFieldName('name')}
      >
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
          type="email"
          placeholder="E-mail"
          error={getErrorMessageByFieldName('email')}
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={fone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.node.isRequired,
};
