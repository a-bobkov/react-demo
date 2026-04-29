import { useState } from 'react';
import { useBranchAppListLocation } from './useBranchAppListLocation.js';
import { fetchBranches } from './fetchBranches.js';
import { BranchAppList } from './BranchAppList.jsx';

export function BranchAppListPage()
{
  const { branchAppListLocationOptions, setBranchAppListLocationOptions } = useBranchAppListLocation();

  const [ branches, setBranches ] = useState( initialLoadingBranches );

  return <BranchAppList
    listOptions={ branchAppListLocationOptions }
    setListOptions={ setListOptions }
    branches={ branches }
  />;

  function initialLoadingBranches()
  {
    loadingBranches( branchAppListLocationOptions );
  }

  function setListOptions( options )
  {
    loadingBranches( options );

    setBranchAppListLocationOptions( options );
  }

  function loadingBranches( options )
  {
    const promise = loadBranches( options );
  }

  async function loadBranches( options )
  {
    const newBranches = await fetchBranches( options );

    if ( newBranches )   // fetch was not aborted
    {
      Object.assign( newBranches, window.structuredClone( options ));

      setBranches( newBranches );
    }
  }
}
