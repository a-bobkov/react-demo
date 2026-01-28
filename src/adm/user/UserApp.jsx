import { useState } from 'react';
import { fetchUser} from './fetchUser.js';
import { UserResultGet } from './UserResultGet.jsx';
import { UserResultSave } from './UserResultSave.jsx';
import './UserApp.css';

export function UserApp({ userId })
{
  const [appUser, setAppUser] = useState( createInitialAppUser );

  return (
    <div className="UserApp">
      <UserTitle/>
      <UserResult
        appUser={ appUser }
        onSaveUser={ onSaveUser }
      />
    </div>
  );

  function UserTitle() {
    return (
      <div className="UserTitle">
        Edit user: { userId }
      </div>
    );
  }

  function UserResult({ appUser, onSaveUser })
  {
    return appUser.get
      ? <UserResultGet
        appUser={ appUser.get }
        onSaveUser={ onSaveUser }
      />
      : <UserResultSave
        appUser={ appUser.save }
        onSaveUser={ onSaveUser }
      />
  }

  function createInitialAppUser()
  {
    return {
      get: {
        userPromise: fetchUser( userId ).catch( getCommonError ),
      },
    };
  }

  function onSaveUser( user, userPromise )
  {
    setAppUser({
      save: {
        user,
        userPromise: userPromise.catch( getCommonError ),
      },
    });
  }
}

function getCommonError( error )
{
  return {
    fetchCommonError: error,
  };
}