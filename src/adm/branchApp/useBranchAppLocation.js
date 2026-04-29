import { useMemo, useState } from 'react';
import { usePopstate } from '../usePopstate.js';
import { updateHistoryEntry } from '../PopstateLink.jsx';
import { branchPath } from '../useAppLocation.js';

export const branchListPath = `${ branchPath }/list`;
export const branchGetPath = `${ branchPath }/edit`;
export const branchCreatePath = `${ branchPath }/new`;

const BRANCH_APP_LIST_LOCATION = 'BRANCH_APP_LIST_LOCATION';
const BRANCH_APP_GET_LOCATION = 'BRANCH_APP_GET_LOCATION';
const BRANCH_APP_CREATE_LOCATION = 'BRANCH_APP_CREATE_LOCATION';

export function useBranchAppLocation()
{
  const [ branchAppLocation, setBranchAppLocation ] = useState( getBranchAppLocation );

  usePopstate( dispatchBranchAppPath );

  const branchAppLocationApi = useMemo(
    () => createBranchAppLocationApi({ branchAppLocation }),
    [ branchAppLocation ],
  );

  return {
    branchAppLocationApi: branchAppLocationApi,
  };

  function dispatchBranchAppPath()
  {
    setBranchAppLocation( getBranchAppLocation() );
  }
}

function createBranchAppLocationApi({ branchAppLocation })
{
  return {
    isBranchAppListLocation: isBranchAppListLocation,
    isBranchAppGetLocation: isBranchAppGetLocation,
    isBranchAppCreateLocation: isBranchAppCreateLocation,
  };

  function isBranchAppListLocation()
  {
    return branchAppLocation === BRANCH_APP_LIST_LOCATION;
  }

  function isBranchAppGetLocation()
  {
    return branchAppLocation === BRANCH_APP_GET_LOCATION;
  }

  function isBranchAppCreateLocation()
  {
    return branchAppLocation === BRANCH_APP_CREATE_LOCATION;
  }
}

function getBranchAppLocation()
{
  if ( isBranchAppRootPath())
  {
    updateHistoryEntry( branchListPath );
  }

  if ( isBranchAppListPath())
  {
    return BRANCH_APP_LIST_LOCATION;
  }

  if ( isBranchAppGetPath())
  {
    return BRANCH_APP_GET_LOCATION;
  }

  if ( isBranchAppCreatePath())
  {
    return BRANCH_APP_CREATE_LOCATION;
  }
}

function isBranchAppRootPath()
{
  return window.location.pathname === branchPath;
}

function isBranchAppListPath()
{
  const branchAppListPathRegexp = new RegExp(`^${ branchListPath }\\b`);

  return Boolean( window.location.pathname.match( branchAppListPathRegexp ));
}

function isBranchAppGetPath()
{
  const branchAppGetPathRegexp = new RegExp(`^${ branchGetPath }\\b`);

  return Boolean( window.location.pathname.match( branchAppGetPathRegexp ));
}

function isBranchAppCreatePath()
{
  const branchAppCreatePathRegexp = new RegExp(`^${ branchCreatePath }\\b`);

  return Boolean( window.location.pathname.match( branchAppCreatePathRegexp ));
}
