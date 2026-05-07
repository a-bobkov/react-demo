import { newErrorBadRequest } from './newErrorBadRequest.js';

export function applyFilters(data, filters)
{
  if (!Array.isArray(filters)) {
    throw newErrorBadRequest(`Query with non-array filters: ${ JSON.stringify(filters) }`);
  }

  return filters.reduce(
    (result, filter) => applyFilter(result, filter),
    data,
  );
}

function applyFilter(data, filter)
{
  if (filter == null) {
    throw newErrorBadRequest(`Query with empty filter: ${ filter }`);
  }

  if ( filter.constructor !== Object ) {
    throw newErrorBadRequest(`Query with non-object filter: ${ filter }`);
  }

  if ( filter.field == null ) {
    throw newErrorBadRequest(`Query filter with empty field name: ${ filter.field }`);
  }

  if (filter.operator === 'includes') {
    return applyFilterIncludes(data, filter.field, filter.value);
  }

  if ( filter.operator === 'equal' ) {
    return applyFilterEqual( data, filter.field, filter.value );
  }

  throw newErrorBadRequest(`Query with unknown filter operator: ${ JSON.stringify(filter.operator) }`);
}

function applyFilterIncludes(data, fieldName, value)
{
  if (value == null) {
    throw newErrorBadRequest(`Query filter with empty value: ${ value }`);
  }

  const lowerCasedValue = value.toLowerCase();

  return data.filter((item) =>
    String(item[fieldName]).toLowerCase().includes(lowerCasedValue)
  );
}

function applyFilterEqual( items, fieldName, filterValue )
{
  if ( filterValue == null ) {
    throw newErrorBadRequest(`Query filter with empty value: ${ filterValue }`);
  }

  return items.filter( item =>
    isEqual( item[ fieldName ], filterValue )
  );
}

function isEqual( itemValue, filterValue )
{
  return isObject( filterValue )
    ? JSON.stringify( filterValue ) === JSON.stringify( itemValue )
    : filterValue === itemValue;
}

function isObject( value )
{
  return value != null
    && value.constructor === Object;
}