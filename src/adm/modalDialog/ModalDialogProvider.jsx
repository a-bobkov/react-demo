import { createContext, useContext } from 'react';
import { useModalDialog } from './useModalDialog.js';
import { ModalDialog } from './ModalDialog.jsx';

const ModalDialogContext = createContext(null);

export function useModalDialogContext()
{
  return useContext( ModalDialogContext );
}

export function ModalDialogProvider({ children })
{
  const { modalDialog, apiModalDialog } = useModalDialog();

  return (
    <>
      <ModalDialogContext value={ apiModalDialog }>
        { children }
      </ModalDialogContext>
      <ModalDialog modalDialog={ modalDialog }/>
    </>
  );
}
