import { branchQuery } from './branchQuery.js';

let ac;

export async function singleBranchQuery( options )
{
  console.log(`Starting query with options: "${ JSON.stringify( options )}"`);

  const abortReasonObsolete = 'obsolete';

  if (ac) {
    ac.abort(abortReasonObsolete);
  }

  ac = new AbortController();

  try {
    return await branchQuery( options, ac.signal );
  }
  catch ( error )
  {
    if ( error !== abortReasonObsolete )
    {
      console.log(`branchQuery error: `, error);

      throw error;
    }
  }
  finally {
    ac = null;
  }
}
