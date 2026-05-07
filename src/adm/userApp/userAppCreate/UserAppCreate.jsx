import { useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { UserForm } from '../form/UserForm.jsx';
import { createUser } from './createUser.js';

export function UserAppCreate({ user, subordinates, setCreatedUser })
{
  const { lingo } = useLingo();

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

    if ( result.user )
    {
      setCreatedUser( result.user );

      apiNotifications.addInfo( lingo({
        en: `User ${ result.user.id } is successfully created.`,
        de: `Benutzer ${ result.user.id } wurde erfolgreich erstellt.`,
      }));

      return true;
    }

    setUserOptions( identifyOptions({
      dbUser: dbUser,
      submitUser: formUser,
      submitErrors: result.error,
      fetchCommonError: result.fetchCommonError,
    }));

    return false;
  }

  async function createDbUser( formUser )
  {
    try {
      return await createUser( formUser, lingo );
    }
    catch (error) {
      apiNotifications.addError( lingo({
        en: `Error: ${ error.message }`,
        de: `Fehler: ${ error.message }`,
      }));

      return {
        fetchCommonError: error,
      }
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
