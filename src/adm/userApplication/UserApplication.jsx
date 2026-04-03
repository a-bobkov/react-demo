import { useState } from 'react';
import { useAppList } from './userAppList/useAppList.jsx';
import { UserAppList } from './userAppList/UserAppList.jsx';
import { useAppGet } from './userAppGet/useAppGet.jsx';
import { UserAppGet } from './userAppGet/UserAppGet.jsx';
import { useAppCreate } from './userAppCreate/useAppCreate.jsx';
import { UserAppCreate } from './userAppCreate/UserAppCreate.jsx';
import { useAppUpdate } from './userAppUpdate/useAppUpdate.jsx';
import { UserAppUpdate } from './userAppUpdate/UserAppUpdate.jsx';
import { usePopstate } from './usePopstate.js';

const LIST_MODE = 'list';
const GET_MODE = 'get';
const CREATE_MODE = 'create';
const UPDATE_MODE = 'update';

export function UserApplication()
{
  const { listOptions, setListOptions, isListPath, createListOptions } = useAppList();
  const { getOptions, setUserId, isGetPath, createUserId } = useAppGet( setModeUpdate );
  const { createOptions, setCreateOptions, isCreatePath, createNewUserOptions } = useAppCreate();
  const { updateOptions, setUpdateOptions } = useAppUpdate();
  const [ mode, setMode ] = useState( createInitialMode );

  usePopstate( onPopstate );

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
    />;
  }

  if ( mode === UPDATE_MODE ) {
    return <UserAppUpdate
      updateOptions={ updateOptions }
      setUpdateOptions={ setUpdateOptions }
    />;
  }

  function setModeGet( userId )
  {
    window.history.pushState(null, null, `/user/edit/${ userId }`);

    dispatchUserGet();
  }

  function setModeNew()
  {
    window.history.pushState(null, null, '/user/new')

    dispatchUserCreate();
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

  function onPopstate( event )
  {
    console.log(`onPopstate event: `, event );

    dispatchUserList();
    dispatchUserGet();
    dispatchUserCreate();
  }

  function dispatchUserList()
  {
    if ( isListPath() )
    {
      setListOptions( createListOptions() );

      setMode( LIST_MODE );
    }
  }

  function dispatchUserGet()
  {
    const userId = createUserId();

    if ( userId != null )
    {
      setUserId( userId );

      setMode( GET_MODE );
    }
  }

  function dispatchUserCreate()
  {
    if ( isCreatePath() )
    {
      setCreateOptions( createNewUserOptions());

      setMode( CREATE_MODE );
    }
  }
}
