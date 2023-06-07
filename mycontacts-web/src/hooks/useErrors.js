import { useState, useCallback } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
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
  }, [errors]);

  const removeError = useCallback((fieldName) => {
    // Removendo do array de errors
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (fieldName) => (
      // Buscando a messagem de erro pelo fieldName
      errors.find((error) => error.field === fieldName)?.message),
    [errors],
  );

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
