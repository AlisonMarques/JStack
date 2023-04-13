export default function toast({ type, text }) {
  // Criando um evento customizado de toast com suas informações
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  // Disparando o evento criado
  document.dispatchEvent(event);
}
