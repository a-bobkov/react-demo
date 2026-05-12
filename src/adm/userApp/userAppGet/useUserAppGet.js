import { useMemo, useState } from 'react';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { getUser } from './getUser.js';

export function useUserAppGet( userId )
{
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
      apiNotifications.addError({
        en: 'User id not found because of incorrect URL',
        de: 'Benutzer-ID nicht gefunden, da URL falsch ist',
      });

      return new Error();
    }
  }

  async function loadingUser()
  {
    if ( userId === undefined )
    {
      return;
    }

    try
    {
      const result = await getUser( userId );

      setUser( result.user );
    }
    catch ( error )
    {
      apiNotifications.addError({
        en: `Error getting user ${ userId }: ${ error.message }`,
        de: `Fehler beim Abrufen des Benutzers ${ userId }: ${ error.message }`,
      });

      setUser( error );
    }
  }
}
