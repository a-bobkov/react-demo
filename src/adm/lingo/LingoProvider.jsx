import { createContext, useContext } from 'react';
import { useLingoApi } from './useLingoApi.js';

const LingoSelectContext = createContext( null );

export function useContextLingoSelect()
{
  return useContext( LingoSelectContext );
}

const LingoPickContext = createContext( null );

export function useLingo()
{
  return useContext( LingoPickContext );
}

export function LingoProvider({ children })
{
  const { lingoSelectApi, lingoPickApi } = useLingoApi();

  return (
    <LingoSelectContext value={ lingoSelectApi }>
      <LingoPickContext value={ lingoPickApi }>
        { children }
      </LingoPickContext>
    </LingoSelectContext>
  );
}
