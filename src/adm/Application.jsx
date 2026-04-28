import { useGetAppLocationContext, useSetAppLocationContext } from './appLocation/AppLocationProvider.jsx';
import { UserAppLocationProvider } from './userApp/userLocation/UserAppLocationProvider.jsx';
import { UserApp } from './userApp/UserApp.jsx';
import { BranchLocationProvider } from './branchApp/branchLocation/BranchLocationProvider.jsx';
import { BranchApp } from './branchApp/BranchApp.jsx';

export function Application()
{
  const getAppLocationApi = useGetAppLocationContext();
  const setAppLocationApi = useSetAppLocationContext();

  if ( getAppLocationApi.isUserLocation())
  {
    return (
      <UserAppLocationProvider
        prefixPath={ setAppLocationApi.getUserPath() }
      >
        <UserApp />
      </UserAppLocationProvider>
    );
  }

  if ( getAppLocationApi.isBranchLocation())
  {
    return (
      <BranchLocationProvider
        prefixPath={ setAppLocationApi.getBranchPath() }
      >
        <BranchApp />
      </BranchLocationProvider>
    );
  }

  return '404';
}
