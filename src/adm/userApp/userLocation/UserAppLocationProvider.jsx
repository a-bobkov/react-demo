import { createContext, useContext } from 'react';
import { useUserAppLocation } from './useUserAppLocation.js';

const GetUserAppLocationContext = createContext( null );

export function useGetUserAppLocationContext()
{
  return useContext( GetUserAppLocationContext );
}

const SetUserAppLocationContext = createContext( null );

export function useSetUserAppLocationContext()
{
  return useContext( SetUserAppLocationContext );
}

export function UserAppLocationProvider({ children, prefixPath })
{
  const { getUserAppLocationApi, setUserAppLocationApi } = useUserAppLocation( prefixPath );

  return (
    <GetUserAppLocationContext value={ getUserAppLocationApi }>
      <SetUserAppLocationContext value={ setUserAppLocationApi }>
        { children }
      </SetUserAppLocationContext>
    </GetUserAppLocationContext>
  );
}
