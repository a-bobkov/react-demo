import { createContext, useContext } from 'react';
import { useUserLocation } from './useUserLocation.js';

const UserLocationContext = createContext( null );

export function useUserLocationContext()
{
  return useContext( UserLocationContext );
}

export function UserLocationProvider({ children, prefixPath })
{
  const { userLocationApi } = useUserLocation( prefixPath );

  return (
    <UserLocationContext value={ userLocationApi }>
      { children }
    </UserLocationContext>
  );
}
