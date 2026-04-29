import { useMemo, useState } from 'react';
import { usePopstate } from '../usePopstate.js';
import { updateHistoryEntry } from '../PopstateLink.jsx';
import { userPath } from '../useAppLocation.js';

export const userListPath = `${ userPath }/list`;
export const userGetPath = `${ userPath }/edit`;
export const userCreatePath = `${ userPath }/new`;

const USER_APP_LIST_LOCATION = 'USER_APP_LIST_LOCATION';
const USER_APP_GET_LOCATION = 'USER_APP_GET_LOCATION';
const USER_APP_CREATE_LOCATION = 'USER_APP_CREATE_LOCATION';

export function useUserAppLocation()
{
  const [ userAppLocation, setUserAppLocation ] = useState( getUserAppLocation );

  usePopstate( dispatchUserAppPath );

  const userAppLocationApi = useMemo(
    () => createGetUserAppLocationApi({ userAppLocation }),
    [ userAppLocation ],
  );

  return {
    userAppLocationApi: userAppLocationApi,
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

function getUserAppLocation()
{
  if ( isUserAppRootPath())
  {
    updateHistoryEntry( userListPath );
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

function isUserAppRootPath()
{
  return window.location.pathname === userPath;
}

function isUserAppListPath()
{
  const userAppListPathRegexp = new RegExp(`^${ userListPath }\\b`);

  return Boolean( window.location.pathname.match( userAppListPathRegexp ));
}

function isUserAppGetPath()
{
  const userAppGetPathRegexp = new RegExp(`^${ userGetPath }\\b`);

  return Boolean( window.location.pathname.match( userAppGetPathRegexp ));
}

function isUserAppCreatePath()
{
  const userAppCreatePathRegexp = new RegExp(`^${ userCreatePath }\\b`);

  return Boolean( window.location.pathname.match( userAppCreatePathRegexp ));
}
