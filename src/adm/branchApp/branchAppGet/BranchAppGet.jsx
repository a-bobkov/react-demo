import { FetchCommonError } from '../FetchCommonError.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function BranchAppGet( { getOptions: { branchId, fetchCommonError }})
{
  const { lingo } = useLingo();

  console.log(`BranchAppGet branchId: ${ JSON.stringify( branchId )}`);
  console.log(`BranchAppGet fetchCommonError: ${ JSON.stringify( fetchCommonError )}`);

  if ( fetchCommonError ) {
    return (
      <FetchCommonError error={ fetchCommonError } />
    );
  }

  return (
    <div className="BranchAppGet">
      { lingo({
        en: `Loading branch ${ branchId } ...`,
        de: `Niederlassung ${ branchId } wird geladen ...`,
      })}
    </div>
  );
}
