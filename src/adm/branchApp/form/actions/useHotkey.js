import { useEffect } from 'react';
import { useRunOnce } from '../../../useRunOnce.js';

export function useHotkey( hotkeySource, hotkey, onHotkey )
{
  if ( !hotkey ) return;

  const hotkeySubscriber = useRunOnce( createHotkeySubscriber, { hotkeySource, hotkey, onHotkey });

  useEffect( hotkeySubscriber, []);
}

function createHotkeySubscriber({ hotkeySource, hotkey, onHotkey })
{
  return hotkeySubscriber;

  function hotkeySubscriber()
  {
    hotkeySource.addEventListener( hotkey, onHotkey );

    return hotkeyUnsubscriber;
  }

  function hotkeyUnsubscriber()
  {
    hotkeySource.removeEventListener( hotkey, onHotkey );
  }
}