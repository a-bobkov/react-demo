import { useState } from 'react';
import { clsx } from 'clsx/lite';
import { UserForm } from '../form/UserForm.jsx';
import { createUser } from './createUser.js';
import './UserAppCreate.css';

export function UserAppCreate({ createOptions, setCreateOptions, setModeUpdate, setModeList })
{
  const [ hasSpinner, setHasSpinner ] = useState( false );

  console.log(`UserAppCreate createOptions: ${ JSON.stringify( createOptions )}`);

  return (
    <div className={ clsx('UserApp', hasSpinner && 'hasSpinner')}>
      <UserForm
        key={ createOptions.id }
        userOptions={ createOptions }
        onClickSaveUser={ onClickCreateUser }
        setModeList={ setModeList }
      />
    </div>
  );

  async function onClickCreateUser( user )
  {
    setHasSpinner(true);

    const newCreateOptions = await createUser( user );

    if ( newCreateOptions.error ) {
      newCreateOptions.user = user;
    }

    if ( newCreateOptions.user.id ) {
      setModeUpdate( newCreateOptions );
    } else {
      setCreateOptions( newCreateOptions );
    }

    setHasSpinner(false);

    return newCreateOptions;
  }
}
