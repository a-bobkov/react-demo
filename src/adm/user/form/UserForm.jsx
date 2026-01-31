import { useState } from 'react';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { UserFormLogin } from './UserFormLogin.jsx';
import { UserFormName } from './UserFormName.jsx';
import { UserFormCompany } from './UserFormCompany.jsx';
import { validateUser } from './validate/validateUser.js';
import { deleteUser } from './deleteUser.js';
import { useNotifications } from '../../notifications/NotificationsProvider.jsx';
import './UserForm.css';

export function UserForm({ userResolve: { user, error = {}, fetchCommonError }, onSaveUser, setModeList })
{
  const { apiNotifications } = useNotifications();

  const [formUser, setFormUser] = useState( user );
  const [saveErrors, setSaveErrors] = useState( error );

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
        user={ formUser }
      />
      <UserFormExit
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

  function UserFormSave({ disabled, user }) // just save
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
      onSaveUser( user );
    }
  }

  function UserFormDelete({ userId })
  {
    return userId && (
      <div className="UserFormDelete">
        <button onClick={ onClickDelete }>
          Delete user
        </button>
      </div>
    );

    async function onClickDelete()
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
}

// check if changed, maybe ask and if yes - save; exit back to the (filtered) list
function UserFormExit({ setModeList })
{
  return (
    <div className="UserFormExit">
      <button onClick={ onClick }>
        Exit
      </button>
    </div>
  );

  function onClick()
  {
    setModeList();
  }
}
