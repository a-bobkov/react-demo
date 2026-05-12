import { useState } from 'react';
import { useRunOnce } from '../useRunOnce.js';
import { useNotificationsContext } from '../notifications/NotificationsProvider.jsx';
import { querySalutations } from '../querySalutation.js';
import { branchQuery } from '../branchApp/branchAppList/query/branchQuery.js';

export function useUserAppSubordinates()
{
  const apiNotifications = useNotificationsContext();

  const [ subordinates, setSubordinates ] = useState();

  useRunOnce( requestSubordinates );

  return {
    subordinates: subordinates,
  };

  async function requestSubordinates()
  {
    try {
      const subordinates = await objectPromiseAll({
        salutations: querySalutationList(),
        branches: queryBranchList(),
      });

      setSubordinates( subordinates );
    }
    catch ( error )
    {
      console.error( error );

      apiNotifications.addError({
        en: `Error getting user subordinates: ${ error.message }`,
        de: `Fehler beim Anfordern von Benutzer-Untergebenen: ${ error.message }`,
      });

      setSubordinates( error );
    }
  }
}

async function queryBranchList()
{
  const branches = await branchQuery();

  return branches.list;
}

async function querySalutationList()
{
  const salutations = await querySalutations();

  return salutations.list;
}

async function objectPromiseAll( obj )
{
  const promises = Object.entries( obj ).map( waitEntry );

  const results = await Promise.all( promises );

  return Object.fromEntries( results );
}

async function waitEntry([ key, value ])
{
  return [ key, await value ];
}
