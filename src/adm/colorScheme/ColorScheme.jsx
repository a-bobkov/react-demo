import { useState } from 'react';
import { ColorSchemeIsDark } from './ColorSchemeIsDark.jsx';
import { saveColorSchemeIsDark, loadColorSchemeIsDark } from './colorSchemeLocalStorage.js';
import './ColorScheme.css';

export function ColorScheme()
{
  const [ colorSchemeIsDark, setColorSchemeIsDark ] = useState( initColorSchemeIsDark );

  return (
    <ColorSchemeIsDark
      value={ colorSchemeIsDark }
      onChange={ onChange }
    />
  );

  function onChange( isDark )
  {
    applyColorSchemeIsDark( isDark );

    setColorSchemeIsDark( isDark );
  }
}

function initColorSchemeIsDark()
{
  const isDark = loadColorSchemeIsDark();

  applyColorSchemeIsDark( isDark );

  return isDark;
}

function applyColorSchemeIsDark( isDark )
{
  applyColorSchemeStyle( isDark );

  saveColorSchemeIsDark( isDark );
}

const colorSchemes = new Map([
  [ false, 'light' ],
  [ null, 'light dark' ],
  [ true, 'dark' ],
]);

function applyColorSchemeStyle( isDark )
{
  document.documentElement.style.colorScheme = colorSchemes.get( isDark );
}
