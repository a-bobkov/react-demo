import { useGetUserAppLocationContext } from './userLocation/UserAppLocationProvider.jsx';
import { UserAppListPage } from './userAppList/UserAppListPage.jsx';
import { UserAppGetPage } from './userAppGet/UserAppGetPage.jsx';
import { UserAppCreatePage } from './userAppCreate/UserAppCreatePage.jsx';

export function UserApp()
{
  const getUserAppLocationApi = useGetUserAppLocationContext();

  if ( getUserAppLocationApi.isUserAppListLocation() ) {
    return <UserAppListPage />;
  }

  if ( getUserAppLocationApi.isUserAppGetLocation() ) {
    return <UserAppGetPage />;
  }

  if ( getUserAppLocationApi.isUserAppCreateLocation() ) {
    return <UserAppCreatePage />;
  }
}
