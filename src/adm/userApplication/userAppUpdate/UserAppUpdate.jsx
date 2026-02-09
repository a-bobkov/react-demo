import { UserForm } from '../form/UserForm.jsx';
import { updateUser } from './updateUser.js';

export function UserAppUpdate({ updateOptions, setUpdateOptions, setModeList })
{
  console.log(`UserAppUpdate updateOptions: ${ JSON.stringify( updateOptions )}`);

  return (
    <UserForm
      key={ updateOptions.id }
      userOptions={ updateOptions }
      onClickSaveUser={ onClickUpdateUser }
      setModeList={ setModeList }
    />
  );

  async function onClickUpdateUser( user )
  {
    const newUpdateOptions = await updateUser( user );

    if (newUpdateOptions.error) {
      newUpdateOptions.user = user;
    }

    setUpdateOptions( newUpdateOptions );

    return newUpdateOptions;
  }
}
