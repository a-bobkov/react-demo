export function getRequestOptions( options = {})
{
  return {
    filters: getRequestFilters( options.filter ),
    sortings: getRequestSortings( options.sorting ),
    pagination: getRequestPagination( options.pagination ),
  }
}

function getRequestFilters( filter = {})
{
  const requestFilters = [];

  if ( filter.name !== undefined ) {
    requestFilters.push({
      field: 'name',
      operator: 'includes',
      value: filter.name,
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

function getRequestPagination( pagination = {})
{
  return {
    limit: pagination.size,
    offset: (pagination.count - 1) * pagination.size,
  };
}
