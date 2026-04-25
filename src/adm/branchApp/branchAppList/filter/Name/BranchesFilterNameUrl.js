const filterPropName = 'name';

const urlPropName = 'name';

export function saveFilterName( searchParams, filter )
{
  const filterValue = filter[ filterPropName ];

  if (filterValue !== undefined) {
    searchParams.set( urlPropName, filterValue );
  }
}

export function loadFilterName(searchParams )
{
  const filter = {};

  const searchParamsValue = searchParams.get( urlPropName );

  if (searchParamsValue) {
    filter[ filterPropName ] = searchParamsValue;
  }

  return filter;
}
