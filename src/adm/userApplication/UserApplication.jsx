import { useState } from 'react';
import { useAppList } from './userAppList/useAppList.jsx';
import { UserAppList } from './userAppList/UserAppList.jsx';
import { useAppGet } from './userAppGet/useAppGet.jsx';
import { UserAppGet } from './userAppGet/UserAppGet.jsx';
import { useAppCreate } from './userAppCreate/useAppCreate.jsx';
import { UserAppCreate } from './userAppCreate/UserAppCreate.jsx';
import { useAppUpdate } from './userAppUpdate/useAppUpdate.jsx';
import { UserAppUpdate } from './userAppUpdate/UserAppUpdate.jsx';

const LIST_MODE = 'list';
const GET_MODE = 'get';
const CREATE_MODE = 'create';
const UPDATE_MODE = 'update';

export function UserApplication()
{
  const { listOptions, setListOptions, isListPath } = useAppList();
  const { getOptions, setUserId, isGetPath } = useAppGet( setModeUpdate );
  const { createOptions, setCreateOptions, createNewUser, isCreatePath } = useAppCreate();
  const { updateOptions, setUpdateOptions } = useAppUpdate();
  const [ mode, setMode ] = useState( createInitialMode );

  if ( mode === LIST_MODE ) {
    return <UserAppList
      listOptions={ listOptions }
      setListOptions={ setListOptions }
      setModeGet={ setModeGet }
      setModeNew={ setModeNew }
    />;
  }

  if ( mode === GET_MODE ) {
    return <UserAppGet
      getOptions={ getOptions }
    />;
  }

  if ( mode === CREATE_MODE ) {
    return <UserAppCreate
      createOptions={ createOptions }
      setCreateOptions={ setCreateOptions }
      setModeUpdate={ setModeUpdate }
      setModeList={ setModeList }
    />;
  }

  if ( mode === UPDATE_MODE ) {
    return <UserAppUpdate
      updateOptions={ updateOptions }
      setUpdateOptions={ setUpdateOptions }
      setModeList={ setModeList }
    />;
  }

  function setModeList()
  {
    setListOptions({ ...listOptions });

    setMode( LIST_MODE );
  }

  function setModeGet( userId )
  {
    setUserId( userId );

    setMode( GET_MODE );
  }

  function setModeNew()
  {
    setCreateOptions( createNewUser());

    setMode( CREATE_MODE );
  }

  function setModeUpdate( updateOptions )
  {
    setUpdateOptions( updateOptions );

    setMode( UPDATE_MODE );
  }

  function createInitialMode()
  {
    if ( isListPath()) {
      return LIST_MODE;
    }

    if ( isGetPath()) {
      return GET_MODE;
    }

    if ( isCreatePath()) {
      return CREATE_MODE;
    }
  }
}
