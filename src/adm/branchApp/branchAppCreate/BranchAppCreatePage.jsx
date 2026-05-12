import { useState } from 'react';
import { BranchAppCreate } from './BranchAppCreate.jsx';
import { BranchAppUpdate } from '../branchAppUpdate/BranchAppUpdate.jsx';
import { getBranchGetFullPath } from '../branchAppGet/useBranchAppGetLocation.js';
import { updateHistoryEntry } from '../../PopstateLink.jsx';

export function BranchAppCreatePage()
{
  const [ branch, setBranch ] = useState( createInitialNewBranch );

  return branch.id === undefined
    ? <BranchAppCreate
        branch={ branch }
        setCreatedBranch={ setCreatedBranch }
      />
    : <BranchAppUpdate
        branch={ branch }
      />;

  function setCreatedBranch( createdBranch )
  {
    updateHistoryEntry( getBranchGetFullPath( createdBranch.id ));

    setBranch( createdBranch );
  }
}

function createInitialNewBranch()
{
  return {
  };
}
