import { UsersList } from './UsersList.jsx';
import { UsersPagination } from '../pagination/UsersPagination.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UsersResult.css';

export function UsersResult({ users, isLoading, pagination, onChangePagination })
{
  console.log(`UsersResult: ${ JSON.stringify({ users, isLoading, pagination })}`);

  if ( users ) {
    return (
      <div className="UsersResult" inert={ isLoading }>
        <UsersList
          users={ users }
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
  const { lingo } = useLingo();

  return (
    <div className="UsersResultLoading">
      { lingo({
        en: 'Loading users...',
        de: 'Benutzer werden geladen...',
      })}
    </div>
  );
}
