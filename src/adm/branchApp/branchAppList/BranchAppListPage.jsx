import { useState } from 'react';
import { fetchBranches } from './fetchBranches.js';
import { BranchAppList } from './BranchAppList.jsx';
import { useBranchLocationContext } from '../branchLocation/BranchLocationProvider.jsx';
import { loadBranchesOptions, saveBranchesOptions } from './branchesSearchParams.js';

export function BranchAppListPage()
{
  const branchLocationApi = useBranchLocationContext();

  const [ listOptions, setOptions ] = useState( createListOptions );

  return <BranchAppList
    listOptions={ listOptions }
    setListOptions={ setListOptions }
  />;

  function createListOptions()
  {
    if ( !branchLocationApi.isBranchListPath() ) return;

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

    return loadingBranches( options );
  }

  function setListOptions( options )
  {
    saveBranchesOptions( options );

    setOptions( loadingBranches( options ));
  }

  function loadingBranches( options )
  {
    const promise = loadBranches( options );

    return options;
  }

  async function loadBranches( options )
  {
    const newOptions = {
      ...options,
      branches: await fetchBranches( options ),
    };

    if ( newOptions.branches )   // fetch was not aborted
    {
      newOptions.branches.filter = window.structuredClone( options.filter );
      newOptions.branches.sorting = window.structuredClone( options.sorting );
      newOptions.branches.pagination = window.structuredClone( options.pagination );

      setOptions( newOptions );
    }
  }
}
