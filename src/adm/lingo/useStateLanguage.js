import { useState } from 'react';
import { loadLanguageLocalStorage } from './languageLocalStorage.js';

const languages = new Map([
  ['en', '🇬🇧 EN'],
  ['de', '🇩🇪 DE'],
]);

const DEFAULT_LANGUAGE_ID = 'en';

export function useStateLanguage()
{
  const [ languageId, setLanguageId ] = useState( getInitialLanguageId );

  return {
    languageId,
    setLanguageId,
    languages,
  };
}

function getInitialLanguageId()
{
  return loadLanguageLocalStorage() ?? getNavigatorLanguageId() ?? DEFAULT_LANGUAGE_ID;
}

function getNavigatorLanguageId()
{
  return languages.keys().find( matchNavigatorLanguage );
}

function matchNavigatorLanguage( languageId )
{
  const languageIdRegexp = new RegExp(`^${ languageId }\\b`);

  return Boolean( window.navigator.language.match( languageIdRegexp ));
}
