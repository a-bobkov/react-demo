import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UsersList } from './UsersList.jsx';
import { UsersPagination } from '../pagination/UsersPagination.jsx';
import './UsersResult.css';

export function UsersResult({ listOptions: { filter, sorting, pagination, users }, onChangePagination })
{
  console.log(`UsersResult: ${ JSON.stringify({ filter, sorting, pagination, users })}`);

  if ( users === undefined ) {
    return <UsersResultLoading />;
  }

  const isFilterDifferent = different( filter, users.filter );
  const isSortingDifferent = different( sorting, users.sorting );
  const isPaginationDifferent = different( pagination, users.pagination );

  return (
    <div className="UsersResult">
      <UsersList
        users={ users }
        isBlocked={ isFilterDifferent || isSortingDifferent || isPaginationDifferent }
      />
      <UsersPagination
        total={ users.count }
        pagination={ isFilterDifferent || isSortingDifferent ? users.pagination : pagination }
        isBlocked={ isFilterDifferent || isSortingDifferent }
        onChangePagination={ onChangePagination }
      />
    </div>
  );
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
