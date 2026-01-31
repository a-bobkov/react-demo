import { useState } from 'react';
import { UserForm } from './form/UserForm.jsx';
import { fetchUser } from './fetchUser.js';
import { createUser } from './createUser.js';
import { updateUser } from './updateUser.js';
import { UserResultGet } from './UserResultGet.jsx';
import { UserResultSave } from './UserResultSave.jsx';
import './UserApp.css';

export function UserApp({ userId, setModeList })
{
  const [appUser, setAppUser] = useState( createInitialAppUser );

  if ( appUser.new ) {
    return <UserAppNew appUser={ appUser.new } setModeList={ setModeList }/>
  }

  if ( appUser.get ) {
    return <UserAppGet appUser={ appUser.get } setModeList={ setModeList }/>
  }

  if ( appUser.save ) {
    return <UserAppSave appUser={ appUser.save }/>
  }

  function UserAppNew({ appUser, setModeList })
  {
    return (
      <div className="UserApp">
        <UserForm
          userResolve={ appUser }
          onSaveUser={ onClickSaveUser }
          setModeList={ setModeList }
        />
      </div>
    );
  }

  function UserAppGet({ appUser, setModeList })
  {
    return (
      <div className="UserApp">
        <UserResultGet
          appUser={ appUser }
          onSaveUser={ onClickSaveUser }
          setModeList={ setModeList }
        />
      </div>
    );
  }

  function UserAppSave({ appUser })
  {
    return (
      <div className="UserApp">
        <UserResultSave
          appUser={ appUser }
          onSaveUser={ onClickSaveUser }
          setModeList={ setModeList }
        />
      </div>
    );
  }

  function createInitialAppUser()
  {
    return userId
      ? createInitialAppUserGet()
      : createInitialAppUserNew();
  }

  function createInitialAppUserNew()
  {
    return {
      new: {
        user: {
          login: '',
          name: '',
          company: '',
        },
      },
    };
  }

  function createInitialAppUserGet()
  {
    return {
      get: {
        userPromise: fetchUser( userId ).catch( getCommonError ),
      },
    }
  }

  function onClickSaveUser( user )
  {
    const userPromise = user.id
      ? updateUser( user )
      : createUser( user ).then( setEditUrl );

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

function setEditUrl( result )
{
  const userId = result?.user?.id;

  if ( userId ) {
    window.history.replaceState(null, null, `/user/edit/${ userId }` );
  }

  return result;
}