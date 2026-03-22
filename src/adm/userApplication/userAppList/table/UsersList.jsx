import './UsersList.css';

export function UsersList({ users, setModeGet })
{
  return (
    <div className="UsersList">
      { users.list.map( user =>
        <UsersLine
          user={ user }
          setModeGet={ setModeGet }
        />
      )}
    </div>
  );
}

function UsersLine({ user, setModeGet })
{
  return (
    <div key={ user.id } className="UsersLine">
      <UsersLineId userId={ user.id } />
      <UsersLineLogin userLogin={ user.login } />
      <UsersLineName userName={ user.name } />
      <UsersLineCompany userCompany={ user.company } />
      <UsersLineActive userActive={ user.active }/>
      <UsersLineActions userId={ user.id } setModeGet={ setModeGet }/>
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
  return (
    <div className="UsersLineActive">
      { String( userActive )}
    </div>
  );
}

function UsersLineActions({ userId, setModeGet })
{
  return (
    <div className="UsersLineActions">
      <UsersLineActionEdit userId={ userId } setModeGet={ setModeGet }/>
    </div>
  );
}

function UsersLineActionEdit({ userId, setModeGet })
{
  return (
    <div className="UsersLineActionEdit" onClick={ onClick }>
      Edit user
    </div>
  );

  function onClick()
  {
    setModeGet( userId )
  }
}
