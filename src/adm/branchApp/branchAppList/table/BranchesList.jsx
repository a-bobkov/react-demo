import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../../PopstateLink.jsx';
import { getBranchGetFullPath } from '../../branchAppGet/useBranchAppGetLocation.js';
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

  return (
    <div className="BranchesLineActionEdit">
      <PopstateLink
        className="BranchesLineActionEditLink"
        path={ getBranchGetFullPath( branchId ) }
      >
        { lingo({
          en: 'Edit',
          de: 'Bearbeiten',
        })}
      </PopstateLink>
    </div>
  );
}
