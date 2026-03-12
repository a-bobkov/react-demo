import { useState } from 'react';
import { useHotkeySource } from './useHotkeySource.js';
import { useHotkey } from './useHotkey.js';
import './AllowExitModalDialogContent.css';

export function AllowExitModalDialogContent({ isFormInvalid, saveFormUser, resolve })
{
  return (
    <div className="AllowExitModalDialogContent">
      <div className="AllowExitModalDialogMessage">
        The form data is changed, are you sure to exit?
      </div>
      <AllowExitModalDialogActions
        isFormInvalid={ isFormInvalid }
        saveFormUser={ saveFormUser }
        resolve={ resolve }
      />
    </div>
  );
}

function AllowExitModalDialogActions({ isFormInvalid, saveFormUser, resolve })
{
  const [ isBlocked, setIsBlocked ] = useState( false );

  const hotkeySource = useHotkeySource( isBlocked );

  return (
    <div className="AllowExitModalDialogActions" inert={ isBlocked }>
      <ModalDialogButton
        label="Save & exit"
        disableReasons={[
          isFormInvalid && 'the form is invalid',
        ]}
        returns={ saveFormUser }
        setIsBlocked={ setIsBlocked }
        resolve={ resolve }
      />
      <ModalDialogButton
        label="Cancel"
        hotkeySource={ hotkeySource }
        hotkey="Escape"
        returns={ false }
        resolve={ resolve }
      />
      <ModalDialogButton
        label="Exit"
        returns={ true }
        resolve={ resolve }
      />
    </div>
  );
}

function ModalDialogButton({ label, disableReasons = [], hotkeySource, hotkey, returns, resolve, setIsBlocked })
{
  useHotkey( hotkeySource, hotkey, onClick );

  const reasons = disableReasons.filter( Boolean );

  const title = reasons.length > 0 && 'Disabled because\n' + reasons.join(';\n') + '.';

  return (
    <button
      type="button"
      title={ title }
      disabled={ reasons.length > 0 }
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
