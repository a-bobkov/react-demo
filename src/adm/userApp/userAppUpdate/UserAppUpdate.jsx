import { useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { UserForm } from '../form/UserForm.jsx';
import { updateUser } from './updateUser.js';

export function UserAppUpdate({ user, subordinates })
{
  console.log(`UserAppUpdate user: ${ JSON.stringify( user )}`);

  const { lingo } = useLingo();

  const apiNotifications = useNotificationsContext();

  const [ userOptions, setUserOptions ] = useState( createInitialUserOptions );

  return (
    <UserForm
      key={ userOptions.id }
      userOptions={ userOptions }
      subordinates={ subordinates }
      onClickSaveUser={ onClickUpdateUser }
    />
  );

  function createInitialUserOptions()
  {
    return identifyOptions({
      dbUser: user,
      submitUser: user,
    });
  }

  async function onClickUpdateUser( formUser, dbUser )
  {
    const result = await updateDbUser( formUser );

    if ( result instanceof Error )
    {
      apiNotifications.addError( lingo({
        en: `Error: ${ result.message }`,
        de: `Fehler: ${ result.message }`,
      }));

      return false;
    }

    if ( result.error )
    {
      setIdentifiedUserOptions({
        dbUser: dbUser,
        submitUser: formUser,
        submitErrors: result.error,
      });

      return false;
    }

    if ( result.user )
    {
      setIdentifiedUserOptions({
        dbUser: result.user,
        submitUser: result.user,
      });

      apiNotifications.addInfo( lingo({
        en: `User ${ result.user.id } is successfully updated.`,
        de: `Benutzer ${ result.user.id } wurde erfolgreich aktualisiert.`,
      }));

      return true;
    }
  }

  async function updateDbUser( formUser )
  {
    try {
      return await updateUser( formUser, lingo );
    }
    catch ( error )
    {
      return error;
    }
  }

  function setIdentifiedUserOptions( newUserOptions )
  {
    setUserOptions( identifyOptions( newUserOptions ));
  }
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit

  return options;
}
