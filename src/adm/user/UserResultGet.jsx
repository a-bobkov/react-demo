import { Suspense } from 'react';
import { UserResolveGet } from './UserResolveGet.jsx';
import './UserResultGet.css';

export function UserResultGet({ appUser, onSaveUser })
{
  console.log(`UserResultGet: "${ JSON.stringify( appUser )}"`);

  return (
    <Suspense fallback={ <UserResultLoading />}>
      <UserResolveGet
        appUser={ appUser }
        onSaveUser={ onSaveUser }
      />
    </Suspense>
  );
}

function UserResultLoading()
{
  return (
    <div>
      Loading...
    </div>
  );
}
