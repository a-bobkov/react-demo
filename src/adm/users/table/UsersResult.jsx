import { Suspense, useDeferredValue } from 'react';
import { UsersResolve } from './UsersResolve.jsx';
import './UsersResult.css';

export function UsersResult({ optionalUsers, onChangePagination })
{
  console.log(`UsersResult new: "${ JSON.stringify( optionalUsers.options )}"`);

  const prevOptionalUsers = useDeferredValue( optionalUsers );

  console.log(`UsersResult def: "${ JSON.stringify( prevOptionalUsers.options )}"`);

  return (
    <Suspense fallback={<UsersResultLoading />}>
      <Suspense fallback={<UsersResultPrevious />}>
        <UsersResultCurrent />
      </Suspense>
    </Suspense>
  );

  function UsersResultCurrent()
  {
    console.log(`UsersResult current`);

    return (
      // <UsersResultSpinner>
        <UsersResolve
          optionalUsers={optionalUsers}
          onChangePagination={onChangePagination}
        />
      // </UsersResultSpinner>
    );
  }

  function UsersResultPrevious()
  {
    return (
      <UsersResultSpinner>
        <UsersResolve
          optionalUsers={prevOptionalUsers}
          onChangePagination={onChangePagination}
        />
      </UsersResultSpinner>
    );
  }
}

function UsersResultSpinner({ children })
{
  return (
    <div className="UsersResultSpinner">
      {children}
    </div>
  );
}

function UsersResultLoading()
{
  return (
    <div>
      Loading...
    </div>
  );
}
