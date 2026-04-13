import { deleteUser } from '../deleteUser.js';
import { useModalDialogContext } from '../../../modalDialog/ModalDialogProvider.jsx';
import { useUserLocationContext } from '../../userLocation/UserLocationProvider.jsx';
import { useNotificationsContext } from '../../../notifications/NotificationsProvider.jsx';
import { AllowExitModalDialogContent } from './AllowExitModalDialogContent.jsx';
import './UserFormActions.css';

export function UserFormActions({ userId, isFormChanged, isFormInvalid, setHasSpinner, saveFormUser })
{
  const apiNotifications = useNotificationsContext();
  const userLocationApi = useUserLocationContext();

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

  function UserFormActionExit({ isFormChanged, isFormInvalid })
  {
    const modalDialogApi = useModalDialogContext();

    return (
      <div className="UserFormExit">
        <button type="button" onClick={ onClick }>
          Exit
        </button>
      </div>
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

        goExit();
      }
      catch (error) {
        apiNotifications.addError(`Error: ${ error.message }`);
      }

      setHasSpinner( false );
    }
  }

  function goExit()
  {
    if ( window.history.length > 1 ) {
      window.history.back();
    } else {
      userLocationApi.goUserList();
    }
  }
}
