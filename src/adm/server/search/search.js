import { newErrorBadRequest } from './newErrorBadRequest.js';
import { applyFilters } from './filter.js';
import { applySortings } from './sorting.js';
import { applyPagination, defaultPaginationLimit } from './pagination.js';

const defaultOptions = {
  pagination: {
    limit: defaultPaginationLimit
  }
};

export default function search(users, options = defaultOptions)
{
  if (options.constructor.name !== 'Object') {
    throw newErrorBadRequest(`Search with non-object options: ${ JSON.stringify(options) }`);
  }

  const unknownOptionKeys = getUnknownOptionKeys(options);
  if (unknownOptionKeys.length) {
    throw newErrorBadRequest(`Search with unknown option keys: ${ JSON.stringify(unknownOptionKeys) }`);
  }

  let applied = Object.values(users);

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
    items: applied,
  };
}

function getUnknownOptionKeys(options)
{
  const knownKeys = ['filters', 'sortings', 'pagination'];

  return Object.keys(options).filter((key) =>
    !knownKeys.includes(key)
  );
}
