import { useContextSelectLanguage } from './LingoProvider.jsx';
import { saveLanguageLocalStorage } from './languageLocalStorage.js';
import { SingleSelect } from '../SingleSelect/SingleSelect.jsx';
import './LanguageSelector.css';

export function LanguageSelector()
{
  const { languageId, setLanguageId, languages } = useContextSelectLanguage();

  return (
    <div className='LanguageSelector'>
      <SingleSelect
        className='LanguageSelectorSelect'
        options={ languages }
        selectedId={ languageId }
        onChangeSelectedId={ onChangeSelectedId }
      />
    </div>
  );

  function onChangeSelectedId( selectedId )
  {
    saveLanguageLocalStorage( selectedId );

    setLanguageId( selectedId );
  }
}
