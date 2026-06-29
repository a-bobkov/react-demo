import { useLingo } from './lingo/LingoProvider.jsx';
import { PopstateLink } from './PopstateLink.jsx';
import { branchPath, userPath } from './useAdmLocation.js';
import './AdmMenu.css';

export function AdmMenu({ admLocationApi })
{
  const { lingo } = useLingo();

  return (
    <adm-menu>
      <adm-menu-header>
        { lingo({
          en: `Applications`,
          de: `Anwendungen`,
        })}
      </adm-menu-header>
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
    </adm-menu>
  );
}

function AdmMenuItem({ name, path, isActive })
{
  return (
    <adm-menu-item>
      { isActive
        ? <AdmMenuItemText name={ name } />
        : <AdmMenuItemLink name={ name } path={ path } />
      }
    </adm-menu-item>
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
    <adm-menu-item-text>
      { name }
    </adm-menu-item-text>
  );
}
