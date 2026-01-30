import './UsersHeader.css';

export function UsersHeader()
{
  return (
    <div className="UsersHeader">
      <UsersTitle />
      <UserNew />
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

function UserNew()
{
  return (
    <div className="UserNew">
      <a href={`/user/new`}>
        New user
      </a>
    </div>
  );
}
