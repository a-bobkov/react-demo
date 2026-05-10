import { useState } from 'react';
import { clsx } from 'clsx';
import { validateUser } from './validate/validateUser.js';
import { UserFormFields } from './UserFormFields.jsx';
import { UserFormActions } from './actions/UserFormActions.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import './UserForm.css';

export function UserForm({ userOptions: { dbUser, submitUser, submitErrors = {} }, subordinates, onClickSaveUser })
{
  const [ hasSpinner, setHasSpinner ] = useState( false );

  const [ formUser, setFormUser ] = useState( submitUser );
  const formErrors = validateUser( formUser );

  const isFieldChangedDb = compareItems( formUser, dbUser );
  const isFormChangedDb = hasChangedField( isFieldChangedDb );

  const isFieldChangedSubmit = compareItems( formUser, submitUser );
  const saveErrors = getActiveSubmitErrors( submitErrors, isFieldChangedSubmit );

  const isFormInvalid = Object.keys( saveErrors ).length || Object.keys( formErrors ).length;

  return (
    <div className="UserForm" inert={ hasSpinner }>
      <UserFormTitle
        userId={ dbUser.id }
        isFormChanged={ isFormChangedDb }
      />
      <UserFormFields
        formUser={ formUser }
        subordinates={ subordinates }
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
  const { lingo } = useLingo();

  return userId
    ? lingo({
      en: `Edit user: ${ userId }`,
      de: `Benutzer bearbeiten: ${ userId }`,
    })
    : lingo({
      en: 'New user',
      de: 'Neu Benutzer',
    })
}

function compareItems( formItem, dbItem )
{
  return Object.keys( formItem ).reduce(( result, key ) =>
    Object.assign( result, {
      [key]: isObject( formItem[ key ])
        ? JSON.stringify( formItem[ key ]) !== JSON.stringify( dbItem[ key ])
        : formItem[ key ] !== dbItem[ key ]
    }),
    {}
  );
}

function isObject( item )
{
  return item != null && item.constructor === Object;
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