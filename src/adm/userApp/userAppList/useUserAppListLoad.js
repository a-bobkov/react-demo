import { useMemo, useState } from 'react';
import { singleUserQuery } from './query/singleUserQuery.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';

export function useUserAppListLoad( options )
{
  const apiNotifications = useNotificationsContext();

  const [ users, setUsers ] = useState();

  const ignore = useMemo(
    () => loadUsers( options ),
    [ options ]
  );

  return {
    users,
  };

  async function loadUsers( options )
  {
    try {
      const newUsers = await singleUserQuery( options );

      if ( newUsers )   // fetch was not aborted
      {
        Object.assign( newUsers, window.structuredClone( options ));

        setUsers( newUsers );
      }
    }
    catch ( error )
    {
      apiNotifications.addError({
        en: `Error while requesting users: ${ error.message }`,
        de: `Fehler beim Anfordern der Benutzer: ${ error.message }`,
      });

      setUsers( error );
    }
  }
}
