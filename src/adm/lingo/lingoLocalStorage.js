const localStorageKey = 'lingo';

export function saveLingoLocalStorage( lingo )
{
  localStorage.setItem( localStorageKey, JSON.stringify( lingo ));
}

export function loadLingoLocalStorage()
{
  return JSON.parse( localStorage.getItem( localStorageKey ));
}
