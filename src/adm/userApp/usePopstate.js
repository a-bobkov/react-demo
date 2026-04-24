import { useEffect } from 'react';
import { useRunOnce } from '../useRunOnce.js';

export function usePopstate( onPopstate )
{
  const popstateSubscriber = useRunOnce( createPopstateSubscriber, { onPopstate });

  useEffect( popstateSubscriber, []);
}

function createPopstateSubscriber({ onPopstate })
{
  return popstateSubscriber;

  function popstateSubscriber()
  {
    window.addEventListener('popstate', onPopstate );

    return popstateUnsubscriber;
  }

  function popstateUnsubscriber()
  {
    window.removeEventListener( 'popstate', onPopstate );
  }
}
