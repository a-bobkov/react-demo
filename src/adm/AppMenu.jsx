import { useLingo } from './lingo/LingoProvider.jsx';
import { PopstateLink } from './PopstateLink.jsx';
import { branchPath, userPath } from './useAppLocation.js';
import './AppMenu.css';

export function AppMenu({ appLocationApi })
{
  const { lingo } = useLingo();

  return (
    <div className="AppMenu">
      <div className="AppMenuHeader">
        { lingo({
          en: `Applications`,
          de: `Anwendungen`,
        })}
      </div>
      <AppMenuItem
        name={ lingo({
          en: `Users`,
          de: `Benutzer`,
        })}
        path={ userPath }
        isActive={ appLocationApi.isUserLocation() }
      />
      <AppMenuItem
        name={ lingo({
          en: `Branches`,
          de: `Niederlassungen`,
        })}
        path={ branchPath }
        isActive={ appLocationApi.isBranchLocation() }
      />
    </div>
  );
}

function AppMenuItem({ name, path, isActive })
{
  return (
    <div className="AppMenuItem">
      { isActive
        ? <AppMenuItemText name={ name } />
        : <AppMenuItemLink name={ name } path={ path } />
      }
    </div>
  );
}

function AppMenuItemLink({ name, path })
{
  return (
    <PopstateLink path={ path }>
      { name }
    </PopstateLink>
  );
}

function AppMenuItemText({ name })
{
  return name;
}
