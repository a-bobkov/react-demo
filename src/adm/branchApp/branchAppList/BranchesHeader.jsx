import { useLingo } from '../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../PopstateLink.jsx';
import { branchCreatePath } from '../useBranchAppLocation.js';
import './BranchesHeader.css';

export function BranchesHeader()
{
  return (
    <div className="BranchesHeader">
      <BranchesTitle />
      <CreateBranchButton />
    </div>
  );
}

function BranchesTitle()
{
  const { lingo } = useLingo();

  return (
    <div className="BranchesTitle">
      { lingo({
        en: 'Branches',
        de: 'Die Niederlassungen',
      })}
    </div>
  );
}

function CreateBranchButton()
{
  const { lingo } = useLingo();

  return (
    <div className="CreateBranchButton">
      <PopstateLink
        className="CreateBranchButtonLink"
        path={ branchCreatePath }
      >
        { lingo({
          en: 'New branch',
          de: 'Neue Niederlassung',
        })}
      </PopstateLink>
    </div>
  );
}
