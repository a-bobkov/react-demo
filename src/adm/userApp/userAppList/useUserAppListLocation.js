import { useState } from 'react';
import { saveFilter, loadFilter } from './filters/UserFilters.jsx';
import { saveSorting, loadSorting } from './sorting/usersSortingSearchParams.js';
import { savePagination, loadPagination } from './pagination/usersPaginationSearchParams.js';
import { updateHistoryEntry } from '../../PopstateLink.jsx';
import { userListPath } from '../useUserAppLocation.js';

export function getUserListFullPath( options )
{
  const searchParams = new URLSearchParams( window.location.search );

  saveFilter( searchParams, options.filter );
  saveSorting( searchParams, options.sorting );
  savePagination( searchParams, options.pagination );

  return `${ userListPath }?${ searchParams }`;
}

export function useUserAppListLocation()
{
  const [ userAppListLocation, setUserAppListLocation ] = useState( createUserAppListLocation );

  return {
    userAppListOptions: userAppListLocation,
    setUserAppListOptions: setUserAppListOptions,
  };

  function setUserAppListOptions( options )
  {
    saveUsersOptions( options );

    setUserAppListLocation( options );
  }
}

function createUserAppListLocation()
{
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

  return options;
}

function saveUsersOptions( options )
{
  updateHistoryEntry( getUserListFullPath( options ));
}

function loadUsersOptions()
{
  const searchParams = new URLSearchParams( window.location.search );

  return {
    filter: loadFilter( searchParams ),
    sorting: loadSorting( searchParams ),
    pagination: loadPagination( searchParams ),
  };
}
