import { useState } from 'react';
import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import './UserFilterName.css';

export function UserFilterName({ filter, onChangeFilter })
{
  const { lingo } = useLingo();

  const [ controlValue, setControlValue ] = useState( initialControlValue );

  return (
    <user-filter-name>
      <user-filter-name-label>
        { lingo({
          en: 'Name',
          de: 'Name',
        })}
      </user-filter-name-label>
      <InputText
        placeholder={ lingo({
          en: 'contains case insensitive',
          de: 'enthält ohne Groß-/Kleinschreibung',
        })}
        value={ controlValue }
        onChange={ onChange }
      />
    </user-filter-name>
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
