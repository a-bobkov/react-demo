import { useState } from 'react';
import { clsx } from 'clsx/lite';
import { UserForm } from '../form/UserForm.jsx';
import { updateUser } from './updateUser.js';
import './UserAppUpdate.css';

export function UserAppUpdate({ updateOptions, setUpdateOptions, setModeList })
{
  const [ hasSpinner, setHasSpinner ] = useState( false );

  console.log(`UserAppEdit updateOptions: ${ JSON.stringify( updateOptions )}`);

  return (
    <div className={ clsx('UserApp', hasSpinner && 'hasSpinner')}>
      <UserForm
        key={ updateOptions.id }
        userResolve={ updateOptions }
        onSaveUser={ onClickUpdateUser }
        setModeList={ setModeList }
      />
    </div>
  );

  async function onClickUpdateUser( user )
  {
    setHasSpinner(true);

    const newUpdateOptions = await updateUser( user );

    if (newUpdateOptions.error) {
      newUpdateOptions.user = user;
    }

    setUpdateOptions( newUpdateOptions );

    setHasSpinner(false);
  }
}
