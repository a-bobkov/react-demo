import { useState } from 'react';
import { useLingo } from '../lingo/LingoProvider.jsx';
import { queryBranches } from '../branchApp/branchAppList/singleQueryBranches.js';
import { useRunOnce } from '../useRunOnce.js';

export function useUserAppSubordinates()
{
  const { lingo } = useLingo();

  const [ subordinates, setSubordinates ] = useState();

  const [ subordinatesError, setSubordinatesError ] = useState();

  useRunOnce( requestSubordinates );

  return {
    subordinates: subordinates,
    subordinatesError: subordinatesError,
  };

  async function requestSubordinates()
  {
    try {
      const subordinatesValue = await promiseObject({
        branches: queryBranchList(),
      });

      setSubordinates( subordinatesValue );
    }
    catch ( error )
    {
      const userSubordinatesErrorMessage = lingo({
        en: 'Error while requesting user subordinates',
        de: 'Fehler beim Anfordern von Benutzer-Untergebenen',
      });

      setSubordinatesError( new Error( userSubordinatesErrorMessage, { cause: error }));
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
