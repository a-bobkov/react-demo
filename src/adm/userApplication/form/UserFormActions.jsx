import { deleteUser } from './deleteUser.js';
import { useModalDialogContext } from '../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import './UserFormActions.css';

export function UserFormActions({ formUser, isFormChanged, isFormInvalid, setHasSpinner, onClickSaveUser, setModeList })
{
  const apiNotifications = useNotificationsContext();

  return (
    <div className="UserFormActions">
      <UserFormActionSave
        formUser={ formUser }
        isFormInvalid={ isFormInvalid }
        onClickSaveUser={ onClickSaveUser }
      />
      <UserFormActionExit
        formUser={ formUser }
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
        setModeList={ setModeList }
      />
      <UserFormActionDelete
        userId={ formUser.id }
        setModeList={ setModeList }
      />
    </div>
  );

  function UserFormActionSave({ formUser, isFormInvalid })
  {
    return (
      <div className="UserFormSave">
        <button className={ isFormInvalid && 'disabled' } onClick={ onClick }>
          Save user
        </button>
      </div>
    );

    async function onClick()
    {
      await saveFormUser( formUser );
    }
  }

  async function saveFormUser( formUser )
  {
    setHasSpinner( true );

    try {
      return await onClickSaveUser( formUser );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      };
    }
    finally {
      setHasSpinner( false );
    }
  }

  function UserFormActionExit({ formUser, isFormChanged, isFormInvalid, setModeList })
  {
    const apiModalDialog = useModalDialogContext();

    return (
      <div className="UserFormExit">
        <button onClick={ onClick }>
          Exit
        </button>
      </div>
    );

    async function onClick()
    {
      const exit = !isFormChanged && !isFormInvalid
        || await apiModalDialog.ask(
          'The form data is changed, are you sure to exit?',
          [
            {
              label: 'Save & exit',
              disabled: isFormInvalid,
              returns: onClickModalSave,
            }, {
              label: 'Cancel',
            }, {
              label: 'Exit',
              returns: true,
            },
          ]
        );

      if ( exit ) setModeList();
    }

    async function onClickModalSave()
    {
      const { error, fetchCommonError } = await saveFormUser( formUser );

      return !error && !fetchCommonError;
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
