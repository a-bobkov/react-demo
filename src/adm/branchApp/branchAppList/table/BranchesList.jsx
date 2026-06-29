import { clsx } from 'clsx';
import { useBranchListHighlight } from './useBranchListHighlight.js';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../../popstate/PopstateLink.jsx';
import { getBranchGetFullPath } from '../../branchAppGet/useBranchAppGetLocation.js';
import './BranchesList.css';

export function BranchesList({ branches, isBlocked })
{
  const { highlight, setHighlight } = useBranchListHighlight();

  return (
    <branches-list inert={ isBlocked }>
      { branches.list.map( branch =>
        <BranchLine
          key={ branch.id }
          branch={ branch }
          highlight={ highlight }
          setHighlight={ setHighlight }
        />
      )}
    </branches-list>
  );
}

function BranchLine({ branch, highlight, setHighlight })
{
  return (
    <branch-line
      className={ clsx({ 'isBranchHighlighted': isBranchHighlighted( branch )})}
      onClick={ changeHighlight }
    >
      <BranchLineId branchId={ branch.id } />
      <BranchLineName branchName={ branch.name } />
      <BranchLineCreated branchCreated={ branch.created } />
      <BranchLineActionEdit
        branchId={ branch.id }
        changeHighlight={ changeHighlight }
      />
    </branch-line>
  );

  function changeHighlight()
  {
    const newHighlight = isBranchHighlighted( branch )
      ? undefined
      : branch.id;

    setHighlight( newHighlight );
  }

  function isBranchHighlighted( branch )
  {
    return branch.id === highlight;
  }
}

function BranchLineId({ branchId })
{
  return (
    <branch-line-id>
      { branchId }
    </branch-line-id>
  );
}

function BranchLineName({ branchName })
{
  return (
    <branch-line-name>
      { branchName }
    </branch-line-name>
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

function BranchLineCreated({ branchCreated })
{
  const { lingo } = useLingo();

  const dateBranchCreated = new Date( branchCreated );

  return (
    <branch-line-created>
      { lingo({
        en: formatDateEn( dateBranchCreated ),
        de: formatDateDe( dateBranchCreated ),
      })}
    </branch-line-created>
  );
}

function BranchLineActionEdit({ branchId, changeHighlight })
{
  const { lingo } = useLingo();

  return (
    <PopstateLink
      className="BranchLineActionEdit"
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
