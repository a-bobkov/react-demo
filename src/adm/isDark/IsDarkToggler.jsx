import { useState } from 'react';
import { saveIsDarkLocalStorage, loadIsDarkLocalStorage } from './isDarkLocalStorage.js';
import './IsDarkToggler.css';

export function IsDarkToggler()
{
  const [isDark, setIsDark] = useState( initIsDark );

  return (
    <div className="IsDarkToggler">
      <div onClick={onClick}>
        ◐
      </div>
    </div>
  );

  function onClick()
  {
    const newIsDark = !isDark;

    applyIsDark(newIsDark);

    setIsDark(newIsDark);
  }
}

function initIsDark()
{
  const isDark = getInitialIsDark();

  applyIsDark(isDark);

  return isDark;
}

function getInitialIsDark()
{
  return loadIsDarkLocalStorage() ?? getSystemIsDark();
}

function getSystemIsDark()
{
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyIsDark(isDark)
{
  syncBodyClassIsDark(isDark);

  saveIsDarkLocalStorage(isDark);
}

function syncBodyClassIsDark(isDark)
{
  document.body.classList.toggle('dark-theme', isDark);
}
