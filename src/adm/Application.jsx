import { useLingo } from './lingo/LingoProvider.jsx';
import { UserApp } from './userApp/UserApp.jsx';
import { BranchApp } from './branchApp/BranchApp.jsx';

export function Application({ appLocationApi })
{
  const { lingo } = useLingo();

  if ( appLocationApi.isUserLocation())
  {
    return <UserApp />;
  }

  if ( appLocationApi.isBranchLocation())
  {
    return <BranchApp />;
  }

  return lingo({
    en: 'Application not found because of incorrect URL',
    de: 'Anwendung nicht gefunden, da URL falsch ist',
  });
}
