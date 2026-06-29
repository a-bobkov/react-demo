import { useState } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { useHotkey } from './useHotkey.js';
import { useHotkeySource } from './useHotkeySource.js';
import { Button } from '../../../components/Button/Button.jsx';
import './BranchAllowExitModalDialogContent.css';

export function BranchAllowExitModalDialogContent({ isFormInvalid, saveFormBranch, resolve })
{
  const { lingo } = useLingo();

  return (
    <branch-allow-exit-modal-dialog-content>
      <branch-allow-exit-modal-dialog-message>
        { lingo({
          en: 'The form data is changed, are you sure to exit?',
          de: 'Die Formulardaten wurden geändert.\nMöchten Sie das Formular wirklich verlassen?',
        })}
      </branch-allow-exit-modal-dialog-message>
      <BranchAllowExitModalDialogActions
        isFormInvalid={ isFormInvalid }
        saveFormBranch={ saveFormBranch }
        resolve={ resolve }
      />
    </branch-allow-exit-modal-dialog-content>
  );
}

function BranchAllowExitModalDialogActions({ isFormInvalid, saveFormBranch, resolve })
{
  const { lingo } = useLingo();

  const [ isBlocked, setIsBlocked ] = useState( false );

  const hotkeySource = useHotkeySource( isBlocked );

  return (
    <branch-allow-exit-modal-dialog-actions inert={ isBlocked }>
      <BranchAllowExitModalDialogButton
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
        returns={ saveFormBranch }
        setIsBlocked={ setIsBlocked }
        resolve={ resolve }
      />
      <BranchAllowExitModalDialogButton
        label={ lingo({
          en: 'Cancel',
          de: 'Absagen',
        })}
        hotkeySource={ hotkeySource }
        hotkey="Escape"
        returns={ false }
        resolve={ resolve }
      />
      <BranchAllowExitModalDialogButton
        label={ lingo({
          en: 'Exit',
          de: 'Verlassen',
        })}
        returns={ true }
        resolve={ resolve }
      />
    </branch-allow-exit-modal-dialog-actions>
  );
}

function BranchAllowExitModalDialogButton({ label, disableReasons, hotkeySource, hotkey, returns, resolve, setIsBlocked })
{
  useHotkey( hotkeySource, hotkey, onClick );

  return (
    <Button
      className="BranchAllowExitModalDialogButton"
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
