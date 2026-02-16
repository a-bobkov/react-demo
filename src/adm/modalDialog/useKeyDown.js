import { useEffect, useEffectEvent } from 'react';

export function useKeyDown( onKey )
{
  const onKeyDown = useEffectEvent( onKey );

  useEffect(
    () =>
    {
      window.addEventListener('keydown', onKeyDown);

      return unsubscriber;
    },
    []
  );

  function unsubscriber()
  {
    window.removeEventListener('keydown', onKeyDown);
  }
}
