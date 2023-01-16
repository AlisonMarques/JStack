import { useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonContainer, Form } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);

    /**
     * Validamos o event pois o useState é assincrono e não vamos ter valores atualizados
     * dentro de name ainda nesta função.
    */
    if (!event.target.value) {
      /**
       * Com o prevState mantemos todos os dados antigos do array
       * e assim não sobrepomos dados.
       * Add erro quando o nome não for preenchido.
       */
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório.' },
      ]);
    } else {
      // Removendo do array de errors quando estiver preenchido.
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'name',
      ));
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    // Verificando se foi informado um e-mail e se ele é válido.
    if (event.target.value && !isEmailValid(event.target.value)) {
      /**
       * Verificando se já existe um erro com field email
       * para não concatenar vários erros de email a cada letra digitada
       */
      const errorAlreadyExists = errors.find((error) => error.field === 'email');
      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'E-mail inválido.' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  }

  function getErrorMessageByFieldName(fieldName) {
    // Buscando a messagem de erro pelo fieldName
    return errors.find((error) => error.field === fieldName)?.message;
  }

  function handleSubmit(event) {
    // Previne o comportamento padrão do formulário para que execute o javascript da função.
    event.preventDefault();

    console.log({
      name,
      email,
      fone,
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup
        error={getErrorMessageByFieldName('name')}
      >
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
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
          onChange={(event) => setFone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.node.isRequired,
};
