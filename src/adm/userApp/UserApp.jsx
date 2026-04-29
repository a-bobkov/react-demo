import { useUserAppLocation } from './useUserAppLocation.js';
import { UserAppListPage } from './userAppList/UserAppListPage.jsx';
import { UserAppGetPage } from './userAppGet/UserAppGetPage.jsx';
import { UserAppCreatePage } from './userAppCreate/UserAppCreatePage.jsx';

export function UserApp()
{
  const { userAppLocationApi } = useUserAppLocation();

  if ( userAppLocationApi.isUserAppListLocation() ) {
    return <UserAppListPage />;
  }

  if ( userAppLocationApi.isUserAppGetLocation() ) {
    return <UserAppGetPage />;
  }

  if ( userAppLocationApi.isUserAppCreateLocation() ) {
    return <UserAppCreatePage />;
  }
}
