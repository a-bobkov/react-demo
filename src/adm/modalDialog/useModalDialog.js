import { useState } from 'react';

export function useModalDialog()
{
  const [ modalDialog, setModalDialog ] = useState();

  const apiModalDialog = {
    ask: ask,
  };

  return { modalDialog, apiModalDialog };

  async function ask( question, answers )
  {
    try {
      return await openDialog( question, answers );
    } finally {
      closeDialog();
    }
  }

  function openDialog( question, answers )
  {
    return new Promise(( resolve ) => {
      setModalDialog({ question, answers, resolve });
    });
  }

  function closeDialog()
  {
    setModalDialog( null );
  }
}
