import { IsDarkToggler } from './isDark/IsDarkToggler.jsx';
import './AppHeader.css';

export function AppHeader()
{
  return (
    <div className="AppHeader">
      <AppHeaderTitle />
      <IsDarkToggler />
    </div>
  );
}

function AppHeaderTitle()
{
  return (
    <div className="AppHeaderTitle">
      Admin panel - test React 19
    </div>
  );
}
