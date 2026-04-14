import { useState } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function UsersFilterActive({ filter, onChangeFilterActive })
{
  const [ value, setValue ] = useState( initialValue );

  const { lingo } = useLingo();

  return (
    <div>
      <div>
        { lingo({
          en: 'Active',
          de: 'Tätig',
        })}
      </div>
      <select
        value={ value }
        onChange={ onChange }
      >
        <option value="">
          { lingo({
            en: 'all',
            de: 'alle',
          })}
        </option>
        <option value="true">
          { lingo({
            en: 'active',
            de: 'tätig',
          })}
        </option>
        <option value="false">
          { lingo({
            en: 'inactive',
            de: 'untätig',
          })}
        </option>
      </select>
    </div>
  );

  function initialValue()
  {
    return filter2value( filter );
  }

  function onChange( event )
  {
    const newValue = event.target.value;

    setValue( newValue );

    const newFilter = value2filter( newValue );

    onChangeFilterActive( newFilter );
  }
}

function value2filter( value )
{
  return value
    ? JSON.parse( value )
    : undefined;
}

function filter2value( filter )
{
  return typeof filter === 'boolean'
    ? JSON.stringify( filter )
    : '';
}

const filterNamePropName = 'active';

const urlNamePropName = 'active';

export function saveFilterActive( searchParams, filter )
{
  const filterValue = filter[ filterNamePropName ];

  if (filterValue !== undefined) {
    searchParams.set( urlNamePropName, serializeActive( filterValue ));
  }
}

function serializeActive( value )
{
  return value ? '1' : '';
}

export function loadFilterActive( searchParams )
{
  const filter = {};

  const filterValue = searchParams.get( urlNamePropName );

  console.log(`loadFilterActive: ${ JSON.stringify( searchParams )}, ${ filterValue }`);

  if (filterValue !== null) {
    filter[ filterNamePropName ] = deserializeActive( filterValue );
  }

  return filter;
}

function deserializeActive( str )
{
  return !!str;
}
