import { use } from 'react';
import { UsersTable } from './UsersTable.jsx';

export function UsersResolve({ optionalUsers: { options, usersPromise }, onChangePagination })
{
  console.log(`UsersResolve: "${ JSON.stringify( options )}"`);

  const users = use( usersPromise );

  console.log('after use resolve');

  return (
    <UsersTable
      users={users}
      pagination={options.pagination}
      onChangePagination={onChangePagination}
    />
  );
}