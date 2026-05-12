import { useMemo, useState } from 'react';
import { singleBranchQuery } from './query/singleBranchQuery.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';

export function useBranchAppListLoad( options )
{
  const apiNotifications = useNotificationsContext();

  const [ branches, setBranches ] = useState();

  const ignore = useMemo(
    () => loadBranches( options ),
    [ options ]
  );

  return {
    branches,
  };

  async function loadBranches( options )
  {
    try {
      const newBranches = await singleBranchQuery( options );

      if ( newBranches )   // fetch was not aborted
      {
        Object.assign( newBranches, window.structuredClone( options ));

        setBranches( newBranches );
      }
    }
    catch ( error )
    {
      apiNotifications.addError({
        en: `Error while requesting branches: ${ error.message }`,
        de: `Fehler beim Anfordern der Niederlassungen: ${ error.message }`,
      });

      setBranches( error );
    }
  }
}
