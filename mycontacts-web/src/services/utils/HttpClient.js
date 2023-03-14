import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(2000);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;

    // Verificando se o conteúdo da resposta é um JSON
    // antes de fazer um parse
    const contentType = response.headers.get('content-type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    // Lançando um novo error caso a requisição não tenha dado certo
    // Optional chaining ?
    // versão 1: new Error(body?.error || `${response.status} - ${response.statusText}`);
    throw new APIError(response, body);
  }
}

export default HttpClient;
