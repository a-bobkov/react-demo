import { useBranchAppListLocation } from './useBranchAppListLocation.js';
import { useBranchAppListLoad } from './useBranchAppListLoad.js';
import { BranchAppList } from './BranchAppList.jsx';

export function BranchAppListPage()
{
  const { branchAppListLocation, setBranchAppListOptions } = useBranchAppListLocation();

  const { branches } = useBranchAppListLoad( branchAppListLocation );

  return (
    <BranchAppList
      listOptions={ branchAppListLocation }
      branches={ branches }
      setListOptions={ setBranchAppListOptions }
    />
  );
}
