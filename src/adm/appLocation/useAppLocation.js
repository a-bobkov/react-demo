import { useState, useMemo } from 'react';
import { usePopstate } from '../usePopstate.js';

const USER_APP_LOCATION = 'USER_APP_LOCATION';
const BRANCH_APP_LOCATION = 'BRANCH_APP_LOCATION';

export function useAppLocation()
{
  const [ appLocation, setAppLocation ] = useState( getAppLocation );

  const getAppLocationApi = useMemo(
    () => createGetAppLocationApi({ appLocation }),
    [ appLocation ],
  );

  const [ setAppLocationApi ] = useState( createSetAppLocationApi );

  usePopstate( dispatchAppPath );

  return {
    getAppLocationApi,
    setAppLocationApi,
  };

  function dispatchAppPath()
  {
    setAppLocation( getAppLocation() );
  }
}

function createGetAppLocationApi({ appLocation })
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

function createSetAppLocationApi()
{
  return {
    getUserPath: getUserPath,
    getBranchPath: getBranchPath,
  };
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

function getUserPath()
{
  return '/user';
}

function isUserPath()
{
  const userAppPathRegexp = new RegExp(`^${ getUserPath() }\\b`);

  return window.location.pathname.match( userAppPathRegexp );
}

function getBranchPath()
{
  return '/branch';
}

function isBranchPath()
{
  const branchAppPathRegexp = new RegExp(`^${ getBranchPath() }\\b`);

  return window.location.pathname.match( branchAppPathRegexp );
}
