import { useState } from 'react';
import ToastMessage from '../ToastMessage';

import { Container } from './styles';

export default function ToastContainer() {
  const [messages] = useState([
    {
      id: Math.random(),
      type: 'default',
      text: 'Default Text',
    },
    {
      id: Math.random(),
      type: 'success',
      text: 'Success Text',
    },
    {
      id: Math.random(),
      type: 'danger',
      text: 'Danger Text',
    },
  ]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
