import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay(2000);

    // Forma elegante para definir o header e ter funcionalides extras
    const headers = new Headers();

    // Adicionando header apenas se o body existir para não causar o preflight
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      // forma 1
      // Object.keys(options.headers).forEach((name) => {
      //   headers.append(name, options.headers[name]);
      // });

      // forma 2 - Percorrer objeto e adicionar os valores no headers
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;

    // Verificando se o conteúdo da resposta é um JSON
    // antes de fazer um parse
    const contentType = response.headers.get('content-type');
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    // Lançando um novo error caso a requisição não tenha dado certo
    // Optional chaining ?
    // versão 1: new Error(body?.error || `${response.status} - ${response.statusText}`);
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
