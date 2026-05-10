import { useState } from 'react';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { UserForm } from '../form/UserForm.jsx';
import { createUser } from './createUser.js';

export function UserAppCreate({ user, subordinates, setCreatedUser })
{
  const apiNotifications = useNotificationsContext();

  const [ userOptions, setUserOptions ] = useState( createInitialUserOptions );

  console.log(`UserAppCreate createOptions: ${ JSON.stringify( userOptions )}`);

  return (
    <UserForm
      key={ userOptions.id }
      userOptions={ userOptions }
      subordinates={ subordinates }
      onClickSaveUser={ onClickCreateUser }
    />
  );

  async function onClickCreateUser( formUser, dbUser )
  {
    const result = await createDbUser( formUser );

    if ( Error.isError( result ))
    {
      apiNotifications.addError({
        en: `Error creating user: ${ result.message }`,
        de: `Fehler beim Erstellen des Benutzers: ${ result.message }`,
      });

      return false;
    }

    if ( result.error )
    {
      setUserOptions( identifyOptions({
        dbUser: dbUser,
        submitUser: formUser,
        submitErrors: result.error,
      }));

      return false;
    }

    if ( result.user )
    {
      setCreatedUser( result.user );

      apiNotifications.addInfo({
        en: `User ${ result.user.id } is successfully created.`,
        de: `Benutzer ${ result.user.id } wurde erfolgreich erstellt.`,
      });

      return true;
    }
  }

  async function createDbUser( formUser )
  {
    try {
      return await createUser( formUser );
    }
    catch ( error )
    {
      return error;
    }
  }

  function createInitialUserOptions()
  {
    return {
      dbUser: user,
      submitUser: user,
    };
  }
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit

  return options;
}
