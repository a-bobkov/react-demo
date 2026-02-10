import { useState } from 'react';
import { clsx } from 'clsx';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { UserFormLogin } from './UserFormLogin.jsx';
import { UserFormName } from './UserFormName.jsx';
import { UserFormCompany } from './UserFormCompany.jsx';
import { validateUser } from './validate/validateUser.js';
import { UserFormActions } from './UserFormActions.jsx';
import './UserForm.css';

export function UserForm({ userOptions: { user, error = {}, fetchCommonError }, onClickSaveUser, setModeList })
{
  const [ hasSpinner, setHasSpinner ] = useState( false );

  const [ formUser, setFormUser ] = useState( user );
  const [ saveErrors, setSaveErrors ] = useState( error );

  const formErrors = validateUser( formUser );

  const isFormInvalid = Object.keys( saveErrors ).length || Object.keys( formErrors ).length;
  const isFormChanged = isUserNotEqual( formUser, user );

  return (
    <div className={ clsx('UserForm', hasSpinner && 'hasSpinner')}>
      <UserFormTitle
        userId={ formUser.id }
      />
      <FetchCommonError
        error={ fetchCommonError }
      />
      <div className="UserFormFields">
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
      </div>
      <UserFormActions
        formUser={ formUser }
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
        setHasSpinner={ setHasSpinner }
        onClickSaveUser={ onClickSaveUser }
        setModeList={ setModeList }
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
}

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

function isUserNotEqual( formUser, user )
{
  return Object.keys( formUser ).some( key =>
    formUser[ key ] !== user[ key ]
  );
}