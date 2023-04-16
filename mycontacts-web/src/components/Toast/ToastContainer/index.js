import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    // adiciona o evento
    toastEventManager.on('addtoast', handleAddToast);

    // remove o evento quando o componente for desmontado
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  function handleRemoveMessage(id) {
    // Deixando apenas os toast que tem o id diferente da selecionada
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
