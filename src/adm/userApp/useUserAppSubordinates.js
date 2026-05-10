import { useState } from 'react';
import { useLingo } from '../lingo/LingoProvider.jsx';
import { queryBranches } from '../branchApp/branchAppList/singleQueryBranches.js';
import { useRunOnce } from '../useRunOnce.js';
import { useNotificationsContext } from '../notifications/NotificationsProvider.jsx';

export function useUserAppSubordinates()
{
  const { lingo } = useLingo();

  const apiNotifications = useNotificationsContext();

  const [ subordinates, setSubordinates ] = useState();

  useRunOnce( requestSubordinates );

  return {
    subordinates: subordinates,
  };

  async function requestSubordinates()
  {
    try {
      const subordinates = await promiseObject({
        branches: queryBranchList(),
      });

      setSubordinates( subordinates );
    }
    catch ( error )
    {
      apiNotifications.addError( lingo({
        en: `Error while requesting user subordinates: ${ error.message }`,
        de: `Fehler beim Anfordern von Benutzer-Untergebenen: ${ error.message }`,
      }));

      setSubordinates( error );
    }
  }
}

async function queryBranchList()
{
  const branches = await queryBranches();

  return branches.list;
}

async function promiseObject( obj )
{
  const promises = Object.entries( obj ).map( waitEntry );

  const results = await Promise.all( promises );

  return Object.fromEntries( results );
}

async function waitEntry([ key, value ])
{
  return [ key, await value ];
}
