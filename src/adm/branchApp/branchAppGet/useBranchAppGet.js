import { useMemo, useState } from 'react';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { getBranch } from './getBranch.js';

export function useBranchAppGet( branchId )
{
  const apiNotifications = useNotificationsContext();

  const [ branch, setBranch ] = useState( checkBranchId );

  const ignore = useMemo(
    loadingBranch,
    []
  );

  return {
    branch,
  };

  function checkBranchId()
  {
    if ( branchId === undefined )
    {
      apiNotifications.addError({
        en: 'Branch id not found because of incorrect URL',
        de: 'Niederlassung-ID nicht gefunden, da URL falsch ist',
      });

      return new Error();
    }
  }

  async function loadingBranch()
  {
    if ( branchId === undefined )
    {
      return;
    }

    try
    {
      const result = await getBranch( branchId );

      setBranch( result.branch );
    }
    catch ( error )
    {
      apiNotifications.addError({
        en: `Error getting branch ${ branchId }: ${ error.message }`,
        de: `Fehler beim Abrufen der Niederlassung ${ branchId }: ${ error.message }`,
      });

      setBranch( error );
    }
  }
}
