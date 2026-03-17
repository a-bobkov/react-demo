import { useState } from 'react';

export function useAppUpdate()
{
  const [ updateOptions, setOptions ] = useState();

  return { updateOptions, setUpdateOptions };

  function setUpdateOptions( newUpdateOptions )
  {
    if ( newUpdateOptions.dbUser.id ) {
      locationUrlEdit( newUpdateOptions.dbUser.id );
    }

    identifyUpdateOptions( newUpdateOptions );

    setOptions( newUpdateOptions );
  }
}

function identifyUpdateOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit
}

function locationUrlEdit( userId )
{
  const newUrl = `/user/edit/${ userId }`;

  if (window.location.pathname !== newUrl)
  {
    window.history.replaceState(null, null, newUrl );
  }
}
