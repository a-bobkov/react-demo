import { useContextSelectLanguage } from './LingoProvider.jsx';
import { saveLanguageLocalStorage } from './languageLocalStorage.js';
import { SingleSelect } from '../components/SingleSelect/SingleSelect.jsx';
import './LanguageSelector.css';

export function LanguageSelector()
{
  const { languageId, setLanguageId, languages } = useContextSelectLanguage();

  return (
    <SingleSelect
      className='LanguageSelector'
      options={ languages }
      selectedId={ languageId }
      onChangeSelectedId={ onChangeSelectedId }
    />
  );

  function onChangeSelectedId( selectedId )
  {
    saveLanguageLocalStorage( selectedId );

    setLanguageId( selectedId );
  }
}
