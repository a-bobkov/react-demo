import { abortableQueryUser } from './abortableQueryUser.js';

let ac;

export async function queryUser( options )
{
  console.log(`Starting query with options: "${ JSON.stringify( options )}"`);

  const abortReasonObsolete = 'obsolete';

  if (ac) {
    ac.abort(abortReasonObsolete);
  }

  ac = new AbortController();

  try {
    return await abortableQueryUser( options, ac.signal );
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
