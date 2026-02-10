import { useState } from 'react';

export function useModalDialog()
{
  const [ modalDialog, setModalDialog ] = useState();

  const apiModalDialog = {
    ask: ask,
  };

  return { modalDialog, apiModalDialog };

  async function ask( message, actions )
  {
    try {
      return await openDialog( message, actions );
    } finally {
      closeDialog();
    }
  }

  function openDialog(message, actions )
  {
    return new Promise(( resolve ) => {
      setModalDialog({ message, actions, resolve });
    });
  }

  function closeDialog()
  {
    setModalDialog( null );
  }
}
