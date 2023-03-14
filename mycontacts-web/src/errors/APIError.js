// Classe responsável por tratar os erros da API
// Com ele podemos criar um novo tipo de erro e tratar de forma mais específica.

export default class APIError extends Error {
  constructor(response, body) {
    super(); // executando a classe extendida (Error)

    this.name = 'APIError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
