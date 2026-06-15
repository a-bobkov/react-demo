import { useLingo } from './lingo/LingoProvider.jsx';
import { UserApp } from './userApp/UserApp.jsx';
import { BranchApp } from './branchApp/BranchApp.jsx';
import './AdmApp.css';

export function AdmApp({ admLocationApi })
{
  const { lingo } = useLingo();

  if ( admLocationApi.isUserLocation())
  {
    return <UserApp />;
  }

  if ( admLocationApi.isBranchLocation())
  {
    return <BranchApp />;
  }

  return lingo({
    en: 'Application not found because of incorrect URL',
    de: 'Anwendung nicht gefunden, da URL falsch ist',
  });
}
