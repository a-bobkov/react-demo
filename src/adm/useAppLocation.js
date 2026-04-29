import { useState, useMemo } from 'react';
import { usePopstate } from './usePopstate.js';

export const userPath = '/user';
export const branchPath = '/branch';

const USER_APP_LOCATION = 'USER_APP_LOCATION';
const BRANCH_APP_LOCATION = 'BRANCH_APP_LOCATION';

export function useAppLocation()
{
  const [ appLocation, setAppLocation ] = useState( getAppLocation );

  usePopstate( dispatchAppPath );

  const appLocationApi = useMemo(
    () => createAppLocationApi({ appLocation }),
    [ appLocation ],
  );

  return {
    appLocationApi: appLocationApi,
  };

  function dispatchAppPath()
  {
    setAppLocation( getAppLocation());
  }
}

function createAppLocationApi({ appLocation })
{
  return {
    isUserLocation: isUserLocation,
    isBranchLocation: isBranchLocation,
  };

  function isUserLocation()
  {
    return appLocation === USER_APP_LOCATION;
  }

  function isBranchLocation()
  {
    return appLocation === BRANCH_APP_LOCATION;
  }
}

function getAppLocation()
{
  if ( isUserPath())
  {
    return USER_APP_LOCATION;
  }

  if ( isBranchPath())
  {
    return BRANCH_APP_LOCATION;
  }
}

function isUserPath()
{
  const userAppPathRegexp = new RegExp(`^${ userPath }\\b`);

  return Boolean( window.location.pathname.match( userAppPathRegexp ));
}

function isBranchPath()
{
  const branchAppPathRegexp = new RegExp(`^${ branchPath }\\b`);

  return Boolean( window.location.pathname.match( branchAppPathRegexp ));
}
