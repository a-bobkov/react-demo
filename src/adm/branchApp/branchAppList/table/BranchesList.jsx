import { clsx } from 'clsx';
import { useBranchListHighlight } from './useBranchListHighlight.js';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../../PopstateLink.jsx';
import { getBranchGetFullPath } from '../../branchAppGet/useBranchAppGetLocation.js';
import './BranchesList.css';

export function BranchesList({ branches, isBlocked })
{
  const { highlight, setHighlight } = useBranchListHighlight();

  return (
    <div className="BranchesList" inert={ isBlocked }>
      { branches.list.map( branch =>
        <BranchesLine
          key={ branch.id }
          branch={ branch }
          highlight={ highlight }
          setHighlight={ setHighlight }
        />
      )}
    </div>
  );
}

function BranchesLine({ branch, highlight, setHighlight })
{
  return (
    <div
      className={ clsx('BranchesLine', isHighlighted( branch ) && 'isHighlighted') }
      onClick={ changeHighlight }
    >
      <BranchesLineId branchId={ branch.id } />
      <BranchesLineName branchName={ branch.name } />
      <BranchesLineCreated branchCreated={ branch.created } />
      <BranchesLineActionEdit
        branchId={ branch.id }
        changeHighlight={ changeHighlight }
      />
    </div>
  );

  function changeHighlight()
  {
    const newHighlight = isHighlighted( branch )
      ? undefined
      : branch.id;

    setHighlight( newHighlight );
  }

  function isHighlighted( branch )
  {
    return branch.id === highlight;
  }
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

const { format: formatDateEn } = Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const { format: formatDateDe } = Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function BranchesLineCreated({ branchCreated })
{
  const { lingo } = useLingo();

  const dateBranchCreated = new Date( branchCreated );

  return (
    <div className="BranchesLineCreated">
      { lingo({
        en: formatDateEn( dateBranchCreated ),
        de: formatDateDe( dateBranchCreated ),
      })}
    </div>
  );
}

function BranchesLineActionEdit({ branchId, changeHighlight })
{
  const { lingo } = useLingo();

  return (
    <PopstateLink
      className="BranchesLineActionEdit"
      path={ getBranchGetFullPath( branchId ) }
      onClickBefore={ changeHighlight }
    >
      { lingo({
        en: 'Edit',
        de: 'Bearbeiten',
      })}
    </PopstateLink>
  );
}
