const localStorageKey = 'lingo';

export function saveLanguageLocalStorage( language )
{
  localStorage.setItem( localStorageKey, JSON.stringify( language ));
}

export function loadLanguageLocalStorage()
{
  return JSON.parse( localStorage.getItem( localStorageKey ));
}
