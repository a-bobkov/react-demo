import { useMemo } from 'react';
import { useLingoState } from './useLingoState.js';

export function useLingoApi()
{
  const [ lingo, setLingo ] = useLingoState();

  const lingoSelectApi = {
    lingo,
    setLingo,
  };

  const lingoPickApi = useMemo(
    () => createLingoPickApi({ lingo }),
    [ lingo ],
  );

  return {
    lingoSelectApi,
    lingoPickApi,
  };
}

function createLingoPickApi({ lingo })
{
  return {
    lingo: pick,
  };

  function pick( messages )
  {
    return messages[ lingo ];
  }
}
