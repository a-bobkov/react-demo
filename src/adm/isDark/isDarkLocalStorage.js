const localStorageKey = 'themeIsDark';

export function saveIsDarkLocalStorage(isDark)
{
  localStorage.setItem( localStorageKey, JSON.stringify( isDark ));
}

export function loadIsDarkLocalStorage()
{
  return JSON.parse( localStorage.getItem( localStorageKey ));
}
