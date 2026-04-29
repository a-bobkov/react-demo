import { useState } from 'react';
import { BranchAppCreate } from './BranchAppCreate.jsx';
import { BranchAppUpdate } from '../branchAppUpdate/BranchAppUpdate.jsx';
import { getBranchGetFullPath } from '../branchAppGet/useBranchAppGetLocation.js';
import { updateHistoryEntry } from '../../PopstateLink.jsx';

export function BranchAppCreatePage()
{
  const [ createOptions, setCreateOptions ] = useState( createInitialCreateOptions );

  const [ updateOptions, setUpdateOptions ] = useState();

  return updateOptions
    ? <BranchAppUpdate
      updateOptions={ updateOptions }
      setUpdateOptions={ setIdentifiedUpdateOptions }
    />
    : <BranchAppCreate
      createOptions={ createOptions }
      setCreateOptions={ setIdentifiedCreateOptions }
      setUpdateOptions={ setFirstUpdateOptions }
    />;

  function setFirstUpdateOptions( options )
  {
    updateHistoryEntry( getBranchGetFullPath( options.dbBranch.id ));

    setIdentifiedCreateOptions( options );
  }

  function setIdentifiedCreateOptions( options )
  {
    identifyOptions( options );

    setCreateOptions( options );
  }

  function setIdentifiedUpdateOptions( options )
  {
    identifyOptions( options );

    setUpdateOptions( options );
  }
}

function createInitialCreateOptions()
{
  const newCreateOptions = createNewBranchOptions();

  identifyOptions( newCreateOptions );

  return newCreateOptions;
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit
}

function createNewBranchOptions()
{
  const newBranch = {
    name: '',
  };

  return {
    dbBranch: newBranch,
    submitBranch: newBranch,
  };
}
