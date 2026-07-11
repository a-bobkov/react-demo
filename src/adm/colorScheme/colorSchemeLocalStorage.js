const localStorageKey = 'colorSchemeIsDark';

export function saveColorSchemeIsDark( colorScheme )
{
  if ( colorScheme === null) {
    localStorage.removeItem( localStorageKey );
  } else {
    localStorage.setItem( localStorageKey, JSON.stringify( colorScheme ));
  }
}

export function loadColorSchemeIsDark()
{
  return JSON.parse( localStorage.getItem( localStorageKey ));
}
