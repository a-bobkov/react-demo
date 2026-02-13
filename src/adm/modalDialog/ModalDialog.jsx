import { useState } from 'react';
import { clsx } from 'clsx';
import './ModalDialog.css';

export function ModalDialog({ modalDialog })
{
  return modalDialog && (
    <>
      <div className="ModalDialogOverlay" />
      <div className="ModalDialogWindow">
        <ModalDialogMessage
          message={ modalDialog.message }
        />
        <ModalDialogActions
          actions={ modalDialog.actions }
          resolve={ modalDialog.resolve }
        />
      </div>
    </>
  );

  function ModalDialogMessage({ message })
  {
    return (
      <div className="ModalDialogMessage">
        { message }
      </div>
    );
  }

  function ModalDialogActions({ actions, resolve })
  {
    const [ isBlocked, setIsBlocked ] = useState( false );

    return (
      <div className={ clsx('ModalDialogActions', isBlocked && 'isBlocked') }>
        { actions.map(({ label, disableReasons, returns }) =>
          <ModalDialogAction
            label={ label }
            disableReasons={ disableReasons }
            returns={ returns }
            resolve={ resolve }
            setIsBlocked={ setIsBlocked }
          />
        )}
      </div>
    );
  }

  function ModalDialogAction({ label, disableReasons = [], returns, resolve, setIsBlocked })
  {
    const reasons = disableReasons.filter( Boolean );

    const title = reasons.length > 0 && 'Disabled because\n' + reasons.join(';\n') + '.';

    return (
      <button
        type="button"
        disabled={ reasons.length > 0 }
        title={ title }
        onClick={ onClick }
      >
        { label }
      </button>
    );

    function onClick()
    {
      const result = typeof returns === 'function'
        ? blockingResult( returns )
        : returns;

      resolve( result );
    }

    async function blockingResult( returns )
    {
      setIsBlocked( true );

      const result = await returns();

      setIsBlocked( false );

      return result;
    }
  }
}
