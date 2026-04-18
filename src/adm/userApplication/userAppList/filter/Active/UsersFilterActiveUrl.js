const filterPropName = 'active';

const urlPropName = 'active';

export function saveFilterActive( searchParams, filter )
{
  const filterValue = filter[ filterPropName ];

  if (filterValue !== undefined) {
    searchParams.set( urlPropName, serializeActive( filterValue ));
  }
}

function serializeActive( value )
{
  return value ? '1' : '';
}

export function loadFilterActive( searchParams )
{
  const filter = {};

  const filterValue = searchParams.get( urlPropName );

  if (filterValue !== null) {
    filter[ filterPropName ] = deserializeActive( filterValue );
  }

  return filter;
}

function deserializeActive( str )
{
  return !!str;
}
