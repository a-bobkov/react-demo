import { useState } from 'react';
import { useUserAppListLocation } from './useUserAppListLocation.js';
import { fetchUsers } from './fetchUsers.js';
import { UserAppList } from './UserAppList.jsx';

export function UserAppListPage()
{
  const { userAppListLocationOptions, setUserAppListLocationOptions } = useUserAppListLocation();

  const [ users, setUsers ] = useState( initialLoadingUsers );

  return <UserAppList
    listOptions={ userAppListLocationOptions }
    setListOptions={ setListOptions }
    users={ users }
  />;

  function initialLoadingUsers()
  {
    loadingUsers( userAppListLocationOptions );
  }

  function setListOptions( options )
  {
    loadingUsers( options );

    setUserAppListLocationOptions( options );
  }

  function loadingUsers( options )
  {
    const promise = loadUsers( options );
  }

  async function loadUsers( options )
  {
    const newUsers = await fetchUsers( options );

    if ( newUsers )   // fetch was not aborted
    {
      Object.assign( newUsers, window.structuredClone( options ));

      setUsers( newUsers );
    }
  }
}
