import { UserApp } from './userApp/UserApp.jsx';
import { BranchApp } from './branchApp/BranchApp.jsx';

export function Application({ appLocationApi })
{
  if ( appLocationApi.isUserLocation())
  {
    return <UserApp />;
  }

  if ( appLocationApi.isBranchLocation())
  {
    return <BranchApp />;
  }

  return '404';
}
