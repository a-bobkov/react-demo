import { useState } from 'react';
import { UsersFilter } from './filter/UsersFilter.jsx';
import { UsersSorting } from './sorting/UsersSorting.jsx';
import { UsersResult } from './table/UsersResult.jsx';
import { loadUsersOptions, saveUsersOptions } from './usersSearchParams.js';
import { usersFetch } from './usersFetch.js';
import './UsersApp.css';

export function UsersApp()
{
  const [optionalUsers, setOptionalUsers] = useState( createInitialOptionalUsers );

  return (
    <>
      <UsersTitle />
      <UsersFilter
        filter={optionalUsers.options.filter}
        onChangeFilter={onChangeFilter}
      />
      <UsersSorting
        sorting={optionalUsers.options.sorting}
        onChangeSorting={onChangeSorting}
      />
      <UsersResult
        optionalUsers={optionalUsers}
        onChangePagination={onChangePagination}
      />
    </>
  );

  function UsersTitle()
  {
    return (
      <div className="UsersTitle">
        Users
      </div>
    );
  }

  async function onChangeFilter( filter )
  {
    console.log(`onChangeFilter: ${ JSON.stringify( filter )}`);

    const newOptions = {
      ...optionalUsers.options,
      filter,
    };

    newOptions.pagination.count = 1;

    setOptionalUsers( createOptionalUsers( newOptions ));
  }

  async function onChangeSorting(sorting )
  {
    console.log(`onChangeSorting: ${ JSON.stringify( sorting )}`);

    const newOptions = {
      ...optionalUsers.options,
      sorting,
    };

    setOptionalUsers( createOptionalUsers( newOptions ));
  }

  async function onChangePagination( pagination )
  {
    console.log(`onChangePagination: ${ JSON.stringify( pagination )}`);

    const newOptions = {
      ...optionalUsers.options,
      pagination,
    };

    setOptionalUsers( createOptionalUsers( newOptions ));
  }
}

function createInitialOptionalUsers()
{
  const defaultOptions = {
    filter: {},
    sorting: {},
    pagination: {
      size: 10,
      count: 1,
    },
  };

  const loadedOptions = loadUsersOptions();

  const options = {
    filter: Object.assign( defaultOptions.filter, loadedOptions.filter ),
    sorting: Object.assign( defaultOptions.sorting, loadedOptions.sorting ),
    pagination: Object.assign( defaultOptions.pagination, loadedOptions.pagination ),
  };

  return createOptionalUsers( options );
}

function createOptionalUsers( options )
{
  return {
    usersPromise: getUsers( options ),
    options,
  };
}

async function getUsers( options )
{
  const users = await usersFetch( options );

  saveUsersOptions( options );

  return users;
}
