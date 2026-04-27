import { useGetAppLocationContext, useSetAppLocationContext } from './appLocation/AppLocationProvider.jsx';
import { UserLocationProvider } from './userApp/userLocation/UserLocationProvider.jsx';
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
      <UserLocationProvider
        prefixPath={ setAppLocationApi.getUserPath() }
      >
        <UserApp />
      </UserLocationProvider>
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
