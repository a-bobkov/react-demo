import { useState } from 'react';
import { fetchUser } from './fetchUser.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';

export function useAppGet( setModeUpdate )
{
  const apiNotifications = useNotificationsContext();

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
    const result = await getFormUser( userId );

    if ( result.user )
    {
      setModeUpdate({
        dbUser: result.user,
        submitUser: result.user,
      });
    }
    else
    {
      setOptions({
        userId,
        fetchCommonError: result.fetchCommonError,
      });
    }
  }

  async function getFormUser( userId )
  {
    try {
      return await fetchUser( userId );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
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
