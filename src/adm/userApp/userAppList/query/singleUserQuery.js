import { userQuery } from './userQuery.js';

let ac;

export async function singleUserQuery( options )
{
  console.log(`Starting query with options: "${ JSON.stringify( options )}"`);

  const abortReasonObsolete = 'obsolete';

  if (ac) {
    ac.abort(abortReasonObsolete);
  }

  ac = new AbortController();

  try {
    return await userQuery( options, ac.signal );
  }
  catch ( error )
  {
    if ( error !== abortReasonObsolete )
    {
      console.log(`usersAbortableFetch error: `, error);

      throw error;
    }
  }
  finally {
    ac = null;
  }
}
