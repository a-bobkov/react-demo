import { useLingo } from '../../lingo/LingoProvider.jsx';
import { useUserAppGetLocation } from './useUserAppGetLocation.js';
import { useUserAppGet } from './useUserAppGet.js';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { UserAppUpdate } from '../userAppUpdate/UserAppUpdate.jsx';

export function UserAppGetPage({ subordinates })
{
  const { lingo } = useLingo();

  const { userId } = useUserAppGetLocation();

  const { user, userGetError } = useUserAppGet( userId );

  if ( userGetError !== undefined )
  {
    return (
      <FetchCommonError
        error={ userGetError }
      />
    );
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
