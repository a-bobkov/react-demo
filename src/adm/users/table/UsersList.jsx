import './UsersList.css';

export function UsersList({ users, setModeEdit })
{
  return (
    <div className="UsersList">
      { users.list.map( user => <UsersLine user={ user } setModeEdit={ setModeEdit }/>)}
    </div>
  );
}

function UsersLine({ user, setModeEdit })
{
  return (
    <div key={ user.id } className="UsersLine">
      <UsersLineId userId={ user.id } />
      <UsersLineLogin userLogin={ user.login } />
      <UsersLineName userName={ user.name } />
      <UsersLineCompany userCompany={ user.company } />
      <UsersLineActions userId={ user.id } setModeEdit={ setModeEdit }/>
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

function UsersLineActions({ userId, setModeEdit })
{
  return (
    <div className="UsersLineActions">
      <UsersLineActionEdit userId={ userId } setModeEdit={ setModeEdit }/>
    </div>
  );
}

function UsersLineActionEdit({ userId, setModeEdit })
{
  return (
    <div className="UsersLineActionEdit" onClick={ onClick }>
      Edit user
    </div>
  );

  function onClick()
  {
    setModeEdit( userId )
  }
}
