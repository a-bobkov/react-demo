import { deleteUser } from '../deleteUser.js';
import { useModalDialogContext } from '../../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../../notifications/NotificationsProvider.jsx';
import { AllowExitModalDialogContent } from './AllowExitModalDialogContent.jsx';
import './UserFormActions.css';

export function UserFormActions({ userId, isFormChanged, isFormInvalid, setHasSpinner, saveFormUser, setModeList })
{
  const apiNotifications = useNotificationsContext();

  return (
    <div className="UserFormActions">
      <UserFormActionSave
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
      />
      <UserFormActionExit
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
        setModeList={ setModeList }
      />
      <UserFormActionDelete
        userId={ userId }
        setModeList={ setModeList }
      />
    </div>
  );

  function UserFormActionSave({ isFormInvalid, isFormChanged })
  {
    const disableReasons = [
      isFormInvalid && 'the form is invalid',
      !isFormChanged && 'the form is not changed',
    ].filter( Boolean );

    const title = disableReasons.length > 0 && 'Disabled because\n' + disableReasons.join(';\n') + '.';

    return (
      <div className="UserFormSave">
        <button
          type="button"
          disabled={ disableReasons.length > 0 }
          title={ title }
          onClick={ saveFormUser }
        >
          Save user
        </button>
      </div>
    );
  }

  function UserFormActionExit({ isFormChanged, isFormInvalid, setModeList })
  {
    const apiModalDialog = useModalDialogContext();

    return (
      <div className="UserFormExit">
        <button type="button" onClick={ onClick }>
          Exit
        </button>
      </div>
    );

    async function onClick()
    {
      const isExitAllowed = !isFormChanged || await apiModalDialog.ask( IsAllowExit );

      if ( isExitAllowed ) setModeList();
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
      <div className="UserFormDelete">
        <button onClick={ onClick }>
          Delete user
        </button>
      </div>
    );

    async function onClick()
    {
      setHasSpinner( true );

      try {
        await deleteUser( userId );

        apiNotifications.addInfo(`User ${ userId } is successfully deleted.`);

        setModeList();
      }
      catch (error) {
        apiNotifications.addError(`Error: ${ error.message }`);
      }

      setHasSpinner( false );
    }
  }
}
