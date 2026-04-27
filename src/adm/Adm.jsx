import { AppHeader } from './AppHeader.jsx';
import { AppMenu } from './AppMenu.jsx';
import { Application } from './Application.jsx';
import { AppFooter } from './AppFooter.jsx';
import './Adm.css';

export default function Adm()
{
  return (
    <div className="Adm">
      <div className="header">
        <AppHeader />
      </div>
      <div className="menu">
        <AppMenu />
      </div>
      <div className="app">
        <Application />
      </div>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );
}
