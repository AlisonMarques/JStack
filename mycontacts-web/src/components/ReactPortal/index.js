import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function ReactPortal({ containerId, children }) {
  // Verificando se já existe um elemento com o id containerId
  let container = document.getElementById(containerId);

  // Se não existir, cria um novo elemento
  // dessa forma o elemento não é criado varias vezes.
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  // Criando um portal para renderizar o children dentro do container
  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
