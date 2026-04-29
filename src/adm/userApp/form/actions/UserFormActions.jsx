import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { deleteUser } from '../deleteUser.js';
import { useModalDialogContext } from '../../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../../notifications/NotificationsProvider.jsx';
import { AllowExitModalDialogContent } from './AllowExitModalDialogContent.jsx';
import { createHistoryEntry } from '../../../PopstateLink.jsx';
import { userListPath } from '../../useUserAppLocation.js';
import './UserFormActions.css';

export function UserFormActions({ userId, isFormChanged, isFormInvalid, setHasSpinner, saveFormUser })
{
  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  return (
    <div className="UserFormActions">
      <UserFormActionSave
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
      />
      <UserFormActionExit
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
      />
      <UserFormActionDelete
        userId={ userId }
      />
    </div>
  );

  function UserFormActionSave({ isFormInvalid, isFormChanged })
  {
    const disableReasons = [
      isFormInvalid && lingo({
        en: 'the form is invalid',
        de: 'das Formular ungültig ist',
      }),
      !isFormChanged && lingo({
        en: 'the form is not changed',
        de: 'das Formular nicht geändert wird',
      }),
    ].filter( Boolean );

    const title = disableReasons.length > 0
      ? lingo({
        en: 'Disabled because\n' + disableReasons.join(';\n') + '.',
        de: 'Deaktiviert, da\n' + disableReasons.join(';\n') + '.',
      })
      : undefined;

    return (
      <button className="UserFormAction"
        type="button"
        disabled={ disableReasons.length > 0 }
        title={ title }
        onClick={ saveFormUser }
      >
        { lingo({
          en: 'Save user',
          de: 'Speichern\nden Benutzer',
        })}
      </button>
    );
  }

  function UserFormActionExit({ isFormChanged, isFormInvalid })
  {
    const modalDialogApi = useModalDialogContext();

    return (
      <button className="UserFormAction"
        type="button"
        onClick={ onClick }
      >
        { lingo({
          en: 'Exit',
          de: 'Verlassen\ndas Formular',
        })}
      </button>
    );

    async function onClick()
    {
      const isExitAllowed = !isFormChanged || await modalDialogApi.ask( IsAllowExit );

      if ( isExitAllowed ) {
        goExit();
      }
    }

    function IsAllowExit({ resolve })
    {
      return (
        <AllowExitModalDialogContent
          isFormInvalid={ isFormInvalid }
          saveFormUser={ saveFormUser }
          resolve={ resolve }
        />
      );
    }
  }

  function UserFormActionDelete({ userId })
  {
    return userId && (
      <button className="UserFormAction"
        onClick={ onClick }
      >
        { lingo({
          en: 'Delete user',
          de: 'Löschen\nden Benutzer',
        })}
      </button>
    );

    async function onClick()
    {
      setHasSpinner( true );

      try {
        await deleteUser( userId, lingo );

        apiNotifications.addInfo( lingo({
          en: `User ${ userId } is successfully deleted.`,
          de: `Benutzer ${ userId } wurde erfolgreich gelöscht.`,
        }));

        goExit();
      }
      catch (error) {
        apiNotifications.addError( lingo({
          en: `Error: ${ error.message }`,
          de: `Fehler: ${ error.message }`,
        }));
      }

      setHasSpinner( false );
    }
  }

  function goExit()
  {
    if ( window.history.length > 1 ) {
      window.history.back();
    } else {
      createHistoryEntry( userListPath );
    }
  }
}
