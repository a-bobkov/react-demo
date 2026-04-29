import { useAppLocation } from './useAppLocation.js';
import { AppHeader } from './AppHeader.jsx';
import { AppMenu } from './AppMenu.jsx';
import { Application } from './Application.jsx';
import { AppFooter } from './AppFooter.jsx';
import './Adm.css';

export default function Adm()
{
  const { appLocationApi } = useAppLocation();

  return (
    <div className="Adm">
      <div className="header">
        <AppHeader />
      </div>
      <div className="menu">
        <AppMenu
          appLocationApi={ appLocationApi }
        />
      </div>
      <div className="app">
        <Application
          appLocationApi={ appLocationApi }
        />
      </div>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );
}
