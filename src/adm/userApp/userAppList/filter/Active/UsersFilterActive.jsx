import { useState } from 'react';
import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import './UsersFilterActive.css';

const filterOptions = [
  {
    filterValue: undefined,
    controlValue: '',
    lingo: {
      en: 'all',
      de: 'alle',
    },
  }, {
    filterValue: true,
    controlValue: 'true',
    lingo: {
      en: 'active',
      de: 'tätig',
    },
  }, {
    filterValue: false,
    controlValue: 'false',
    lingo: {
      en: 'inactive',
      de: 'untätig',
    },
  },
];

export function UsersFilterActive({ filter, onChangeFilterActive })
{
  const { lingo } = useLingo();

  const [ controlValue, setControlValue ] = useState( initialControlValue );

  return (
    <div>
      <div>
        { lingo({
          en: 'Active',
          de: 'Tätig',
        })}
      </div>
      <select
        value={ controlValue }
        onChange={ onChange }
      >
        { filterOptions.map( option =>
          <option value={ option.controlValue }>
            { lingo( option.lingo )}
          </option>
        )}
      </select>
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

    onChangeFilterActive( newFilterValue );
  }
}

function control2filter( controlValue )
{
  const foundOption = filterOptions.find( option =>
    option.controlValue === controlValue
  );

  return foundOption.filterValue;
}

function filter2control( filterValue )
{
  const foundOption = filterOptions.find( option =>
    option.filterValue === filterValue
  );

  return foundOption.controlValue;
}
