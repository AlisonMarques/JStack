export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    // verifica se existe um evento
    // caso não exista, cria um array vazio
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    // adiciona um listener para um evento
    // Event a chave/nome e listener é a própria função que será executada
    this.listeners[event].push(listener);
  }

  emit(event, payload) {
    // se nao existir evento retorna nada
    if (!this.listeners[event]) {
      return;
    }

    // percorre todos os listeners e executa a função passando o payload
    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    // desestruturando
    const listeners = this.listeners[event];

    // se nao existir evento retorna nada
    if (!this.listeners[event]) {
      return;
    }

    // filtrando todos os listeners que não são iguais ao listenerToRemove
    // isso faz a remoção do listener especificado
    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);

    // atualiza o array de listeners com o novo array filtrado
    this.listeners[event] = filteredListeners;
  }
}

function addToast1(payload) {
  console.log('Toast adicionado1', payload);
}

function addToast2(payload) {
  console.log('Toast adicionado2', payload);
}


const toastEventManager = new EventManager();
toastEventManager.on('addToast', addToast1);
toastEventManager.on('addToast', addToast2);


toastEventManager.emit('addToast', { type: 'danger', text: 'Texto' });

toastEventManager.removeListener('addToast', addToast1);

toastEventManager.emit('addToast', 'apos');

console.log(toastEventManager);
