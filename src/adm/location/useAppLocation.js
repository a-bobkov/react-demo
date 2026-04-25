import { useRunOnce } from '../useRunOnce.js';

export function useAppLocation()
{
  const appLocationApi = useRunOnce( createAppLocationApi, {} );

  return { appLocationApi };
}

function createAppLocationApi({})
{
  return {
    isUserPath: isUserPath,
    getUserPath: getUserPath,

    isBranchPath: isBranchPath,
    getBranchPath: getBranchPath,

    goPath: goPath,
  };
}

function getUserPath()
{
  return '/user';
}

function isUserPath()
{
  return window.location.pathname.startsWith( getUserPath()); // todo: check end of segment
}

function getBranchPath()
{
  return '/branch';
}

function isBranchPath()
{
  return window.location.pathname.startsWith( getBranchPath()); // todo: check end of segment
}

function goPath( path )
{
  window.history.pushState(null, null, path );

  window.dispatchEvent( new Event('popstate'));
}
