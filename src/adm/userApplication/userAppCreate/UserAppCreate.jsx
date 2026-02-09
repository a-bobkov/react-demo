import { UserForm } from '../form/UserForm.jsx';
import { createUser } from './createUser.js';

export function UserAppCreate({ createOptions, setCreateOptions, setModeUpdate, setModeList })
{
  console.log(`UserAppCreate createOptions: ${ JSON.stringify( createOptions )}`);

  return (
    <UserForm
      key={ createOptions.id }
      userOptions={ createOptions }
      onClickSaveUser={ onClickCreateUser }
      setModeList={ setModeList }
    />
  );

  async function onClickCreateUser( user )
  {
    const newCreateOptions = await createUser( user );

    if ( newCreateOptions.error ) {
      newCreateOptions.user = user;
    }

    if ( newCreateOptions.user.id ) {
      setModeUpdate( newCreateOptions );
    } else {
      setCreateOptions( newCreateOptions );
    }

    return newCreateOptions;
  }
}
