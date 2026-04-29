import { useBranchAppLocation } from './useBranchAppLocation.js';
import { BranchAppListPage } from './branchAppList/BranchAppListPage.jsx';
import { BranchAppGetPage } from './branchAppGet/BranchAppGetPage.jsx';
import { BranchAppCreatePage } from './branchAppCreate/BranchAppCreatePage.jsx';

export function BranchApp()
{
  const { branchAppLocationApi } = useBranchAppLocation();

  if ( branchAppLocationApi.isBranchAppListLocation() ) {
    return <BranchAppListPage />;
  }

  if ( branchAppLocationApi.isBranchAppGetLocation() ) {
    return <BranchAppGetPage />;
  }

  if ( branchAppLocationApi.isBranchAppCreateLocation() ) {
    return <BranchAppCreatePage />;
  }
}
