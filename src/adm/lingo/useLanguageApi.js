import { useMemo } from 'react';
import { useStateLanguage } from './useStateLanguage.js';

export function useLanguageApi()
{
  const { languageId, setLanguageId, languages } = useStateLanguage();

  const selectLanguageApi = {
    languageId,
    setLanguageId,
    languages,
  };

  const pickLanguageApi = useMemo(
    () => createPickLanguageApi({ languageId }),
    [ languageId ],
  );

  return {
    selectLanguageApi,
    pickLanguageApi,
  };
}

function createPickLanguageApi({ languageId })
{
  return {
    lingo,
  };

  function lingo( messages )
  {
    return messages[ languageId ];
  }
}
