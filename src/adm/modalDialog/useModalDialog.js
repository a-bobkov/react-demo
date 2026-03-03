import { useState } from 'react';
import { useRunOnce } from '../useRunOnce.js';

export function useModalDialog()
{
  const [ modalDialog, setModalDialog ] = useState();

  const modalDialogApi = useRunOnce( createModalDialogApi, { setModalDialog });

  return { modalDialog, modalDialogApi };
}

function createModalDialogApi({ setModalDialog })
{
  return {
    ask: ask,
  };

  async function ask( content )
  {
    try {
      return await openDialog( content );
    } finally {
      closeDialog();
    }
  }

  function openDialog( content )
  {
    return new Promise( resolve => {
      setModalDialog({ content, resolve });
    });
  }

  function closeDialog()
  {
    setModalDialog( null );
  }
}