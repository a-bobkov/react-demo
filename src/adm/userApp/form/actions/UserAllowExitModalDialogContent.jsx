import { useState } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { useHotkey } from './useHotkey.js';
import { useHotkeySource } from './useHotkeySource.js';
import { Button } from '../../../components/Button/Button.jsx';
import './UserAllowExitModalDialogContent.css';

export function UserAllowExitModalDialogContent({ isFormInvalid, saveFormUser, resolve })
{
  const { lingo } = useLingo();

  return (
    <user-allow-exit-modal-dialog-content>
      <user-allow-exit-modal-dialog-message>
        { lingo({
          en: 'The form data is changed, are you sure to exit?',
          de: 'Die Formulardaten wurden geändert.\nMöchten Sie das Formular wirklich verlassen?',
        })}
      </user-allow-exit-modal-dialog-message>
      <UserAllowExitModalDialogActions
        isFormInvalid={ isFormInvalid }
        saveFormUser={ saveFormUser }
        resolve={ resolve }
      />
    </user-allow-exit-modal-dialog-content>
  );
}

function UserAllowExitModalDialogActions({ isFormInvalid, saveFormUser, resolve })
{
  const { lingo } = useLingo();

  const [ isBlocked, setIsBlocked ] = useState( false );

  const hotkeySource = useHotkeySource( isBlocked );

  return (
    <user-allow-exit-modal-dialog-actions inert={ isBlocked }>
      <UserAllowExitModalDialogButton
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
      <UserAllowExitModalDialogButton
        label={ lingo({
          en: 'Cancel',
          de: 'Absagen',
        })}
        hotkeySource={ hotkeySource }
        hotkey="Escape"
        returns={ false }
        resolve={ resolve }
      />
      <UserAllowExitModalDialogButton
        label={ lingo({
          en: 'Exit',
          de: 'Verlassen',
        })}
        returns={ true }
        resolve={ resolve }
      />
    </user-allow-exit-modal-dialog-actions>
  );
}

function UserAllowExitModalDialogButton({ label, disableReasons, hotkeySource, hotkey, returns, resolve, setIsBlocked })
{
  useHotkey( hotkeySource, hotkey, onClick );

  return (
    <Button
      className="UserAllowExitModalDialogButton"
      label={ label }
      disableReasons={ disableReasons }
      onClick={ onClick }
    />
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
