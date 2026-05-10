import { useLingo } from '../lingo/LingoProvider.jsx';
import { useUserAppLocation } from './useUserAppLocation.js';
import { useUserAppSubordinates } from './useUserAppSubordinates.js';
import { UserAppListPage } from './userAppList/UserAppListPage.jsx';
import { UserAppGetPage } from './userAppGet/UserAppGetPage.jsx';
import { UserAppCreatePage } from './userAppCreate/UserAppCreatePage.jsx';

export function UserApp()
{
  const { lingo } = useLingo();

  const { userAppLocationApi } = useUserAppLocation();

  const { subordinates } = useUserAppSubordinates();

  if ( Error.isError( subordinates ))
  {
    return;
  }

  if ( userAppLocationApi.isUserAppListLocation() )
  {
    return (
      <UserAppListPage
        subordinates={ subordinates }
      />
    );
  }

  if ( userAppLocationApi.isUserAppGetLocation() )
  {
    return (
      <UserAppGetPage
        subordinates={ subordinates }
      />
    );
  }

  if ( userAppLocationApi.isUserAppCreateLocation() )
  {
    return (
      <UserAppCreatePage
        subordinates={ subordinates }
      />
    );
  }

  return lingo({
    en: 'User page not found because of incorrect URL',
    de: 'Benutzer-Seite nicht gefunden, da URL falsch ist',
  });
}
