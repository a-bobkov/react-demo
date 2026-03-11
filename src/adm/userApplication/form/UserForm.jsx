import { useState } from 'react';
import { clsx } from 'clsx';
import { validateUser } from './validate/validateUser.js';
import { UserFormFields } from './UserFormFields.jsx';
import { UserFormActions } from './actions/UserFormActions.jsx';
import { FetchCommonError } from '../FetchCommonError.jsx';
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
    <div className="UserForm" inert={ hasSpinner }>
      <UserFormTitle
        userId={ dbUser.id }
        isFormChanged={ isFormChangedDb }
      />
      <FetchCommonError
        error={ fetchCommonError }
      />
      <UserFormFields
        formUser={ formUser }
        formErrors={ formErrors }
        saveErrors={ saveErrors }
        isFieldChangedDb={ isFieldChangedDb }
        setFormUser={ setFormUser }
      />
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
}

function UserFormTitle({ userId, isFormChanged })
{
  return (
    <div className={ clsx('UserFormTitle', isFormChanged && 'isFormChanged') }>
      { getUserFormTitle( userId )}
    </div>
  );
}

function getUserFormTitle( userId )
{
  return userId ? `Edit user: ${ userId }` : 'New user';
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