import { useUserLocationContext } from '../userLocation/UserLocationProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';
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

  const userLocationApi = useUserLocationContext();

  const userCreatePath = userLocationApi.getUserCreatePath();

  return (
    <div className="CreateUserButton">
      <a className="CreateUserButtonLink" href={ userCreatePath } onClick={ onClick }>
        { lingo({
          en: `New user`,
          de: `Neu Benutzer`,
        })}
      </a>
    </div>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    userLocationApi.goPath( event.target.pathname );
  }
}
