import { use } from 'react';
import { UserForm } from './form/UserForm.jsx';
import { FetchCommonError } from './FetchCommonError.jsx';

export function UserResolveGet({ appUser: { userPromise }, onSaveUser })
{
  const userResolve = use( userPromise );

  console.log(`after UserResolve: "${ JSON.stringify( userResolve )}"`);

  if (userResolve.fetchCommonError) {
    return <FetchCommonError error={ userResolve.fetchCommonError } />
  }

  return (
    <UserForm
      userResolve={ userResolve }
      onSaveUser={ onSaveUser }
    />
  );
}
