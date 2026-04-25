let ac;

export async function fetchBranches( options )
{
  console.log(`Starting fetch with options: "${ JSON.stringify( options )}"`);

  const abortReasonObsolete = 'obsolete';

  if (ac) {
    ac.abort(abortReasonObsolete);
  }

  ac = new AbortController();

  try {
    return await abortableFetch( options, ac.signal );
  }
  catch (error) {
    if (error !== abortReasonObsolete) {
      console.log(`branchesAbortableFetch error: `, error);
    }
  }
  finally {
    ac = null;
  }
}

async function abortableFetch( options, signal )
{
  console.log(`Starting abortable with options: "${ JSON.stringify( options )}"`);

  const body = (new TextEncoder).encode( JSON.stringify( getRequestOptions( options )));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    '/api/branch',
    {
      method: 'QUERY',
      headers,
      body,
      signal,
    }
  );

  const branches = await response.json();

  console.log(`Finished fetch: "${ JSON.stringify( branches )}"`);

  return branches;
}

function getRequestOptions( options )
{
  return {
    filters: getRequestFilters( options.filter ),
    sortings: getRequestSortings( options.sorting ),
    pagination: getRequestPagination( options.pagination ),
  }
}

function getRequestFilters( filter )
{
  const requestFilters = [];

  if ( filter.login !== undefined ) {
    requestFilters.push({
      field: 'login',
      operator: 'includes',
      value: filter.login,
    });
  }

  if ( filter.name !== undefined ) {
    requestFilters.push({
      field: 'name',
      operator: 'includes',
      value: filter.name,
    });
  }

  if ( filter.active !== undefined ) {
    requestFilters.push({
      field: 'active',
      operator: 'equal',
      value: filter.active,
    });
  }

  return requestFilters;
}

function getRequestSortings( sorting = {})
{
  const requestSortings = [];

  const sortings = Object.entries( sorting );

  if (sortings.length > 0) {
    const [[ field, order ]] = sortings;
    requestSortings.push({ field, order})
  }

  return requestSortings;
}

function getRequestPagination( pagination )
{
  return {
    limit: pagination.size,
    offset: (pagination.count - 1) * pagination.size,
  };
}
