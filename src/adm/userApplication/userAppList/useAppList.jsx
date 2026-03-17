import { useState } from 'react';
import { fetchUsers } from './fetchUsers.js';
import { loadUsersOptions, saveUsersOptions } from './usersSearchParams.js';

export function useAppList()
{
  const [ listOptions, setOptions ] = useState( createInitialListOptions );

  return { listOptions, setListOptions, isListPath };

  function createInitialListOptions()
  {
    const defaultOptions = {
      filter: {},
      sorting: {},
      pagination: {
        size: 10,
        count: 1,
      },
    };

    const loadedOptions = loadUsersOptions();

    const options = {
      filter: Object.assign( defaultOptions.filter, loadedOptions.filter ),
      sorting: Object.assign( defaultOptions.sorting, loadedOptions.sorting ),
      pagination: Object.assign( defaultOptions.pagination, loadedOptions.pagination ),
    };

    return isListPath()
      ? loadingUsers( options )
      : options;
  }

  function setListOptions( options )
  {
    locationUrlList( options );

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

function isListPath()
{
  const pathname = window.location.pathname;

  return pathname === '/user/list';
}

function locationUrlList( options )
{
  window.history.replaceState(null, null, '/user/list' );

  saveUsersOptions( options );
}
