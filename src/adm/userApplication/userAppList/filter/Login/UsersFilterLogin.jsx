import { useState } from 'react';
import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import './UsersFilterLogin.css';

export function UsersFilterLogin( { filter, onChangeFilter })
{
  const { lingo } = useLingo();

  const [ controlValue, setControlValue ] = useState( initialControlValue );

  return (
    <div className="UsersFilterLogin">
      <div>
        { lingo({
          en: 'Login',
          de: 'Login',
        })}
      </div>
      <input
        placeholder={ lingo({
          en: 'contains case insensitive',
          de: 'enthält ohne Groß-/Kleinschreibung',
        })}
        value={ controlValue }
        onChange={ onChange }
      />
    </div>
  );

  function initialControlValue()
  {
    return filter2control( filter );
  }

  function onChange( event )
  {
    const newControlValue = event.target.value;

    setControlValue( newControlValue );

    const newFilterValue = control2filter( newControlValue );

    if ( newFilterValue !== filter )
    {
      onChangeFilter( newFilterValue );
    }
  }
}

function control2filter( controlValue )
{
  return controlValue.trim() || undefined;
}

function filter2control( filterValue )
{
  return filterValue || '';
}
