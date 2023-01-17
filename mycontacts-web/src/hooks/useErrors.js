import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    /**
    * Verificando se já existe um erro através do field
    * para não concatenar vários erros a cada letra digitada
    */
    const errorAlreadyExists = errors.find((error) => error.field === field);
    if (errorAlreadyExists) {
      return;
    }

    /**
    * Add erro ao array de erros.
    * Com o prevState mantemos todos os dados antigos do array
    * e assim não sobrepomos dados.
    */
    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName) {
    // Removendo do array de errors
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldName) {
    // Buscando a messagem de erro pelo fieldName
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return { setError, removeError, getErrorMessageByFieldName };
}
