import { useAdmLocation } from './useAdmLocation.js';
import { AdmHeader } from './AdmHeader.jsx';
import { AdmMenu } from './AdmMenu.jsx';
import { AdmApp } from './AdmApp.jsx';
import { AdmFooter } from './AdmFooter.jsx';
import './Adm.css';

export function Adm()
{
  const { admLocationApi } = useAdmLocation();

  return (
    <div className="Adm">
      <AdmHeader />
      <AdmMenu
        admLocationApi={ admLocationApi }
      />
      <AdmApp
        admLocationApi={ admLocationApi }
      />
      <AdmFooter />
    </div>
  );
}
