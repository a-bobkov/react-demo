import { useSetUserAppLocationContext } from '../userLocation/UserAppLocationProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../PopstateLink.jsx';
import './UsersHeader.css';

export function UsersHeader()
{
  return (
    <div className="UsersHeader">
      <UsersTitle />
      <CreateUserButton />
    </div>
  );
}

function UsersTitle()
{
  const { lingo } = useLingo();

  return (
    <div className="UsersTitle">
      { lingo({
        en: `Users`,
        de: `Die Benutzer`,
      })}
    </div>
  );
}

function CreateUserButton()
{
  const { lingo } = useLingo();

  const setUserAppLocationApi = useSetUserAppLocationContext();

  return (
    <div className="CreateUserButton">
      <PopstateLink
        className="CreateUserButtonLink"
        path={ setUserAppLocationApi.getUserAppCreatePath() }
      >
        { lingo({
          en: `New user`,
          de: `Neu Benutzer`,
        })}
      </PopstateLink>
    </div>
  );
}
