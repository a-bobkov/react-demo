import { UsersHeader } from './UsersHeader.jsx';
import { UsersFilter } from './filter/UsersFilter.jsx';
import { UsersSorting } from './sorting/UsersSorting.jsx';
import { UsersResult } from './table/UsersResult.jsx';
import './UserAppList.css';

export function UserAppList({ listOptions, setListOptions, users })
{
  console.log(`UserAppList: ${ JSON.stringify( listOptions )}`)

  return (
    <div className="UserAppList">
      <UsersHeader />
      <UsersFilter
        filter={ listOptions.filter }
        onChangeFilter={ onChangeFilter }
      />
      <UsersSorting
        sorting={ listOptions.sorting }
        onChangeSorting={ onChangeSorting }
      />
      <UsersResult
        listOptions={ listOptions }
        users={ users }
        onChangePagination={ onChangePagination }
      />
    </div>
  );

  function onChangeFilter( filter )
  {
    console.log(`onChangeFilter: ${ JSON.stringify( filter )}`);

    const newOptions = {
      ...listOptions,
      filter,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  function onChangeSorting( sorting )
  {
    console.log(`onChangeSorting: ${ JSON.stringify( sorting )}`);

    const newOptions = {
      ...listOptions,
      sorting,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  function onChangePagination( pagination )
  {
    console.log(`onChangePagination: ${ JSON.stringify( pagination )}`);

    const newOptions = {
      ...listOptions,
      pagination,
    };

    setListOptions( newOptions );
  }
}
