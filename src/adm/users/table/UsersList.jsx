import './UsersList.css';

export function UsersList({ users })
{
  return (
    <div className="UsersList">
      {users.list.map(user => <UsersLine user={user}/>)}
    </div>
  );
}

export function UsersLine({ user })
{
  return (
    <div key={ user.id } className="UsersLine">
      <UsersLineId userId={ user.id } />
      <UsersLineLogin userLogin={ user.login } />
      <UsersLineName userName={ user.name } />
      <UsersLineCompany userCompany={ user.company } />
      <UsersLineActions userId={ user.id } />
    </div>
  );
}

function UsersLineId({ userId })
{
  return (
    <div className="UsersLineId">
      {userId}
    </div>
  );
}

function UsersLineLogin({ userLogin })
{
  return (
    <div className="UsersLineLogin">
      {userLogin}
    </div>
  );
}

function UsersLineName({ userName })
{
  return (
    <div className="UsersLineName">
      {userName}
    </div>
  );
}

function UsersLineCompany({ userCompany })
{
  return (
    <div className="UsersLineCompany">
      {userCompany}
    </div>
  );
}

function UsersLineActions({ userId })
{
  return (
    <div className="UsersLineActions">
      <a href={`/user/edit/${ userId }`}>
        Edit user
      </a>
    </div>
  );
}
