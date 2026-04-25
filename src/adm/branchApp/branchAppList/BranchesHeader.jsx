import { useBranchLocationContext } from '../branchLocation/BranchLocationProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';
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
        en: `Branches`,
        de: `Die Niederlassungen`,
      })}
    </div>
  );
}

function CreateBranchButton()
{
  const { lingo } = useLingo();

  const branchLocationApi = useBranchLocationContext();

  const branchCreatePath = branchLocationApi.getBranchCreatePath();

  return (
    <div className="CreateBranchButton">
      <a className="CreateBranchButtonLink" href={ branchCreatePath } onClick={ onClick }>
        { lingo({
          en: `New branch`,
          de: `Neue Niederlassung`,
        })}
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
