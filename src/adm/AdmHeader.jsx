import { useLingo } from './lingo/LingoProvider.jsx';
import { ColorScheme } from './colorScheme/ColorScheme.jsx';
import { LanguageSelector } from './lingo/LanguageSelector.jsx';
import './AdmHeader.css';

export function AdmHeader()
{
  return (
    <adm-header>
      <AppHeaderTitle />
      <LanguageSelector />
      <ColorScheme />
    </adm-header>
  );
}

function AppHeaderTitle()
{
  const { lingo } = useLingo();

  return (
    <adm-header-title>
      { lingo({
        en: 'Admin panel in React 19',
        de: 'Admin-Panel auf React 19',
      })}
    </adm-header-title>
  );
}
