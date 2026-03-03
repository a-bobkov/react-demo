import { useMemo } from 'react';

export function useRunOnce( fn, arg )
{
  return useMemo(
    () => fn( arg ),
    []
  );
}