import { useState } from 'react';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import { UserAppCreate } from './UserAppCreate.jsx';
import { UserAppUpdate } from '../userAppUpdate/UserAppUpdate.jsx';
import { getUserGetFullPath } from '../userAppGet/useUserAppGetLocation.js';
import { updateHistoryEntry } from '../../PopstateLink.jsx';

export function UserAppCreatePage({ subordinates })
{
  const { lingo } = useLingo();

  const [ user, setUser ] = useState( createInitialNewUser );

  if ( subordinates === undefined )
  {
    return lingo({
      en: 'Waiting for subordinates...',
      de: 'Warten auf Untergebene...',
    });
  }

  if ( user.id === undefined )
  {
    return (
      <UserAppCreate
        user={ user }
        subordinates={ subordinates }
        setCreatedUser={ setCreatedUser }
      />
    );
  }

  return (
    <UserAppUpdate
      user={ user }
      subordinates={ subordinates }
    />
  );

  function setCreatedUser( createdUser )
  {
    updateHistoryEntry( getUserGetFullPath( createdUser.id ));

    setUser( createdUser );
  }
}

function createInitialNewUser()
{
  return {
    login: '',
    name: '',
    company: '',
    active: false,
  };
}
