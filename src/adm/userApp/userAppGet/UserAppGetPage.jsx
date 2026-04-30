import { useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { fetchUser } from './fetchUser.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { useUserAppGetLocation } from './useUserAppGetLocation.js';
import { UserAppGet } from './UserAppGet.jsx';
import { UserAppUpdate } from '../userAppUpdate/UserAppUpdate.jsx';

export function UserAppGetPage()
{
  const { lingo } = useLingo();

  const apiNotifications = useNotificationsContext();

  const { userId } = useUserAppGetLocation();

  const [ getOptions, setGetOptions ] = useState( createInitialGetOptions );

  const [ updateOptions, setUpdateOptions ] = useState();

  if ( updateOptions ) {
    return (
      <UserAppUpdate
        updateOptions={ updateOptions }
        setUpdateOptions={ setIdentifiedUpdateOptions }
      />
    );
  }

  if ( getOptions ) {
    return (
      <UserAppGet
        getOptions={ getOptions }
      />
    );
  }

  return lingo({
    en: 'User id not found because of incorrect URL',
    de: 'Benutzer-ID nicht gefunden, da URL falsch ist',
  });

  function setIdentifiedUpdateOptions( newUpdateOptions )
  {
    identifyOptions( newUpdateOptions );

    setUpdateOptions( newUpdateOptions );
  }

  function createInitialGetOptions()
  {
    if ( userId === undefined ) return;

    const promise = createGetPromise( userId );

    return {
      userId,
    };
  }

  async function createGetPromise( userId )
  {
    const result = await getFormUser( userId );

    if ( result.user )
    {
      setIdentifiedUpdateOptions({
        dbUser: result.user,
        submitUser: result.user,
      });
    }
    else
    {
      setGetOptions({
        userId,
        fetchCommonError: result.fetchCommonError,
      });
    }
  }

  async function getFormUser( userId )
  {
    try {
      return await fetchUser( userId, lingo );
    }
    catch (error)
    {
      apiNotifications.addError( lingo({
        en: `Error: ${ error.message }`,
        de: `Fehler: ${ error.message }`,
      }));

      return {
        fetchCommonError: error,
      }
    }
  }
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit
}
