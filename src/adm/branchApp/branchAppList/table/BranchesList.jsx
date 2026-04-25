import { useBranchLocationContext } from '../../branchLocation/BranchLocationProvider.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './BranchesList.css';

export function BranchesList( { branches, isBlocked })
{
  return (
    <div className="BranchesList" inert={ isBlocked }>
      { branches.list.map( branch =>
        <BranchesLine
          key={ branch.id }
          branch={ branch }
        />
      )}
    </div>
  );
}

function BranchesLine({ branch })
{
  return (
    <div className="BranchesLine">
      <BranchesLineId branchId={ branch.id } />
      <BranchesLineName branchName={ branch.name } />
      <BranchesLineActions branchId={ branch.id } />
    </div>
  );
}

function BranchesLineId({ branchId })
{
  return (
    <div className="BranchesLineId">
      { branchId }
    </div>
  );
}

function BranchesLineName({ branchName })
{
  return (
    <div className="BranchesLineName">
      { branchName }
    </div>
  );
}

function BranchesLineActions({ branchId })
{
  return (
    <div className="BranchesLineActions">
      <BranchesLineActionEdit branchId={ branchId } />
    </div>
  );
}

function BranchesLineActionEdit({ branchId })
{
  const { lingo } = useLingo();

  const branchLocationApi = useBranchLocationContext();

  const branchEditPath = branchLocationApi.getBranchGetPath( branchId );

  return (
    <div className="BranchesLineActionEdit">
      <a className="BranchesLineActionEditLink" href={ branchEditPath } onClick={ onClick }>
        {
          lingo({
            en: 'Edit',
            de: `Bearbeiten`,
          })
        }
      </a>
    </div>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    branchLocationApi.goPath( event.target.pathname );
  }
}
