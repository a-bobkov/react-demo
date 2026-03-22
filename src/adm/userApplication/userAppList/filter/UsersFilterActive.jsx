import { useState } from 'react';

export function UsersFilterActive({ filter, onChangeFilterActive })
{
  console.log(`UsersFilterActive: ${ filter }`)

  const [ value, setValue ] = useState( initialValue );

  return (
    <div>
      <div>
        Active
      </div>
      <select
        value={ value }
        onChange={ onChange }
      >
        <option value="">all</option>
        <option value="true">active</option>
        <option value="false">inactive</option>
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
