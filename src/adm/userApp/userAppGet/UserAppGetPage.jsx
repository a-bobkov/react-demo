import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useUserAppGetLocation } from './useUserAppGetLocation.js';
import { useUserAppGet } from './useUserAppGet.js';
import { UserAppUpdate } from '../userAppUpdate/UserAppUpdate.jsx';

export function UserAppGetPage({ subordinates })
{
  const { lingo } = useLingo();

  const { userId } = useUserAppGetLocation();

  const { user } = useUserAppGet( userId );

  if ( user instanceof Error )
  {
    return;
  }

  if ( user === undefined )
  {
    return lingo({
      en: `Loading user ${ userId } ...`,
      de: `Benutzer ${ userId } wird geladen ...`,
    });
  }

  if ( subordinates === undefined )
  {
    return lingo ({
      en: 'Waiting for subordinates...',
      de: 'Warten auf Untergebene...',
    });
  }

  return (
    <UserAppUpdate
      user={ user }
      subordinates={ subordinates }
    />
  );
}
