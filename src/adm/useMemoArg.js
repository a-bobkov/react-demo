import { useMemo } from 'react';

export function useMemoArg( fn, arg )
{
  return useMemo(
    () => fn( arg ),
    Object.values( arg )
  );
}