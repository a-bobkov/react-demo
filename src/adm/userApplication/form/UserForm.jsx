import { useState } from 'react';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { UserFormLogin } from './UserFormLogin.jsx';
import { UserFormName } from './UserFormName.jsx';
import { UserFormCompany } from './UserFormCompany.jsx';
import { validateUser } from './validate/validateUser.js';
import { deleteUser } from './deleteUser.js';
import { useModalDialogContext } from '../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import './UserForm.css';

export function UserForm({ userOptions: { user, error = {}, fetchCommonError }, onClickSaveUser, setModeList })
{
  const [ formUser, setFormUser ] = useState( user );
  const [ saveErrors, setSaveErrors ] = useState( error );

  const formErrors = validateUser( formUser );

  const isFormInvalid = Object.keys(saveErrors).length || Object.keys(formErrors).length;

  return (
    <div className="UserForm">
      <UserFormTitle userId={ user.id }/>
      <FetchCommonError error={ fetchCommonError } />
      <UserFormLogin
        value={ formUser.login }
        formErrors={ formErrors.login }
        saveErrors={ saveErrors.login }
        onChangeLogin={ onChangeLogin }
      />
      <UserFormName
        value={ formUser.name }
        formErrors={ formErrors.name }
        saveErrors={ saveErrors.name }
        onChangeName={ onChangeName }
      />
      <UserFormCompany
        value={ formUser.company }
        formErrors={ formErrors.company }
        saveErrors={ saveErrors.company }
        onChangeCompany={ onChangeCompany }
      />
      <UserFormSave
        disabled={ isFormInvalid }
        formUser={ formUser }
      />
      <UserFormExit
        user={ user }
        formUser={ formUser }
        isFormInvalid={ isFormInvalid }
        setModeList={ setModeList }
      />
      <UserFormDelete
        userId={ user.id }
        setModeList={ setModeList }
      />
    </div>
  );

  function UserFormTitle({ userId })
  {
    return (
      <div className="UserFormTitle">
        { getTitle( userId )}
      </div>
    );

    function getTitle( userId )
    {
      return userId ? `Edit user: ${ userId }` : 'New user';
    }
  }

  function onChangeLogin( formLogin )
  {
    const { login: _, ...newSaveErrors } = saveErrors;

    if (formLogin === user.login) {
      newSaveErrors.login = error.login;
    }

    setSaveErrors( newSaveErrors );

    updateNewUser({ login: formLogin });
  }

  function onChangeName( formName )
  {
    const { name: _, ...newSaveErrors } = saveErrors;

    if (formName === user.name) {
      newSaveErrors.name = error.name;
    }

    setSaveErrors( newSaveErrors );

    updateNewUser({ name: formName });
  }

  function onChangeCompany( formCompany )
  {
    const { company: _, ...newSaveErrors } = saveErrors;

    if (formCompany === user.company) {
      newSaveErrors.company = error.company;
    }

    setSaveErrors( newSaveErrors );

    updateNewUser({ company: formCompany });
  }

  function updateNewUser( update )
  {
    setFormUser({
      ...formUser,
      ...update,
    });
  }

  function UserFormSave({ disabled, formUser }) // just save
  {
    return (
      <div className="UserFormSave">
        <button className={ disabled && 'button-disabled' } onClick={ onClick }>
          Save user
        </button>
      </div>
    );

    function onClick()
    {
      onClickSaveUser( formUser );
    }
  }

  function UserFormDelete({ userId })
  {
    const apiNotifications = useNotificationsContext();

    return userId && (
      <div className="UserFormDelete">
        <button onClick={ onClick }>
          Delete user
        </button>
      </div>
    );

    async function onClick()
    {
      try {
        await deleteUser( userId );

        apiNotifications.addInfo(`User ${ userId } is successfully deleted.`);

        setModeList();
      }
      catch (error) {
        apiNotifications.addError(`Error: ${ error.message }`);
      }
    }
  }

  function UserFormExit({ formUser, user, isFormInvalid, setModeList })
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
      if (!isEqual( formUser, user ) || isFormInvalid )
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
          const { error, fetchCommonError } = await onClickSaveUser( formUser );

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
}

function isEqual( formUser, user )
{
  return Object.keys( formUser ).every( key =>
    formUser[ key ] === user[ key ]
  );
}