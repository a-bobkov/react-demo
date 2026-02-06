import { useMemo } from 'react';
import { UsersHeader } from './UsersHeader.jsx';
import { UsersFilter } from './filter/UsersFilter.jsx';
import { UsersSorting } from './sorting/UsersSorting.jsx';
import { UsersResult } from './table/UsersResult.jsx';
import { fetchUsers } from './fetchUsers.js';
import './UserAppList.css';

export function UserAppList({ listOptions, setListOptions, setModeGet, setModeNew })
{
  console.log(`UserAppList: ${ JSON.stringify( listOptions )}`)

  const optionalUsers = useMemo(() =>
    ({
      usersPromise: fetchUsers( listOptions ),
      options: listOptions,
    }),
    [ listOptions ]
  );

  return (
    <div className="UsersApp">
      <UsersHeader
        setModeNew={ setModeNew }
      />
      <UsersFilter
        filter={ listOptions.filter }
        onChangeFilter={ onChangeFilter }
      />
      <UsersSorting
        sorting={ listOptions.sorting }
        onChangeSorting={ onChangeSorting }
      />
      <UsersResult
        optionalUsers={ optionalUsers }
        onChangePagination={ onChangePagination }
        setModeGet={ setModeGet }
      />
    </div>
  );

  async function onChangeFilter( filter )
  {
    console.log(`onChangeFilter: ${ JSON.stringify( filter )}`);

    const newOptions = {
      ...listOptions,
      filter,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  async function onChangeSorting( sorting )
  {
    console.log(`onChangeSorting: ${ JSON.stringify( sorting )}`);

    const newOptions = {
      ...listOptions,
      sorting,
    };

    setListOptions( newOptions );
  }

  async function onChangePagination( pagination )
  {
    console.log(`onChangePagination: ${ JSON.stringify( pagination )}`);

    const newOptions = {
      ...listOptions,
      pagination,
    };

    setListOptions( newOptions );
  }
}
