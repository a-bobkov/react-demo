import { useState } from 'react';
import { fetchUser } from './fetchUser.js';
import { useGetUserAppLocationContext } from '../userLocation/UserAppLocationProvider.jsx';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { UserAppGet } from './UserAppGet.jsx';
import { UserAppUpdate } from '../userAppUpdate/UserAppUpdate.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function UserAppGetPage()
{
  const getUserAppLocationApi = useGetUserAppLocationContext();

  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  const [ getOptions, setGetOptions ] = useState( createInitialGetOptions );

  const [ updateOptions, setUpdateOptions ] = useState();

  return updateOptions
    ? <UserAppUpdate
      updateOptions={ updateOptions }
      setUpdateOptions={ setIdentifiedUpdateOptions }
    />
    : <UserAppGet
      getOptions={ getOptions }
    />;

  function setIdentifiedUpdateOptions( newUpdateOptions )
  {
    identifyOptions( newUpdateOptions );

    setUpdateOptions( newUpdateOptions );
  }

  function createInitialGetOptions()
  {
    const userId = getUserAppLocationApi.getUserAppGetId();

    if ( userId === undefined ) return;

    const promise = createGetPromise( userId );

    return {
      userId,
    };
  }

  async function createGetPromise( userId )
  {
    const result = await getFormUser( userId );

    if ( result.user )
    {
      setIdentifiedUpdateOptions({
        dbUser: result.user,
        submitUser: result.user,
      });
    }
    else
    {
      setGetOptions({
        userId,
        fetchCommonError: result.fetchCommonError,
      });
    }
  }

  async function getFormUser( userId )
  {
    try {
      return await fetchUser( userId, lingo );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit
}
