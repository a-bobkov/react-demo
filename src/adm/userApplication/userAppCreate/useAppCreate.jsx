import { useState } from 'react';

let createResultNextId = 1;  // to initialize form

export function useAppCreate()
{
  const [ createOptions, setOptions ] = useState( createInitialCreateOptions );

  return { createOptions, setCreateOptions, createNewUserOptions, isCreatePath };

  function setCreateOptions( createOptions )
  {
    locationUrlNew();

    idCreateOptions( createOptions );

    setOptions( createOptions );
  }
}

function createInitialCreateOptions()
{
  const createOptions = createNewUserOptions();

  idCreateOptions( createOptions );

  return createOptions;
}

function idCreateOptions( createOptions )
{
  createOptions.id = createResultNextId++;
}

function createNewUserOptions()
{
  const newUser = {
    login: '',
    name: '',
    company: '',
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

