import { useMemo } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UsersList } from './UsersList.jsx';
import { UsersPagination } from '../pagination/UsersPagination.jsx';
import './UsersResult.css';

export function UsersResult({ listOptions, users, subordinates, onChangePagination })
{
  const { lingo } = useLingo();

  console.log(`UsersResult: ${ JSON.stringify({ listOptions, users })}`);

  if ( Error.isError( users ))
  {
    return;
  }

  if ( users === undefined )
  {
    return lingo({
      en: 'Loading user list...',
      de: 'Benutzerliste wird geladen...',
    });
  }

  const resolvedUsers = useMemo(
    () => resolveUsersSubordinates( users, subordinates ),
    [ users ],
  );

  const isFilterDifferent = different( listOptions.filter, resolvedUsers.filter );
  const isSortingDifferent = different( listOptions.sorting, resolvedUsers.sorting );
  const isPaginationDifferent = different( listOptions. pagination, resolvedUsers.pagination );

  return (
    <div className="UsersResult">
      <UsersList
        users={ resolvedUsers }
        isBlocked={ isFilterDifferent || isSortingDifferent || isPaginationDifferent }
      />
      <UsersPagination
        total={ resolvedUsers.count }
        pagination={ isFilterDifferent || isSortingDifferent ? resolvedUsers.pagination : listOptions.pagination }
        isBlocked={ isFilterDifferent || isSortingDifferent }
        onChangePagination={ onChangePagination }
      />
    </div>
  );
}

function resolveUsersSubordinates( users, subordinates )
{
  users.list.forEach( user =>
  {
    user.branch = subordinates.branches.find( branch =>
      branch.id === user.branch.id
    );
  });

  return users;
}

function different( obj1, obj2 )
{
  return JSON.stringify( obj1, sortKeysReplacer ) !== JSON.stringify( obj2, sortKeysReplacer );

  function sortKeysReplacer( key, value )
  {
    return value?.constructor === Object
      ? Object.fromEntries( Object.entries( value ).sort())
      : value;
  }
}
