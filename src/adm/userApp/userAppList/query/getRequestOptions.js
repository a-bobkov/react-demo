export function getRequestOptions( options )
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

  if ( filter.branch !== undefined ) {
    requestFilters.push({
      field: 'branch',
      operator: 'equal',
      value: filter.branch,
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
