import { useState } from 'react';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { UserFormLogin } from './UserFormLogin.jsx';
import { UserFormName } from './UserFormName.jsx';
import { UserFormCompany } from './UserFormCompany.jsx';
import { validateUser } from './validate/validateUser.js';
import { saveUser } from './saveUser.js';
import './UserForm.css';

export function UserForm({ userResolve: { user, error = {}, fetchCommonError }, onSaveUser })
{
  const [formUser, setFormUser] = useState( user );
  const [saveErrors, setSaveErrors] = useState( error );

  const formErrors = validateUser( formUser );

  const isFormInvalid = Object.keys(saveErrors).length || Object.keys(formErrors).length;

  return (
    <div className="UserForm">
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
        user={ formUser }
      />
    </div>
  );

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
      onSaveUser( user, saveUser( user ));
    }
  }
}

// check if changed, maybe ask and if yes - save; exit back to the (filtered) list
function UserFormExit({ user })
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
    // onSaveUser( user, saveUser( user ));
  }
}
