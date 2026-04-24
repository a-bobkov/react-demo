import { newErrorBadRequest } from './newErrorBadRequest.js';

const maxPaginationLimit = 50;

export const defaultPaginationLimit = 10;

export function applyPagination(data, pagination)
{
  if ( pagination.constructor !== Object ) {
    throw newErrorBadRequest(`Query with non-object pagination: ${ JSON.stringify(pagination) }`);
  }

  if ( pagination.limit && pagination.limit.constructor !== Number ) {
    throw newErrorBadRequest(`Query with non-number pagination limit: ${ JSON.stringify(pagination) }`);
  }

  if ( pagination.offset && pagination.offset.constructor !== Number ) {
    throw newErrorBadRequest(`Query with non-number pagination offset: ${ JSON.stringify(pagination) }`);
  }

  const limit = Math.min(pagination.limit || defaultPaginationLimit, maxPaginationLimit);

  const offset = pagination.offset || 0;

  return data.slice(offset, offset + limit);
}
