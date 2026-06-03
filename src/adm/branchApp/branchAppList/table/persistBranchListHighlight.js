const highlightSearchParamKey = 'highlight';

export function saveHighlight( highlight )
{
  if ( highlight !== undefined ) {
    saveSearchParam(
      highlightSearchParamKey,
      serializeHighlight( highlight )
    )
  } else {
    deleteSearchParam( highlightSearchParamKey );
  }
}

export function loadHighlight()
{
  const searchParamValue = loadSearchParam( highlightSearchParamKey );

  if ( searchParamValue ) {
    return deserializeHighlight( searchParamValue );
  }
}

function serializeHighlight( highlightValue )
{
  return `${ highlightValue }`;
}

function deserializeHighlight( searchParamValue )
{
  return parseInt( searchParamValue );
}

function saveSearchParam( key, value )
{
  const searchParams = loadSearchParams();

  searchParams.set( key, value );

  saveSearchParams( searchParams );
}

function deleteSearchParam( key )
{
  const searchParams = loadSearchParams();

  searchParams.delete( key );

  saveSearchParams( searchParams );
}

function loadSearchParam( key )
{
  const searchParams = loadSearchParams();

  return searchParams.get( key );
}

function loadSearchParams()
{
  return new URLSearchParams( window.location.search );
}

function saveSearchParams( searchParams )
{
  const path = `${ window.location.pathname }?${ searchParams }`;

  window.history.replaceState(null, null, path );
}
