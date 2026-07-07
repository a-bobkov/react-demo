import { useLingo } from '../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../popstate/PopstateLink.jsx';
import { branchCreatePath } from '../useBranchAppLocation.js';
import './BranchesHeader.css';

export function BranchesHeader()
{
  return (
    <branches-header>
      <BranchesTitle />
      <CreateBranchButton />
    </branches-header>
  );
}

function BranchesTitle()
{
  const { lingo } = useLingo();

  return (
    <branches-title>
      { lingo({
        en: 'Branches',
        de: 'Die Niederlassungen',
      })}
    </branches-title>
  );
}

function CreateBranchButton()
{
  const { lingo } = useLingo();

  return (
    <branch-create-button>
      <PopstateLink path={ branchCreatePath }>
        <branch-create-button-content>
          { lingo({
            en: 'New branch',
            de: 'Neue Niederlassung',
          })}
        </branch-create-button-content>
      </PopstateLink>
    </branch-create-button>
  );
}
