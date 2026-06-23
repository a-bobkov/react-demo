import { useMemoArg } from '../useMemoArg.js';
import { useStateLanguage } from './useStateLanguage.js';

export function useLanguageApi()
{
  const { languageId, setLanguageId, languages } = useStateLanguage();

  const selectLanguageApi = {
    languageId,
    setLanguageId,
    languages,
  };

  const pickLanguageApi = useMemoArg(
    createPickLanguageApi,
    { languageId }
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
