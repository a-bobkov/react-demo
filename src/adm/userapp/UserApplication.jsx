import { useState } from 'react';
import { UsersApp } from '../users/UsersApp.jsx';
import { UserApp } from '../user/UserApp.jsx';
import { loadUsersOptions, saveUsersOptions } from './usersSearchParams.js';

export function UserApplication()
{
  const [ mode, setMode ] = useState( createInitialMode );
  const [ listOptions, setListOptions ] = useState( createInitialListOptions );
  const [ editUserId, setEditUserId ] = useState( createInitialEditUserId );

  if ( mode === 'list') {
    return <UsersApp
      options={ listOptions }
      onChangeOptions={ onChangeOptions }
      changeModeNew={ changeModeNew }
      setModeEdit={ changeModeEdit }
    />;
  }

  if ( mode === 'edit') {
    return <UserApp
      userId={ editUserId }
      setModeList={ setModeList }
    />;
  }

  if ( mode === 'new')
  {
    return <UserApp
      setModeList={ setModeList }
    />;
  }

  function onChangeOptions( options )
  {
    saveUsersOptions( options );
    setListOptions( options );
  }

  function setModeList()
  {
    setUrlList( listOptions );
    setMode('list');
  }

  function changeModeNew()
  {
    setUrlNew();
    setMode('new');
  }

  function changeModeEdit( userId )
  {
    setUrlEdit( userId );
    setEditUserId( userId );
    setMode('edit');
  }
}

function setUrlList( options )
{
  window.history.replaceState(null, null, '/user/list' );
  saveUsersOptions( options );
}

function setUrlNew()
{
  window.history.replaceState(null, null, '/user/new' );
}

function setUrlEdit( userId )
{
  window.history.replaceState(null, null, `/user/edit/${ userId }` );
}

function createInitialMode()
{
  const pathname = window.location.pathname;

  if (pathname === '/user/list') {
    return 'list';
  }

  if (pathname === '/user/new') {
    return 'new';
  }

  if (pathname.match(/^\/user\/edit\/(\d+)$/)) {
    return 'edit';
  }

  return 'list';
}

function createInitialEditUserId()
{
  const pathname = window.location.pathname;

  const [, userId] = pathname.match(/^\/user\/edit\/(\d+)$/) ?? [];

  return parseInt( userId );
}

function createInitialListOptions()
{
  const defaultOptions = {
    filter: {},
    sorting: {},
    pagination: {
      size: 10,
      count: 1,
    },
  };

  const loadedOptions = loadUsersOptions();

  const options = {
    filter: Object.assign( defaultOptions.filter, loadedOptions.filter ),
    sorting: Object.assign( defaultOptions.sorting, loadedOptions.sorting ),
    pagination: Object.assign( defaultOptions.pagination, loadedOptions.pagination ),
  };

  return options;
}
