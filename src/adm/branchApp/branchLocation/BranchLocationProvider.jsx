import { createContext, useContext } from 'react';
import { useBranchLocation } from './useBranchLocation.js';

const BranchLocationContext = createContext( null );

export function useBranchLocationContext()
{
  return useContext( BranchLocationContext );
}

export function BranchLocationProvider( { children, prefixPath })
{
  const { branchLocationApi } = useBranchLocation( prefixPath );

  return (
    <BranchLocationContext value={ branchLocationApi }>
      { children }
    </BranchLocationContext>
  );
}
