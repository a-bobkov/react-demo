import { useLingo } from '../lingo/LingoProvider.jsx';
import { useBranchAppLocation } from './useBranchAppLocation.js';
import { BranchAppListPage } from './branchAppList/BranchAppListPage.jsx';
import { BranchAppGetPage } from './branchAppGet/BranchAppGetPage.jsx';
import { BranchAppCreatePage } from './branchAppCreate/BranchAppCreatePage.jsx';

export function BranchApp()
{
  const { lingo } = useLingo();

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

  return lingo({
    en: 'Branch page not found because of incorrect URL',
    de: 'Niederlassung-Seite nicht gefunden, da URL falsch ist',
  });
}
