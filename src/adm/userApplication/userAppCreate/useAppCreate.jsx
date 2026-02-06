import { useState } from 'react';

let createResultNextId = 1;  // to initialize form

export function useAppCreate()
{
  const [ createOptions, setOptions ] = useState( createInitialCreateOptions );

  return { createOptions, setCreateOptions, createNewUser, isCreatePath };

  function setCreateOptions( createOptions )
  {
    locationUrlNew();

    idCreateOptions( createOptions );

    setOptions( createOptions );
  }
}

function createInitialCreateOptions()
{
  const createOptions = createNewUser();

  idCreateOptions( createOptions );

  return createOptions;
}

function idCreateOptions( createOptions )
{
  createOptions.id = 'create_' + createResultNextId++;
}

function createNewUser()
{
  return {
    user: {
      login: '',
      name: '',
      company: '',
    },
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

