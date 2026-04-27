import { createContext, useContext } from 'react';
import { useAppLocation } from './useAppLocation.js';

const GetAppLocationContext = createContext( null );

export function useGetAppLocationContext()
{
  return useContext( GetAppLocationContext );
}

const SetAppLocationContext = createContext( null );

export function useSetAppLocationContext()
{
  return useContext( SetAppLocationContext );
}

export function AppLocationProvider({ children })
{
  const { getAppLocationApi, setAppLocationApi } = useAppLocation();

  return (
    <GetAppLocationContext value={ getAppLocationApi }>
      <SetAppLocationContext value={ setAppLocationApi }>
        { children }
      </SetAppLocationContext>
    </GetAppLocationContext>
  );
}
