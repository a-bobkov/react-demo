import { IsDarkToggler } from './isDark/IsDarkToggler.jsx';
import { LanguageSelector } from './lingo/LanguageSelector.jsx';
import { useLingo } from './lingo/LingoProvider.jsx';
import './AdmHeader.css';

export function AdmHeader()
{
  return (
    <div className="AdmHeader">
      <AppHeaderTitle />
      <IsDarkToggler />
      <LanguageSelector />
    </div>
  );
}

function AppHeaderTitle()
{
  const { lingo } = useLingo();

  return (
    <div className="AppHeaderTitle">
      { lingo({
        en: 'Admin panel in React 19',
        de: 'Admin-Panel auf React 19',
      })}
    </div>
  );
}
