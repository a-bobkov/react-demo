export function PopstateLink({ children, path })
{
  return (
    <a href={ path } onClick={ onClick }>
      { children }
    </a>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    goPath( event.target.pathname );
  }
}

function goPath( path )
{
  window.history.pushState(null, null, path );

  window.dispatchEvent( new Event('popstate'));
}
