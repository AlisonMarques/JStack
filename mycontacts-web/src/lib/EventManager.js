export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    // verifica se existe um evento
    // caso não exista, adicionar um array vazio
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    // adiciona um listener para um evento
    // Event a chave/nome e listener é a própria função que será executada
    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    // se nao existir evento retorna nada
    if (!this.listeners.has(event)) {
      return;
    }

    // percorre todos os listeners e executa a função passando o payload
    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    // desestruturando
    const listeners = this.listeners.get(event);

    // se nao existir evento retorna nada
    if (!listeners) {
      return;
    }

    // filtrando todos os listeners que não são iguais ao listenerToRemove
    // isso faz a remoção do listener especificado
    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);

    // atualiza o array de listeners com o novo array filtrado
    this.listeners.set(event, filteredListeners);
  }
}
