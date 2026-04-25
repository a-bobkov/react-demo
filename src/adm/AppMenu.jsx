import { useLingo } from './lingo/LingoProvider.jsx';
import { useAppLocationContext } from './location/AppLocationProvider.jsx';
import './AppMenu.css';

export function AppMenu()
{
  const { lingo } = useLingo();

  const appLocationApi = useAppLocationContext();

  return (
    <div className="AppMenu">
      <div className="Header">
        { lingo({
          en: `Applications`,
          de: `Anwendungen`,
        })}
      </div>
      <div className="MenuItem">
        <a href={ appLocationApi.getUserPath() } onClick={ onClick }>
          { lingo({
            en: `Users`,
            de: `Benutzer`,
          })}
        </a>
      </div>
      <div className="MenuItem">
        <a href={ appLocationApi.getBranchPath() } onClick={ onClick }>
          { lingo({
            en: `Branches`,
            de: `Niederlassungen`,
          })}
        </a>
      </div>
    </div>
  );

  function onClick( event )
  {
    if ( event.ctrlKey || event.metaKey || event.button === 1 ) return;

    event.preventDefault();

    appLocationApi.goPath( event.target.pathname );
  }
}
