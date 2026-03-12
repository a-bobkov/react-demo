import { useState, useEffect } from 'react';

export function useHotkeySource(isBlocked )
{
  const [ eventTarget ] = useState( createEventTarget );

  const keydownSubscriber = isBlocked
    ? () => {}
    : createKeydownSubscriber( eventTarget );

  useEffect( keydownSubscriber, [ isBlocked ]);

  return eventTarget;
}

function createEventTarget()
{
  return new EventTarget();
}

function createKeydownSubscriber( eventTarget )
{
  return keydownSubscriber;

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
