import { useMemo, useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { getUser } from './getUser.js';

export function useUserAppGet( userId )
{
  const { lingo } = useLingo();

  const apiNotifications = useNotificationsContext();

  const [ user, setUser ] = useState( checkUserId );

  const ignore = useMemo(
    loadingUser,
    []
  );

  return {
    user,
  };

  function checkUserId()
  {
    if ( userId === undefined )
    {
      const userIdErrorMessage = lingo({
        en: 'User id not found because of incorrect URL',
        de: 'Benutzer-ID nicht gefunden, da URL falsch ist',
      });

      apiNotifications.addError( userIdErrorMessage );

      return new Error( userIdErrorMessage );
    }
  }

  async function loadingUser()
  {
    if ( userId === undefined ) return;

    try
    {
      const result = await getUser( userId, lingo );

      setUser( result.user );
    }
    catch ( error )
    {
      const userGetErrorMessage = lingo({
        en: `Error getting user ${ userId }`,
        de: `Fehler beim Abrufen des Benutzers ${ userId }`,
      });

      apiNotifications.addError( userGetErrorMessage );

      setUser( new Error( userGetErrorMessage, { cause: error }));
    }
  }
}
