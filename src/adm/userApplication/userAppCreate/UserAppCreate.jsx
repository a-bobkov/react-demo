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
        userResolve={ createOptions }
        onSaveUser={ onClickCreateUser }
        setModeList={ setModeList }
      />
    </div>
  );

  async function onClickCreateUser( user )
  {
    setHasSpinner(true);

    const newOptions = await createUser( user );

    if ( newOptions.error ) {
      newOptions.user = user;
    }

    if ( newOptions.user.id ) {
      setModeUpdate( newOptions );
    } else {
      setCreateOptions( newOptions );
    }

    setHasSpinner(false);
  }
}
