import { useState } from 'react';
import { fetchUsers } from './fetchUsers.js';
import { UserAppList } from './UserAppList.jsx';
import { useUserLocationContext } from '../userLocation/UserLocationProvider.jsx';
import { loadUsersOptions, saveUsersOptions } from './usersSearchParams.js';

export function UserAppListPage()
{
  const userLocationApi = useUserLocationContext();

  const [ listOptions, setOptions ] = useState( createListOptions );

  return <UserAppList
    listOptions={ listOptions }
    setListOptions={ setListOptions }
  />;

  function createListOptions()
  {
    if ( !userLocationApi.isUserListPath() ) return;

    const loadedOptions = loadUsersOptions();

    const defaultOptions = {
      filter: {},
      sorting: {},
      pagination: {
        size: 10,
        count: 1,
      },
    };

    const options = {
      filter: Object.assign( defaultOptions.filter, loadedOptions.filter ),
      sorting: Object.assign( defaultOptions.sorting, loadedOptions.sorting ),
      pagination: Object.assign( defaultOptions.pagination, loadedOptions.pagination ),
    };

    saveUsersOptions( options );

    return loadingUsers( options );
  }

  function setListOptions( options )
  {
    saveUsersOptions( options );

    setOptions( loadingUsers( options ));
  }

  function loadingUsers( options )
  {
    options.isLoading = true;

    const promise = loadUsers( options );

    return options;
  }

  async function loadUsers( options )
  {
    const newOptions = {
      ...options,
      users: await fetchUsers( options ),
      isLoading: false,
    };

    if ( newOptions.users ) {   // fetch was not aborted
      setOptions( newOptions );
    }
  }
}
