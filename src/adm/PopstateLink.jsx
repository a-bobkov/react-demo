export function PopstateLink({ children, path, className })
{
  return (
    <a className={ className } href={ path } onClick={ onClick }>
      { children }
    </a>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    goPopstatePath( event.target.pathname );
  }
}

export function goPopstatePath( path )
{
  window.history.pushState(null, null, path );

  window.dispatchEvent( new Event('popstate'));
}

export function updatePopstatePath( path )
{
  window.history.replaceState(null, null, path );
}
