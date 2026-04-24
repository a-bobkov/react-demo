import { newErrorBadRequest } from './newErrorBadRequest.js';
import { applyFilters } from './filter.js';
import { applySortings } from './sorting.js';
import { applyPagination, defaultPaginationLimit } from './pagination.js';

const defaultOptions = {
  pagination: {
    limit: defaultPaginationLimit
  }
};

export function query( items, options = defaultOptions )
{
  if ( options.constructor !== Object ) {
    throw newErrorBadRequest(`Query with non-object options: ${ JSON.stringify(options) }`);
  }

  const unknownOptionKeys = getUnknownOptionKeys(options);
  if (unknownOptionKeys.length) {
    throw newErrorBadRequest(`Query with unknown option keys: ${ JSON.stringify(unknownOptionKeys) }`);
  }

  let applied = Object.values( items );

  if (options.filters != null) {
    applied = applyFilters(applied, options.filters);
  }

  if (options.sortings != null) {
    applied = applySortings(applied, options.sortings);
  }

  const count = applied.length;

  if (options.pagination != null) {
    applied = applyPagination(applied, options.pagination);
  }

  return {
    count,
    list: applied,
  };
}

function getUnknownOptionKeys(options)
{
  const knownKeys = ['filters', 'sortings', 'pagination'];

  return Object.keys( options ).filter( key =>
    !knownKeys.includes( key )
  );
}
