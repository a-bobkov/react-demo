import { useLingo } from './lingo/LingoProvider.jsx';
import './AppMenu.css';

export function AppMenu()
{
  const { lingo } = useLingo();

  return (
    <>
      <div className="Menu">
        <div className="Header">
          { lingo({
            en: `Applications`,
            de: `Anwendungen`,
          })}
        </div>
        <div className="MenuItem">
          <a href="/user">
            { lingo({
              en: `Users`,
              de: `Benutzer`,
            })}
          </a>
        </div>
      </div>
    </>
  );
}
