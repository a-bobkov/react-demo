import { UsersList } from './UsersList.jsx';
import { UsersPagination } from '../pagination/UsersPagination.jsx';
import './UsersResult.css';

export function UsersResult({ users, isLoading, pagination, onChangePagination, setModeGet })
{
  console.log(`UsersResult: ${ JSON.stringify({ users, isLoading, pagination })}`);

  if ( users ) {
    return (
      <div className="UsersResult" inert={ isLoading }>
        <UsersList
          users={ users }
          setModeGet={ setModeGet }
        />
        <UsersPagination
          total={ users.count }
          pagination={ pagination }
          onChangePagination={ onChangePagination }
        />
      </div>
    );
  }

  if ( isLoading ) {
    return <UsersResultLoading />;
  }
}

function UsersResultLoading()
{
  return (
    <div className="UsersResultLoading">
      Loading users...
    </div>
  );
}
