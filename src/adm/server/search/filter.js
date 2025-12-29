import { newErrorBadRequest } from './newErrorBadRequest.js';

export function applyFilters(data, filters)
{
  if (!Array.isArray(filters)) {
    throw newErrorBadRequest(`Search with non-array filters: ${ JSON.stringify(filters) }`);
  }

  return filters.reduce(
    (result, filter) => applyFilter(result, filter),
    data,
  );
}

function applyFilter(data, filter)
{
  if (filter == null) {
    throw newErrorBadRequest(`Search with empty filter: ${ filter }`);
  }

  if (filter.constructor.name !== 'Object') {
    throw newErrorBadRequest(`Search with non-object filter: ${ filter }`);
  }

  if (filter.operator === 'includes') {
    return applyFilterIncludes(data, filter.field, filter.value);
  }

  throw newErrorBadRequest(`Search with unknown filter operator: ${ JSON.stringify(filter.operator) }`);
}

function applyFilterIncludes(data, fieldName, value)
{
  if (fieldName == null) {
    throw newErrorBadRequest(`Search filter with empty field name: ${ fieldName }`);
  }

  if (value == null) {
    throw newErrorBadRequest(`Search filter with empty value: ${ value }`);
  }

  return data.filter((item) =>
    String(item[fieldName]).includes(value)
  )
}
