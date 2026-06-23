import { useEffect, useMemo } from 'react';
import { useMemoArg } from '../../../useMemoArg.js';

export function useHotkeySource( isBlocked )
{
  const eventTarget = useMemo( createEventTarget, []);

  const keydownSubscriber = useMemoArg(
    createKeydownSubscriber,
    { isBlocked, eventTarget }
  );

  useEffect( keydownSubscriber, [ isBlocked ]);

  return eventTarget;
}

function createEventTarget()
{
  return new EventTarget();
}

function createKeydownSubscriber({ isBlocked, eventTarget })
{
  return isBlocked
    ? () => {}
    : keydownSubscriber;

  function keydownSubscriber()
  {
    window.addEventListener( 'keydown', onKeydown );

    return keydownUnsubscriber;
  }

  function keydownUnsubscriber()
  {
    window.removeEventListener( 'keydown', onKeydown );
  }

  function onKeydown( event )
  {
    eventTarget.dispatchEvent( new Event( event.key ));
  }
}
