import { branchGetPath } from '../useBranchAppLocation.js';

export function getBranchGetFullPath( branchId )
{
  return `${ branchGetPath }/${ branchId }`;
}

export function useBranchAppGetLocation()
{
  const branchId = getBranchAppGetId();

  return {
    branchId,
  };
}

function getBranchAppGetId()
{
  const branchAppGetPathRegexp = new RegExp(`^${ getBranchGetFullPath('(\\d+)') }\\b`);

  const [, branchId] = window.location.pathname.match( branchAppGetPathRegexp ) ?? [];

  return branchId && parseInt( branchId );
}
