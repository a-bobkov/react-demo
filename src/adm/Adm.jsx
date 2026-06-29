import { AdmHeader } from './AdmHeader.jsx';
import { AdmApps } from './AdmApps.jsx';
import { AdmFooter } from './AdmFooter.jsx';
import './Adm.css';

export function Adm()
{
  return (
    <adm>
      <AdmHeader />
      <AdmApps />
      <AdmFooter />
    </adm>
  );
}
