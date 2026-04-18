const filterPropName = 'login';

const urlPropName = 'login';

export function saveFilterLogin( searchParams, filter )
{
  const filterValue = filter[ filterPropName ];

  if (filterValue !== undefined) {
    searchParams.set( urlPropName, filterValue );
  }
}

export function loadFilterLogin( searchParams )
{
  const filter = {};

  const searchParamsValue = searchParams.get( urlPropName );

  if (searchParamsValue) {
    filter[ filterPropName ] = searchParamsValue;
  }

  return filter;
}
