import { useAdmLocation } from './useAdmLocation.js';
import { AdmMenu } from './AdmMenu.jsx';
import { AdmApp } from './AdmApp.jsx';
import './AdmApps.css';

export function AdmApps()
{
  const { admLocationApi } = useAdmLocation();

  return (
    <adm-apps>
      <AdmMenu
        admLocationApi={ admLocationApi }
      />
      <AdmApp
        admLocationApi={ admLocationApi }
      />
    </adm-apps>
  );
}
