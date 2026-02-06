import { useState } from 'react';
import { loadUsersOptions, saveUsersOptions } from '../usersSearchParams.js';

export function useAppList()
{
  const [ listOptions, setOptions ] = useState( createInitialListOptions );

  return { listOptions, setListOptions, locationUrlList, isListPath };

  function setListOptions( newListOptions )
  {
    locationUrlList( newListOptions );

    setOptions( newListOptions );
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

  return options;
}
