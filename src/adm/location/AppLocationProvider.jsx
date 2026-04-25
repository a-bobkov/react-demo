import { createContext, useContext } from 'react';
import { useAppLocation } from './useAppLocation.js';

const AppLocationContext = createContext( null );

export function useAppLocationContext()
{
  return useContext( AppLocationContext );
}

export function AppLocationProvider({ children })
{
  const { appLocationApi } = useAppLocation();

  return (
    <AppLocationContext value={ appLocationApi }>
      { children }
    </AppLocationContext>
  );
}
