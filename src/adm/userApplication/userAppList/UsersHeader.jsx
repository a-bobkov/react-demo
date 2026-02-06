import './UsersHeader.css';

export function UsersHeader({ setModeNew })
{
  return (
    <div className="UsersHeader">
      <UsersTitle />
      <UserNew
        setModeNew={ setModeNew }
      />
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

function UserNew({ setModeNew })
{
  return (
    <div className="UserNew" onClick={ setModeNew }>
      New user
    </div>
  );
}
