import { useState } from 'react';
import { useAppLocationContext } from './location/AppLocationProvider.jsx';
import { usePopstate } from './usePopstate.js';
import { AppHeader } from './AppHeader.jsx';
import { AppMenu } from './AppMenu.jsx';
import { Application } from './Application.jsx';
import { AppFooter } from './AppFooter.jsx';
import './Adm.css';

export const USER_APP = 'USER_APP';
export const BRANCH_APP = 'BRANCH_APP';

export default function Adm()
{
  const appLocationApi = useAppLocationContext();

  usePopstate( dispatchBranchPath );

  const [ app, setApp ] = useState( getLocationApp );

  return (
    <div className="Adm">
      <div className="header">
        <AppHeader />
      </div>
      <div className="menu">
        <AppMenu setApp={ setApp } />
      </div>
      <div className="app">
        <Application app={ app } />
      </div>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );

  function dispatchBranchPath()
  {
    setApp( getLocationApp() );
  }

  function getLocationApp()
  {
    if ( appLocationApi.isUserPath())
    {
      return USER_APP;
    }

    if ( appLocationApi.isBranchPath())
    {
      return BRANCH_APP;
    }
  }
}
