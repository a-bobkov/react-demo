import { newErrorBadRequest } from './newErrorBadRequest.js';

export function applySortings(data, sortings)
{
  if (!Array.isArray(sortings)) {
    throw newErrorBadRequest(`Query with non-array sortings: ${ JSON.stringify(sortings) }`);
  }

  return data.toSorted(compare);

  function compare(a, b)
  {
    for (const sorting of sortings)
    {
      const result = compareBySorting(a, b, sorting);

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  }
}

function compareBySorting(a, b, sorting)
{
  if (sorting == null) {
    throw newErrorBadRequest(`Query with empty sorting: ${ sorting }`);
  }

  if ( sorting.constructor !== Object ) {
    throw newErrorBadRequest(`Query with non-object sorting: ${ JSON.stringify(sorting) }`);
  }

  if (sorting.field == null) {
    throw newErrorBadRequest(`Query with empty sorting field: ${ JSON.stringify(sorting) }`);
  }

  if (![undefined, 'asc', 'desc'].includes(sorting.order)) {
    throw newErrorBadRequest(`Query with unknown sorting order: ${ JSON.stringify(sorting) }`);
  }

  const aValue = a[sorting.field];

  const bValue = b[sorting.field];

  const result = aValue === bValue ? 0 : (aValue > bValue ? 1 : -1);

  const order = (sorting.order === 'asc') ? 1 : -1;

  return result * order;
}
