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

    const promise = createGetPromise( userId );

    setOptions({
      userId,
    });
  }

  function createInitialGetOptions()
  {
    const userId = getPathId();

    if ( userId == null) return;

    const promise = createGetPromise( userId );

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
  return getPathId() != null;
}

function getPathId()
{
  const pathname = window.location.pathname;

  const [, userId] = pathname.match(/^\/user\/edit\/(\d+)$/) ?? [];

  return userId;
}

function locationUrlGet( userId )
{
  const newUrl = `/user/edit/${ userId }`;

  if ( window.location.pathname !== newUrl )
  {
    window.history.replaceState(null, null, newUrl );
  }
}
