import { useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { fetchUser } from './fetchUser.js';

export function useUserAppGet( userId )
{
  const { lingo } = useLingo();

  const [ user, setUser ] = useState();

  const [ userGetError, setUserGetError ] = useState( initialUserGetError );

  return {
    user,
    userGetError,
  };

  function initialUserGetError()
  {
    if ( userId === undefined )
    {
      const userIdErrorMessage = lingo({
        en: 'User id not found because of incorrect URL',
        de: 'Benutzer-ID nicht gefunden, da URL falsch ist',
      });

      return new Error( userIdErrorMessage );
    }

    loadingUser();
  }

  async function loadingUser()
  {
    try
    {
      const result = await fetchUser( userId, lingo );

      setUser( result.user );
    }
    catch ( error )
    {
      const userGetErrorMessage = lingo({
        en: `Error getting user ${ userId }`,
        de: `Fehler beim Abrufen des Benutzers ${ userId }`,
      });

      setUserGetError( new Error( userGetErrorMessage, { cause: error }));
    }
  }
}
