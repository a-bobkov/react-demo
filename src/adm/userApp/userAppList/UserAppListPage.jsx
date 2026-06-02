import { useUserAppListLocation } from './useUserAppListLocation.js';
import { useUserAppListLoad } from './useUserAppListLoad.js';
import { UsersHeader } from './UsersHeader.jsx';
import { UserAppList } from './UserAppList.jsx';

export function UserAppListPage({ subordinates })
{
  const { userAppListOptions, setUserAppListOptions } = useUserAppListLocation();

  const { users } = useUserAppListLoad( userAppListOptions );

  return (
    <div className="UserAppListPage">
      <UsersHeader />
      <UserAppList
        listOptions={ userAppListOptions }
        subordinates={ subordinates }
        users={ users }
        setListOptions={ setUserAppListOptions }
      />
    </div>
  );
}
