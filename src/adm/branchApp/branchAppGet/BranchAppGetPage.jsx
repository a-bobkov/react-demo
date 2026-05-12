import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useBranchAppGetLocation } from './useBranchAppGetLocation.js';
import { useBranchAppGet } from './useBranchAppGet.js';
import { BranchAppUpdate } from '../branchAppUpdate/BranchAppUpdate.jsx';

export function BranchAppGetPage()
{
  const { lingo } = useLingo();

  const { branchId } = useBranchAppGetLocation();

  const { branch } = useBranchAppGet( branchId );

  if ( Error.isError( branch ))
  {
    return;
  }

  if ( branch === undefined )
  {
    return lingo({
      en: `Loading branch ${ branchId } ...`,
      de: `Niederlassung ${ branchId } wird geladen ...`,
    });
  }

  return (
    <BranchAppUpdate
      branch={ branch }
    />
  );
}
