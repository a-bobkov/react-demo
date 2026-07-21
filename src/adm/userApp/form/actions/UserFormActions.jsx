import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { deleteUser } from './deleteUser.js';
import { Button } from '../../../components/Button/Button.jsx';
import { useModalDialogContext } from '../../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../../notifications/NotificationsProvider.jsx';
import { UserAllowExitModalDialogContent } from './UserAllowExitModalDialogContent.jsx';
import { createHistoryEntry } from '../../../popstate/PopstateLink.jsx';
import { userListPath } from '../../useUserAppLocation.js';
import './UserFormActions.css';

export function UserFormActions({ userId, isFormChanged, isFormInvalid, setHasSpinner, saveFormUser })
{
  return (
    <user-form-actions>
      <UserFormActionSave
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
        saveFormUser={ saveFormUser }
      />
      <UserFormActionExit
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
      />
      <UserFormActionDelete
        userId={ userId }
        setHasSpinner={ setHasSpinner }
      />
    </user-form-actions>
  );
}

function UserFormActionSave({ isFormInvalid, isFormChanged, saveFormUser })
{
  const { lingo } = useLingo();

  const disableReasons = [
    isFormInvalid && lingo({
      en: 'the form is invalid',
      de: 'das Formular ungültig ist',
    }),
    !isFormChanged && lingo({
      en: 'the form is not changed',
      de: 'das Formular nicht geändert wird',
    }),
  ];

  return (
    <Button
      className="UserFormAction"
      label={ lingo({
        en: 'Save user',
        de: 'Speichern\nden Benutzer',
      }) }
      disableReasons={ disableReasons }
      onClick={ saveFormUser }
    />
  );
}

function UserFormActionExit({ isFormChanged, isFormInvalid })
{
  const { lingo } = useLingo();

  const modalDialogApi = useModalDialogContext();

  return (
    <Button
      className="UserFormAction"
      label={ lingo({
        en: 'Exit',
        de: 'Verlassen\ndas Formular',
      }) }
      onClick={ onClick }
    />
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
      <UserAllowExitModalDialogContent
        isFormInvalid={ isFormInvalid }
        saveFormUser={ saveFormUser }
        resolve={ resolve }
      />
    );
  }
}

function UserFormActionDelete({ userId, setHasSpinner })
{
  const { lingo } = useLingo();

  const apiNotifications = useNotificationsContext();

  return userId && (
    <Button
      className="UserFormAction"
      label={ lingo({
        en: 'Delete user',
        de: 'Löschen\nden Benutzer',
      }) }
      onClick={ onClick }
    />
  );

  async function onClick()
  {
    setHasSpinner( true );

    try {
      await deleteUser( userId );

      apiNotifications.addInfo({
        en: `User ${ userId } is successfully deleted.`,
        de: `Benutzer ${ userId } wurde erfolgreich gelöscht.`,
      });

      goExit();
    }
    catch ( error )
    {
      apiNotifications.addError({
        en: `Error deleting user: ${ error.message }`,
        de: `Fehler beim Löschen des Benutzers: ${ error.message }`,
      });
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
