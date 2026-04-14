import { useUserLocationContext } from '../../userLocation/UserLocationProvider.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UsersList.css';

export function UsersList({ users })
{
  return (
    <div className="UsersList">
      { users.list.map( user =>
        <UsersLine
          user={ user }
        />
      )}
    </div>
  );
}

function UsersLine({ user })
{
  return (
    <div key={ user.id } className="UsersLine">
      <UsersLineId userId={ user.id } />
      <UsersLineLogin userLogin={ user.login } />
      <UsersLineName userName={ user.name } />
      <UsersLineCompany userCompany={ user.company } />
      <UsersLineActive userActive={ user.active }/>
      <UsersLineActions userId={ user.id } />
    </div>
  );
}

function UsersLineId({ userId })
{
  return (
    <div className="UsersLineId">
      { userId }
    </div>
  );
}

function UsersLineLogin({ userLogin })
{
  return (
    <div className="UsersLineLogin">
      { userLogin }
    </div>
  );
}

function UsersLineName({ userName })
{
  return (
    <div className="UsersLineName">
      { userName }
    </div>
  );
}

function UsersLineCompany({ userCompany })
{
  return (
    <div className="UsersLineCompany">
      { userCompany }
    </div>
  );
}

function UsersLineActive({ userActive })
{
  const { lingo } = useLingo();

  return (
    <div className="UsersLineActive">
      { userActive
        ? lingo({
          en: 'true',
          de: 'Wahr',
        })
        : lingo({
          en: 'false',
          de: 'Falsch',
        })
      }
    </div>
  );
}

function UsersLineActions({ userId })
{
  return (
    <div className="UsersLineActions">
      <UsersLineActionEdit userId={ userId } />
    </div>
  );
}

function UsersLineActionEdit({ userId })
{
  const { lingo } = useLingo();

  const userLocationApi = useUserLocationContext();

  const userEditPath = userLocationApi.getUserGetPath( userId );

  return (
    <div className="UsersLineActionEdit">
      <a className="UsersLineActionEditLink" href={ userEditPath } onClick={ onClick }>
        {
          lingo({
            en: 'Edit',
            de: `Bearbeiten`,
          })
        }
      </a>
    </div>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    userLocationApi.goUserGet( userId );
  }
}
