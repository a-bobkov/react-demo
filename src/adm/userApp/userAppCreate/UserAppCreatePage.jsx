import { useState } from 'react';
import { UserAppCreate } from './UserAppCreate.jsx';
import { UserAppUpdate } from '../userAppUpdate/UserAppUpdate.jsx';
import { useSetUserAppLocationContext } from '../userLocation/UserAppLocationProvider.jsx';
import { updatePopstatePath } from '../../PopstateLink.jsx';

export function UserAppCreatePage()
{
  const setUserAppLocationApi = useSetUserAppLocationContext();

  const [ createOptions, setCreateOptions ] = useState( createInitialCreateOptions );

  const [ updateOptions, setUpdateOptions ] = useState();

  return updateOptions
    ? <UserAppUpdate
      updateOptions={ updateOptions }
      setUpdateOptions={ setIdentifiedUpdateOptions }
    />
    : <UserAppCreate
      createOptions={ createOptions }
      setCreateOptions={ setIdentifiedCreateOptions }
      setUpdateOptions={ setFirstUpdateOptions }
    />;

  function setFirstUpdateOptions( options )
  {
    updatePopstatePath( setUserAppLocationApi.getUserAppGetPath( options.dbUser.id ));

    setIdentifiedCreateOptions( options );
  }

  function setIdentifiedCreateOptions( options )
  {
    identifyOptions( options );

    setCreateOptions( options );
  }

  function setIdentifiedUpdateOptions( options )
  {
    identifyOptions( options );

    setUpdateOptions( options );
  }
}

function createInitialCreateOptions()
{
  const newCreateOptions = createNewUserOptions();

  identifyOptions( newCreateOptions );

  return newCreateOptions;
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit
}

function createNewUserOptions()
{
  const newUser = {
    login: '',
    name: '',
    company: '',
    active: false,
  };

  return {
    dbUser: newUser,
    submitUser: newUser,
  };
}
