import EventManager from '../lib/EventManager';

// Instanciando a classe
export const toastEventManager = new EventManager();

export default function toast({ type, text, duration }) {
  // Criando um evento customizado de toast com suas informações
  toastEventManager.emit('addtoast', { type, text, duration });
}
