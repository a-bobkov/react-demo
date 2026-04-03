import { useState } from 'react';

export function useAppCreate()
{
  const [ createOptions, setOptions ] = useState( createInitialCreateOptions );

  return { createOptions, setCreateOptions, isCreatePath, createNewUserOptions };

  function setCreateOptions( newCreateOptions )
  {
    identifyCreateOptions( newCreateOptions );

    setOptions( newCreateOptions );
  }
}

function createInitialCreateOptions()
{
  const newCreateOptions = createNewUserOptions();

  identifyCreateOptions( newCreateOptions );

  return newCreateOptions;
}

function identifyCreateOptions( options )
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

function isCreatePath()
{
  const pathname = window.location.pathname;

  return pathname === '/user/new';
}

function locationUrlNew()
{
  const newUrl = '/user/new';

  if (window.location.pathname !== newUrl)
  {
    window.history.replaceState(null, null, newUrl );
  }
}
