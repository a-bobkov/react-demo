import { useLingo } from './lingo/LingoProvider.jsx';
import { PopstateLink } from './PopstateLink.jsx';
import { branchPath, userPath } from './useAdmLocation.js';
import './AdmMenu.css';

export function AdmMenu({ admLocationApi })
{
  const { lingo } = useLingo();

  return (
    <div className="AdmMenu">
      <div className="AdmMenuHeader">
        { lingo({
          en: `Applications`,
          de: `Anwendungen`,
        })}
      </div>
      <AdmMenuItem
        name={ lingo({
          en: `Users`,
          de: `Benutzer`,
        })}
        path={ userPath }
        isActive={ admLocationApi.isUserLocation() }
      />
      <AdmMenuItem
        name={ lingo({
          en: `Branches`,
          de: `Niederlassungen`,
        })}
        path={ branchPath }
        isActive={ admLocationApi.isBranchLocation() }
      />
    </div>
  );
}

function AdmMenuItem({ name, path, isActive })
{
  return (
    <div className="AdmMenuItem">
      { isActive
        ? <AdmMenuItemText name={ name } />
        : <AdmMenuItemLink name={ name } path={ path } />
      }
    </div>
  );
}

function AdmMenuItemLink({ name, path })
{
  return (
    <PopstateLink
      className="AdmMenuItemLink"
      path={ path }
    >
      { name }
    </PopstateLink>
  );
}

function AdmMenuItemText({ name })
{
  return (
    <div className="AdmMenuItemText">
      { name }
    </div>
  );
}
