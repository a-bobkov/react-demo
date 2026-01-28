import { use } from 'react';
import { UserForm } from './form/UserForm.jsx';

export function UserResolveSave({ appUser: { user, userPromise }, onSaveUser })
{
  console.log(`UserResolve: "${ JSON.stringify( user )}"`);

  const userResolve = use( userPromise );

  console.log(`after UserResolve: "${ JSON.stringify( userResolve )}"`);

  if (!userResolve.user) {
    userResolve.user = user;
  }

  return (
    <UserForm
      userResolve={ userResolve }
      onSaveUser={ onSaveUser }
    />
  );
}
