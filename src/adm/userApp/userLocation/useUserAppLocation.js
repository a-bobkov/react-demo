import { useMemo, useState } from 'react';
import { useRunOnce } from '../../useRunOnce.js';
import { usePopstate } from '../../usePopstate.js';
import { updatePopstatePath } from '../../PopstateLink.jsx';

const USER_APP_LIST_LOCATION = 'USER_APP_LIST_LOCATION';
const USER_APP_GET_LOCATION = 'USER_APP_GET_LOCATION';
const USER_APP_CREATE_LOCATION = 'USER_APP_CREATE_LOCATION';

export function useUserAppLocation( prefixPath )
{
  const [ userAppLocation, setUserAppLocation ] = useState( getUserAppLocation );

  const getUserAppLocationApi = useMemo(
    () => createGetUserAppLocationApi({ userAppLocation }),
    [ userAppLocation ],
  );

  const setUserAppLocationApi = useRunOnce( createSetUserAppLocationApi, { prefixPath });

  usePopstate( dispatchUserAppPath );

  return {
    getUserAppLocationApi,
    setUserAppLocationApi,
  };

  function dispatchUserAppPath()
  {
    setUserAppLocation( getUserAppLocation() );
  }
}

function createGetUserAppLocationApi({ userAppLocation })
{
  return {
    isUserAppListLocation: isUserAppListLocation,
    isUserAppGetLocation: isUserAppGetLocation,
    isUserAppCreateLocation: isUserAppCreateLocation,
    getUserAppGetId: getUserAppGetId,
  };

  function isUserAppListLocation()
  {
    return userAppLocation === USER_APP_LIST_LOCATION;
  }

  function isUserAppGetLocation()
  {
    return userAppLocation === USER_APP_GET_LOCATION;
  }

  function isUserAppCreateLocation()
  {
    return userAppLocation === USER_APP_CREATE_LOCATION;
  }
}

function createSetUserAppLocationApi({ prefixPath })
{
  return {
    getUserAppListPath: getUserAppListPath,
    getUserAppGetPath: getUserAppGetPath,
    getUserAppCreatePath: getUserAppCreatePath,
  };
}

function getUserAppLocation()
{
  if ( isUserAppRootPath())
  {
    updatePopstatePath( getUserAppListPath());
  }

  if ( isUserAppListPath())
  {
    return USER_APP_LIST_LOCATION;
  }

  if ( isUserAppGetPath())
  {
    return USER_APP_GET_LOCATION;
  }

  if ( isUserAppCreatePath())
  {
    return USER_APP_CREATE_LOCATION;
  }
}

const prefixPath = '/user';

function isUserAppRootPath()
{
  return window.location.pathname === prefixPath;
}

function getUserAppListPath()
{
  return `${ prefixPath }/list`;
}

function isUserAppListPath()
{
  const userAppListPathRegexp = new RegExp(`^${ getUserAppListPath() }\\b`);

  return Boolean( window.location.pathname.match( userAppListPathRegexp ));
}

function getUserAppGetPath( userId )
{
  return `${ prefixPath }/edit/${ userId }`;
}

function isUserAppGetPath()
{
  return getUserAppGetId() !== undefined;
}

function getUserAppGetId()
{
  const userAppGetPathRegexp = new RegExp(`^${ getUserAppGetPath('(\\d+)') }\\b`);

  const [, userId] = window.location.pathname.match( userAppGetPathRegexp ) ?? [];

  return userId && parseInt( userId );
}

function getUserAppCreatePath()
{
  return `${ prefixPath }/new`;
}

function isUserAppCreatePath()
{
  const userAppCreatePathRegexp = new RegExp(`^${ getUserAppCreatePath() }\\b`);

  return Boolean( window.location.pathname.match( userAppCreatePathRegexp ));
}
