import { createContext, useContext } from 'react';
import { useBranchLocation } from './useBranchLocation.js';

const BranchLocationContext = createContext( null );

export function useBranchLocationContext()
{
  return useContext( BranchLocationContext );
}

export function BranchLocationProvider( { children, prefix })
{
  const { branchLocationApi } = useBranchLocation( prefix );

  return (
    <BranchLocationContext value={ branchLocationApi }>
      { children }
    </BranchLocationContext>
  );
}
