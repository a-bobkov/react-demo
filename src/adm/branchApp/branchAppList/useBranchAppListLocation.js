import { useState } from 'react';
import { saveFilter, loadFilter } from './filter/BranchesFilter.jsx';
import { saveSorting, loadSorting } from './sorting/branchesSortingSearchParams.js';
import { savePagination, loadPagination } from './pagination/branchesPaginationSearchParams.js';
import { updateHistoryEntry } from '../../PopstateLink.jsx';
import { branchListPath } from '../useBranchAppLocation.js';

export function getBranchListFullPath( options )
{
  const searchParams = new URLSearchParams();

  saveFilter( searchParams, options.filter );
  saveSorting( searchParams, options.sorting );
  savePagination( searchParams, options.pagination );

  return `${ branchListPath }?${ searchParams }`;
}

export function useBranchAppListLocation()
{
  const [ branchAppListLocation, setBranchAppListLocation ] = useState( createBranchAppListLocation );

  return {
    branchAppListLocationOptions: branchAppListLocation,
    setBranchAppListLocationOptions: setBranchAppListOptions,
  };

  function setBranchAppListOptions( options )
  {
    saveBranchesOptions( options );

    setBranchAppListLocation( options );
  }
}

function createBranchAppListLocation()
{
  const loadedOptions = loadBranchesOptions();

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

  saveBranchesOptions( options );

  return options;
}

function saveBranchesOptions( options )
{
  updateHistoryEntry( getBranchListFullPath( options ));
}

function loadBranchesOptions()
{
  const searchParams = new URL( window.location ).searchParams;

  return {
    filter: loadFilter( searchParams ),
    sorting: loadSorting( searchParams ),
    pagination: loadPagination( searchParams ),
  };
}
