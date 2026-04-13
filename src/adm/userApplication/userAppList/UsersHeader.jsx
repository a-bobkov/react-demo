import { useUserLocationContext } from '../userLocation/UserLocationProvider.jsx';
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
  return (
    <div className="UsersTitle">
      Users
    </div>
  );
}

function CreateUserButton()
{
  const userLocationApi = useUserLocationContext();

  const userCreatePath = userLocationApi.getUserCreatePath();

  return (
    <div className="CreateUserButton">
      <a className="CreateUserButtonLink" href={ userCreatePath } onClick={ onClick }>
        New user
      </a>
    </div>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    userLocationApi.goUserCreate();
  }
}
