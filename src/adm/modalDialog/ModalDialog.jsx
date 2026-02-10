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
    return (
      <div className="ModalDialogActions">
        { actions.map(({ label, returns, disabled }) =>
          <ModalDialogAction
            label={ label }
            returns={ returns }
            disabled={ disabled }
            resolve={ resolve }
          />
        )}
      </div>
    );
  }

  function ModalDialogAction({ label, returns, disabled, resolve })
  {
    return (
      <button className={ clsx('ModalDialogAction', disabled && 'disabled')} onClick={ onClick }>
        { label }
      </button>
    );

    function onClick()
    {
      const result = typeof returns === 'function'
        ? returns()
        : returns;

      resolve( result );
    }
  }
}
