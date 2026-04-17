import { useState } from 'react';
import { usePopstate } from './usePopstate.js';
import { useUserLocationContext } from './userLocation/UserLocationProvider.jsx';
import { UserAppListPage } from './userAppList/UserAppListPage.jsx';
import { UserAppGetPage } from './userAppGet/UserAppGetPage.jsx';
import { UserAppCreatePage } from './userAppCreate/UserAppCreatePage.jsx';

const LIST_MODE = 'LIST_MODE';
const GET_MODE = 'GET_MODE';
const CREATE_MODE = 'CREATE_MODE';

export function UserApplication()
{
  const userLocationApi = useUserLocationContext();

  const [ mode, setMode ] = useState( getUserLocationMode );

  usePopstate( dispatchUserPath );

  switch ( mode )
  {
    case LIST_MODE:
      return <UserAppListPage />;

    case GET_MODE:
      return <UserAppGetPage />;

    case CREATE_MODE:
      return <UserAppCreatePage />;
  }

  function getUserLocationMode()
  {
    if ( userLocationApi.isUserRootPath()) {
      userLocationApi.setUserListPath();
    }

    if ( userLocationApi.isUserListPath()) {
      return LIST_MODE;
    }

    if ( userLocationApi.isUserGetPath()) {
      return GET_MODE;
    }

    if ( userLocationApi.isUserCreatePath()) {
      return CREATE_MODE;
    }
  }

  function dispatchUserPath()
  {
    setMode( getUserLocationMode() );
  }
}
