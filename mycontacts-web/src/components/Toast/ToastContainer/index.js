import { useState, useEffect, useCallback } from 'react';
import ToastMessage from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    // adiciona o evento
    toastEventManager.on('addtoast', handleAddToast);

    // remove o evento quando o componente for desmontado
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  // usando o callback para a função ser criada apenas uma vez
  // e apontar para o mesmo endereço de memória
  const handleRemoveMessage = useCallback((id) => {
    // Deixando apenas os toast que tem o id diferente da selecionada
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

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
