import { useState } from 'react';
import { loadLingoLocalStorage } from './lingoLocalStorage.js';

const DEFAULT_LINGO = 'en';

export function useLingoState()
{
  return useState( getInitialLingo );
}

function getInitialLingo()
{
  return loadLingoLocalStorage() ?? getBrowserLingo();
}

function getBrowserLingo()
{
  const language = window.navigator.language;

  if ( language.startsWith('en')) return 'en';

  if ( language.startsWith('de')) return 'de';

  return DEFAULT_LINGO;
}
