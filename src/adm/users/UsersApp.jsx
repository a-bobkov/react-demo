import { useMemo } from 'react';
import { UsersHeader } from './UsersHeader.jsx';
import { UsersFilter } from './filter/UsersFilter.jsx';
import { UsersSorting } from './sorting/UsersSorting.jsx';
import { UsersResult } from './table/UsersResult.jsx';
import { usersFetch } from './usersFetch.js';
import './UsersApp.css';

export function UsersApp({ options, onChangeOptions, changeModeNew, setModeEdit })
{
  console.log(`UsersApp: "${ JSON.stringify(options) }"`)

  const optionalUsers = useMemo(() =>
    ({
      usersPromise: usersFetch( options ),
      options,
    }),
    [ options ]
  );

  return (
    <>
      <UsersHeader
        changeModeNew={ changeModeNew }
      />
      <UsersFilter
        filter={ options.filter }
        onChangeFilter={ onChangeFilter }
      />
      <UsersSorting
        sorting={ options.sorting }
        onChangeSorting={ onChangeSorting }
      />
      <UsersResult
        optionalUsers={ optionalUsers }
        onChangePagination={ onChangePagination }
        setModeEdit={ setModeEdit }
      />
    </>
  );

  async function onChangeFilter( filter )
  {
    console.log(`onChangeFilter: ${ JSON.stringify( filter )}`);

    const newOptions = {
      ...options,
      filter,
    };

    newOptions.pagination.count = 1;

    onChangeOptions( newOptions );
  }

  async function onChangeSorting(sorting )
  {
    console.log(`onChangeSorting: ${ JSON.stringify( sorting )}`);

    const newOptions = {
      ...options,
      sorting,
    };

    onChangeOptions( newOptions );
  }

  async function onChangePagination( pagination )
  {
    console.log(`onChangePagination: ${ JSON.stringify( pagination )}`);

    const newOptions = {
      ...options,
      pagination,
    };

    onChangeOptions( newOptions );
  }
}
