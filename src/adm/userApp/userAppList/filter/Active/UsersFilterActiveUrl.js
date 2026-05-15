const filterPropName = 'active';

const urlPropName = 'active';

export function saveFilterActive( searchParams, filter )
{
  const filterValue = filter[ filterPropName ];

  if (filterValue !== undefined) {
    searchParams.set( urlPropName, serialize( filterValue ));
  } else {
    searchParams.delete( urlPropName );
  }
}

export function loadFilterActive( searchParams )
{
  const filter = {};

  const filterValue = searchParams.get( urlPropName );

  if (filterValue !== null) {
    filter[ filterPropName ] = deserialize( filterValue );
  }

  return filter;
}

function serialize( filterValue )
{
  return filterValue ? '1' : '';
}

function deserialize( urlValue )
{
  return Boolean( urlValue );
}
