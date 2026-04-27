import { useLingo } from './lingo/LingoProvider.jsx';
import { useGetAppLocationContext, useSetAppLocationContext } from './appLocation/AppLocationProvider.jsx';
import { PopstateLink } from './PopstateLink.jsx';
import './AppMenu.css';

export function AppMenu()
{
  const { lingo } = useLingo();

  const { isUserLocation, isBranchLocation } = useGetAppLocationContext();
  const { getUserPath, getBranchPath } = useSetAppLocationContext();

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
        path={ getUserPath() }
        isActive={ isUserLocation() }
      />
      <AppMenuItem
        name={ lingo({
          en: `Branches`,
          de: `Niederlassungen`,
        })}
        path={ getBranchPath() }
        isActive={ isBranchLocation() }
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
