import { createContext, useContext } from 'react';
import { useLanguageApi } from './useLanguageApi.js';

const SelectLanguageContext = createContext( null );

export function useContextSelectLanguage()
{
  return useContext( SelectLanguageContext );
}

const PickLanguageContext = createContext( null );

export function useLingo()
{
  return useContext( PickLanguageContext );
}

export function LingoProvider({ children })
{
  const { selectLanguageApi, pickLanguageApi } = useLanguageApi();

  return (
    <SelectLanguageContext value={ selectLanguageApi }>
      <PickLanguageContext value={ pickLanguageApi }>
        { children }
      </PickLanguageContext>
    </SelectLanguageContext>
  );
}
