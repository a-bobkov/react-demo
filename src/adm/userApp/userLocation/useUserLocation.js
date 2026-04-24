import { useRunOnce } from '../../useRunOnce.js';

export function useUserLocation( prefix )
{
  const userLocationApi = useRunOnce( createUserLocationApi, { prefix } );

  return { userLocationApi };
}

function createUserLocationApi({ prefix })
{
  return {
    isUserRootPath: isUserRootPath,

    isUserListPath: isUserListPath,
    setUserListPath: setUserListPath,
    goUserList: goUserList,

    getUserCreatePath: getUserCreatePath,
    isUserCreatePath: isUserCreatePath,
    goUserCreate: goUserCreate,

    getUserGetPath: getUserGetPath,
    getUserGetId: getUserGetId,
    isUserGetPath: isUserGetPath,
    setUserGetPath: setUserGetPath,
    goUserGet: goUserGet,
  };

  function isUserRootPath()
  {
    return window.location.pathname === prefix;
  }

  function getUserListPath()
  {
    return `${ prefix }/list`;
  }

  function isUserListPath()
  {
    return window.location.pathname === getUserListPath();
  }

  function setUserListPath()
  {
    window.history.replaceState(null, null, getUserListPath());
  }

  function goUserList()
  {
    goPath( getUserListPath() );
  }

  function getUserCreatePath()
  {
    return `${ prefix }/new`;
  }

  function isUserCreatePath()
  {
    return window.location.pathname === getUserCreatePath();
  }

  function goUserCreate()
  {
    goPath( getUserCreatePath() );
  }

  function getUserGetPath( userId )
  {
    return `${ prefix }/edit/${ userId }`;
  }

  function getUserGetId()
  {
    const pathname = window.location.pathname;

    const userEditRegexp = new RegExp(`^${ getUserGetPath('(\\d+)') }$`);

    const [, userId] = pathname.match( userEditRegexp ) ?? [];

    return userId && parseInt( userId );
  }

  function isUserGetPath()
  {
    return getUserGetId() !== undefined;
  }

  function setUserGetPath( userId )
  {
    window.history.replaceState(null, null, getUserGetPath( userId ));
  }

  function goUserGet( userId )
  {
    goPath( getUserGetPath( userId ));
  }
}

function goPath( path )
{
  window.history.pushState(null, null, path );

  window.dispatchEvent( new Event('popstate'));
}
