import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

// Hook para controlar a execução de funções assíncronas
// em componentes desmontados
// Serve para desligar a execução de funções quando a tela for fechada.
export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((callback) => {
    if (isMounted()) {
      callback();
    }
  }, [isMounted]);

  return runSafeAsyncAction;
}
