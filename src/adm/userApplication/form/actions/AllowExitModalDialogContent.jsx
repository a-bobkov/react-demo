import { useState } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { useHotkey } from './useHotkey.js';
import { useHotkeySource } from './useHotkeySource.js';
import './AllowExitModalDialogContent.css';

export function AllowExitModalDialogContent({ isFormInvalid, saveFormUser, resolve })
{
  const { lingo } = useLingo();

  return (
    <div className="AllowExitModalDialogContent">
      <div className="AllowExitModalDialogMessage">
        { lingo({
          en: 'The form data is changed, are you sure to exit?',
          de: 'Die Formulardaten wurden geändert.\nMöchten Sie das Formular wirklich verlassen?',
        })}
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
  const { lingo } = useLingo();

  const [ isBlocked, setIsBlocked ] = useState( false );

  const hotkeySource = useHotkeySource( isBlocked );

  return (
    <div className="AllowExitModalDialogActions" inert={ isBlocked }>
      <AllowExitModalDialogButton
        label={ lingo({
          en: 'Save & exit',
          de: 'Speichern\nund verlassen',
        })}
        disableReasons={[
          isFormInvalid && lingo({
            en: 'the form is invalid',
            de: 'das Formular ungültig ist',
          }),
        ]}
        returns={ saveFormUser }
        setIsBlocked={ setIsBlocked }
        resolve={ resolve }
      />
      <AllowExitModalDialogButton
        label={ lingo({
          en: 'Cancel',
          de: 'Absagen',
        })}
        hotkeySource={ hotkeySource }
        hotkey="Escape"
        returns={ false }
        resolve={ resolve }
      />
      <AllowExitModalDialogButton
        label={ lingo({
          en: 'Exit',
          de: 'Verlassen',
        })}
        returns={ true }
        resolve={ resolve }
      />
    </div>
  );
}

function AllowExitModalDialogButton({ label, disableReasons = [], hotkeySource, hotkey, returns, resolve, setIsBlocked })
{
  const { lingo } = useLingo();

  useHotkey( hotkeySource, hotkey, onClick );

  const reasons = disableReasons.filter( Boolean );

  const title = reasons.length > 0 && lingo({
    en: 'Disabled because\n' + reasons.join(';\n') + '.',
    de: 'Deaktiviert, da\n' + reasons.join(';\n') + '.',
  });

  return (
    <button className="AllowExitModalDialogButton"
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
