import './UsersHeader.css';

export function UsersHeader({ changeModeNew })
{
  return (
    <div className="UsersHeader">
      <UsersTitle />
      <UserNew
        changeModeNew={ changeModeNew }
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

function UserNew({ changeModeNew })
{
  return (
    <div className="UserNew">
      <div onClick={ changeModeNew }>
        New user
      </div>
    </div>
  );
}
