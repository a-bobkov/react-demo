import { useState } from 'react';
import { fetchUser } from './fetchUser.js';

export function useAppGet( setModeUpdate )
{
  const [ getOptions, setOptions ] = useState( createInitialGetOptions );

  return { getOptions, setUserId, isGetPath };

  function setUserId( userId )
  {
    locationUrlGet( userId );

    const getPromise = createGetPromise( userId );

    setOptions({
      userId,
    });
  }

  function createInitialGetOptions()
  {
    const pathname = window.location.pathname;

    const [, userId] = pathname.match(/^\/user\/edit\/(\d+)$/) ?? [];

    if ( userId == null) return;

    const getPromise = createGetPromise( userId );

    return {
      userId: parseInt( userId ),
    };
  }

  async function createGetPromise( userId )
  {
    try {
      const getResult = await fetchUser( userId );
      setModeUpdate( getResult );
    } catch( error ) {
      setOptions({
        userId,
        error,
      });
    }
  }
}

function isGetPath()
{
  const pathname = window.location.pathname;

  return Boolean( pathname.match(/^\/user\/edit\/(\d+)$/));
}

function locationUrlGet( userId )
{
  const newUrl = `/user/edit/${ userId }`;

  if ( window.location.pathname !== newUrl )
  {
    window.history.replaceState(null, null, newUrl );
  }
}
