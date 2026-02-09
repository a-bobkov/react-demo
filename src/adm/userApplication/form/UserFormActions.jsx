import { deleteUser } from './deleteUser.js';
import { useModalDialogContext } from '../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import './UserFormActions.css';

export function UserFormActions({ user, formUser, isFormInvalid, setHasSpinner, onClickSaveUser, setModeList })
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
        user={ user }
        formUser={ formUser }
        isFormInvalid={ isFormInvalid }
        setModeList={ setModeList }
      />
      <UserFormActionDelete
        userId={ user.id }
        setModeList={ setModeList }
      />
    </div>
  );

  function UserFormActionSave({ formUser, isFormInvalid })
  {
    return (
      <div className="UserFormSave">
        <button className={ isFormInvalid && 'button-disabled' } onClick={ onClick }>
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

  function UserFormActionExit({ formUser, user, isFormInvalid, setModeList })
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
      if (!isUserEqual( formUser, user ) || isFormInvalid )
      {
        const answer = await apiModalDialog.ask(
          'The form data is changed, are you sure to exit?',
          {
            save: 'Save & exit',
            cancel: 'Cancel',
            exit: 'Exit',
          },
        );

        if ( answer === 'save' ) {
          const { error, fetchCommonError } = await saveFormUser( formUser );

          if ( error || fetchCommonError ) {
            return;
          }
        }

        if ( answer === 'cancel' ) {
          return;
        }
      }

      setModeList();
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

function isUserEqual( formUser, user )
{
  return Object.keys( formUser ).every( key =>
    formUser[ key ] === user[ key ]
  );
}