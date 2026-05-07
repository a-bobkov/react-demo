import { useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useUserAppListLocation } from './useUserAppListLocation.js';
import { queryUser } from './queryUser.js';
import { UserAppList } from './UserAppList.jsx';

export function UserAppListPage({ subordinates })
{
  const { lingo } = useLingo();

  const { userAppListLocationOptions, setUserAppListLocationOptions } = useUserAppListLocation();

  const [ users, setUsers ] = useState( initialLoadingUsers );

  if ( subordinates === undefined )
  {
    return lingo ({
      en: 'Waiting for subordinates...',
      de: 'Warten auf Untergebene...',
    });
  }

  return <UserAppList
    listOptions={ userAppListLocationOptions }
    subordinates={ subordinates }
    users={ users }
    setListOptions={ setListOptions }
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
    const newUsers = await queryUser( options );

    if ( newUsers )   // fetch was not aborted
    {
      Object.assign( newUsers, window.structuredClone( options ));

      setUsers( newUsers );
    }
  }
}
