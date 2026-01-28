import { Suspense } from 'react';
import { UserResolveSave } from './UserResolveSave.jsx';
import { UserForm } from './form/UserForm.jsx';
import './UserResultSave.css';

export function UserResultSave({ appUser, onSaveUser })
{
  console.log(`UserResult: "${ JSON.stringify( appUser )}"`);

  return (
    <Suspense fallback={ <UserResultSaving /> }>
      <UserResultEdit />
    </Suspense>
  );

  function UserResultEdit()
  {
    return (
      <UserResolveSave
        appUser={ appUser }
        onSaveUser={ onSaveUser }
      />
    );
  }

  function UserResultSaving()
  {
    const userResolve = {
      user: appUser.user,
    };

    return (
      <UserResultSpinner>
        <UserForm
          userResolve={ userResolve }
        />
      </UserResultSpinner>
    );
  }
}

function UserResultSpinner({ children })
{
  return (
    <div className="UserResultSpinner">
      {children}
    </div>
  );
}
