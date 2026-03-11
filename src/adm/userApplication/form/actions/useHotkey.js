import { useEffect } from 'react';
import { useRunOnce } from '../../../useRunOnce.js';

export function useHotkey( hotkey, onHotkey )
{
  if ( !hotkey ) return;

  const hotkeySubscriber = useRunOnce( createHotkeySubscriber, { hotkey, onHotkey });

  useEffect( hotkeySubscriber, []);
}

function createHotkeySubscriber({ hotkey, onHotkey })
{
  return hotkeySubscriber;

  function hotkeySubscriber()
  {
    window.addEventListener('keydown', onKeyDown);

    return hotkeyUnsubscriber;
  }

  function hotkeyUnsubscriber()
  {
    window.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown( event )
  {
    if ( event.key === hotkey ) {
      onHotkey();
    }
  }
}