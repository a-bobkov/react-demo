import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useUserAppListLocation } from './useUserAppListLocation.js';
import { useUserAppListLoad } from './useUserAppListLoad.js';
import { UserAppList } from './UserAppList.jsx';

export function UserAppListPage({ subordinates })
{
  const { lingo } = useLingo();

  const { userAppListOptions, setUserAppListOptions } = useUserAppListLocation();

  const { users } = useUserAppListLoad( userAppListOptions );

  if ( subordinates === undefined )
  {
    return lingo ({
      en: 'Waiting for subordinates...',
      de: 'Warten auf Untergebene...',
    });
  }

  return (
    <UserAppList
      listOptions={ userAppListOptions }
      subordinates={ subordinates }
      users={ users }
      setListOptions={ setUserAppListOptions }
    />
  );
}
