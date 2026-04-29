import { userGetPath } from '../useUserAppLocation.js';

export function getUserGetFullPath( userId )
{
  return `${ userGetPath }/${ userId }`;
}

export function useUserAppGetLocation()
{
  const userId = getUserAppGetId();

  return {
    userId,
  };
}

function getUserAppGetId()
{
  const userAppGetPathRegexp = new RegExp(`^${ getUserGetFullPath('(\\d+)') }\\b`);

  const [, userId] = window.location.pathname.match( userAppGetPathRegexp ) ?? [];

  return userId && parseInt( userId );
}
