import { saveFilter, loadFilter } from './filter/BranchesFilter.jsx';
import { saveSorting, loadSorting } from './sorting/branchesSortingSearchParams.js';
import { savePagination, loadPagination } from './pagination/branchesPaginationSearchParams.js';

export function saveBranchesOptions( options )
{
  const searchParams = new URLSearchParams();

  saveFilter( searchParams, options.filter );
  saveSorting( searchParams, options.sorting );
  savePagination( searchParams, options.pagination );

  const hasSearchParams = [...searchParams.keys()].length > 0;

  const url = window.location.pathname + (hasSearchParams ? `?${ searchParams }` : '')

  window.history.replaceState(null, null, url );
}

export function loadBranchesOptions()
{
  const searchParams = new URL( window.location ).searchParams;

  return {
    filter: loadFilter( searchParams ),
    sorting: loadSorting( searchParams ),
    pagination: loadPagination( searchParams ),
  };
}
