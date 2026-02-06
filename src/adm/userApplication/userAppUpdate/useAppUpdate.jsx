import { useState } from 'react';

let updateOptionsNextId = 1;  // to initialize form

export function useAppUpdate()
{
  const [ updateOptions, setOptions ] = useState();

  return { updateOptions, setUpdateOptions };

  function setUpdateOptions( newUpdateOptions )
  {
    if ( newUpdateOptions.user.id ) {
      locationUrlEdit( newUpdateOptions.user.id );
    }

    newUpdateOptions.id = 'update_' + updateOptionsNextId++;

    setOptions( newUpdateOptions );
  }
}

function locationUrlEdit( userId )
{
  const newUrl = `/user/edit/${ userId }`;

  if (window.location.pathname !== newUrl)
  {
    window.history.replaceState(null, null, newUrl );
  }
}
