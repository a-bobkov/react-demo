import { useLingo } from '../lingo/LingoProvider.jsx';
import './ColorSchemeIsDark.css';

export function ColorSchemeIsDark({ value, onChange })
{
  return (
    <color-scheme-is-dark>
      <ColorSchemeLightButton
        value={ value }
        onChange={ onChange }
      />
      <ColorSchemeAutoButton
        value={ value }
        onChange={ onChange }
      />
      <ColorSchemeDarkButton
        value={ value }
        onChange={ onChange }
      />
    </color-scheme-is-dark>
  );
}

function ColorSchemeLightButton({ value, onChange })
{
  const { lingo } = useLingo();

  return (
    <ColorSchemeButton
      title={ lingo({
        en: 'Use always light color scheme',
        de: 'Verwenden immer helle Farbschema',
      })}
      icon={ <ColorSchemeLightIcon/> }
      isCurrent={ value === false }
      onClick={ onClickLight }
    />
  );

  function onClickLight()
  {
    onChange( false );
  }
}

function ColorSchemeAutoButton({ value, onChange })
{
  const { lingo } = useLingo();

  return (
    <ColorSchemeButton
      title={ lingo({
        en: 'Let browser manage color scheme',
        de: 'Browser das Farbschema verwalten lassen',
      })}
      icon={ <ColorSchemeAutoIcon/> }
      isCurrent={ value === null }
      onClick={ onClickAuto }
    />
  );

  function onClickAuto()
  {
    onChange( null );
  }
}

function ColorSchemeDarkButton({ value, onChange })
{
  const { lingo } = useLingo();

  return (
    <ColorSchemeButton
      title={ lingo({
        en: 'Use always dark color scheme',
        de: 'Verwenden immer dunkle Farbschema',
      })}
      icon={ <ColorSchemeDarkIcon/> }
      isCurrent={ value === true }
      onClick={ onClickDark }
    />
  );

  function onClickDark()
  {
    onChange( true );
  }
}

function ColorSchemeButton({ icon, title, isCurrent, onClick })
{
  return (
    <color-scheme-button
      title={ title }
      inert={ isCurrent }
      onClick={ onClick }
    >
      { icon }
    </color-scheme-button>
  );
}

function ColorSchemeLightIcon()
{
  return (
    <svg viewBox="0 0 44 44">
      <path d="m22 1-1 1v7h2V2zM8 7 7 8v1l4 4a1 1 0 002-1v-1zm28 0-4 4a1 1 0 001 2h1l4-4a1 1 0 00-1-2m-14 5a10 10 0 000 20q10 0 10-10 0-9-10-10M2 21a1 1 0 000 2h7v-2zm34 0a1 1 0 000 2h7v-2zm-24 10-4 4a1 1 0 001 2h1l4-4a1 1 0 00-1-2m20 0-1 1v1l4 4a1 1 0 002-1v-1zm-10 4-1 1v7h2v-7z"/>
    </svg>
  );
}

function ColorSchemeAutoIcon()
{
  return (
    <svg viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="4" fill="none" />
    </svg>
  );
}

function ColorSchemeDarkIcon()
{
  return (
    <svg viewBox="0 0 330 330">
      <path d="M225 309q21-4 38-14A162 162 0 01204 19 146 146 0 0071 85 148 148 0 00194 312q16 0 31-3m65-18q2 5-3 8a164 164 0 01-93 29A163 163 0 11225 6a8 8 0 013 14 147 147 0 0056 265q5 1 6 6"/>
    </svg>
  );
}
