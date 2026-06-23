import { useState } from 'react';
import { useMemoArg } from './useMemoArg.js';
import { usePopstate } from './usePopstate.js';
import { updateHistoryEntry } from './PopstateLink.jsx';

const admRootPath = '/';

export const userPath = '/user';
export const branchPath = '/branch';

const USER_APP_LOCATION = 'USER_APP_LOCATION';
const BRANCH_APP_LOCATION = 'BRANCH_APP_LOCATION';

export function useAdmLocation()
{
  const [ admLocation, setAdmLocation ] = useState( getAdmLocation );

  usePopstate( dispatchAdmPath );

  const admLocationApi = useMemoArg(
    createAdmLocationApi,
    { admLocation }
  );

  return {
    admLocationApi,
  };

  function dispatchAdmPath()
  {
    setAdmLocation( getAdmLocation());
  }
}

function createAdmLocationApi({ admLocation })
{
  return {
    isUserLocation: isUserLocation,
    isBranchLocation: isBranchLocation,
  };

  function isUserLocation()
  {
    return admLocation === USER_APP_LOCATION;
  }

  function isBranchLocation()
  {
    return admLocation === BRANCH_APP_LOCATION;
  }
}

function getAdmLocation()
{
  if ( isRootPath())
  {
    updateHistoryEntry( userPath );
  }

  if ( isUserPath())
  {
    return USER_APP_LOCATION;
  }

  if ( isBranchPath())
  {
    return BRANCH_APP_LOCATION;
  }
}

function isRootPath()
{
  return window.location.pathname === admRootPath;
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
