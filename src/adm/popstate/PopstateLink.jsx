import './PopstateLink.css';

export function PopstateLink({ children, path, onClickBefore })
{
  return (
    <a
      className="PopstateLink"
      href={ path }
      onClick={ onClick }
    >
      { children }
    </a>
  );

  function onClick( event )
  {
    if ( onClickBefore ) {
      onClickBefore();
    }

    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();
    event.stopPropagation();

    createHistoryEntry( path );
  }
}

export function createHistoryEntry( path )
{
  window.history.pushState(null, null, path );

  window.dispatchEvent( new Event('popstate'));
}

export function updateHistoryEntry( path )
{
  window.history.replaceState(null, null, path );
}
