const filterPropName = 'branch';

const urlPropName = 'branch';

export function saveFilterBranch( searchParams, filter )
{
  const filterValue = filter[ filterPropName ];

  if (filterValue !== undefined) {
    searchParams.set( urlPropName, serialize( filterValue ));
  } else {
    searchParams.delete( urlPropName );
  }
}

export function loadFilterBranch( searchParams )
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
  return String( filterValue.id );
}

function deserialize( urlValue )
{
  return {
    id: parseInt( urlValue ),
  };
}
