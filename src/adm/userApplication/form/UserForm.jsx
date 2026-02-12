import { useState } from 'react';
import { clsx } from 'clsx';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { UserFormLogin } from './UserFormLogin.jsx';
import { UserFormName } from './UserFormName.jsx';
import { UserFormCompany } from './UserFormCompany.jsx';
import { validateUser } from './validate/validateUser.js';
import { UserFormActions } from './UserFormActions.jsx';
import './UserForm.css';

export function UserForm({ userOptions: { dbUser, submitUser, submitErrors = {}, fetchCommonError }, onClickSaveUser, setModeList })
{
  const [ hasSpinner, setHasSpinner ] = useState( false );

  const [ formUser, setFormUser ] = useState( submitUser );
  const formErrors = validateUser( formUser );

  const isFieldChangedDb = compareUsers( formUser, dbUser );
  const isFormChangedDb = hasChangedField( isFieldChangedDb );

  const isFieldChangedSubmit = compareUsers( formUser, submitUser );
  const saveErrors = getActiveSubmitErrors( submitErrors, isFieldChangedSubmit );

  const isFormInvalid = Object.keys( saveErrors ).length || Object.keys( formErrors ).length;

  return (
    <div className={ clsx('UserForm', hasSpinner && 'hasSpinner')}>
      <UserFormTitle
        userId={ dbUser.id }
        isFormChanged={ isFormChangedDb }
      />
      <FetchCommonError
        error={ fetchCommonError }
      />
      <div className="UserFormFields">
        <UserFormLogin
          value={ formUser.login }
          formErrors={ formErrors.login }
          saveErrors={ saveErrors.login }
          isFieldChanged={ isFieldChangedDb.login }
          onChangeLogin={ onChangeLogin }
        />
        <UserFormName
          value={ formUser.name }
          formErrors={ formErrors.name }
          saveErrors={ saveErrors.name }
          isFieldChanged={ isFieldChangedDb.name }
          onChangeName={ onChangeName }
        />
        <UserFormCompany
          value={ formUser.company }
          formErrors={ formErrors.company }
          saveErrors={ saveErrors.company }
          isFieldChanged={ isFieldChangedDb.company }
          onChangeCompany={ onChangeCompany }
        />
      </div>
      <UserFormActions
        userId={ dbUser.id }
        isFormChanged={ isFormChangedDb }
        isFormInvalid={ isFormInvalid }
        setHasSpinner={ setHasSpinner }
        saveFormUser={ saveFormUser }
        setModeList={ setModeList }
      />
    </div>
  );

  async function saveFormUser()
  {
    setHasSpinner( true );

    const result = await onClickSaveUser( formUser, dbUser );

    setHasSpinner( false );

    return result;
  }

  function onChangeLogin( formLogin )
  {
    updateFormUser({ login: formLogin });
  }

  function onChangeName( formName )
  {
    updateFormUser({ name: formName });
  }

  function onChangeCompany( formCompany )
  {
    updateFormUser({ company: formCompany });
  }

  function updateFormUser( update )
  {
    setFormUser({
      ...formUser,
      ...update,
    });
  }
}

function UserFormTitle({ userId, isFormChanged })
{
  return (
    <div className={ clsx('UserFormTitle', isFormChanged && 'isFormChanged') }>
      { getTitle( userId )}
    </div>
  );

  function getTitle( userId )
  {
    return userId ? `Edit user: ${ userId }` : 'New user';
  }
}

function compareUsers( formUser, dbUser )
{
  return Object.keys( formUser ).reduce(( result, key ) =>
    Object.assign( result, {
      [key]: formUser[ key ] !== dbUser[ key ]
    }),
    {}
  );
}

function hasChangedField( isFieldChanged )
{
  return Object.values( isFieldChanged ).some( isChanged => isChanged );
}

function getActiveSubmitErrors( submitErrors, isFieldChanged )
{
  return Object.fromEntries(
    Object.entries( submitErrors ).filter(
      ([ field ]) => !isFieldChanged[ field ]
    )
  );
}