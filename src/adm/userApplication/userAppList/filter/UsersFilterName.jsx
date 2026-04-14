import { useState } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function UsersFilterName({ filter, onChangeFilter })
{
  const [ text, setText ] = useState( filter );

  const { lingo } = useLingo();

  return (
    <div>
      <div>
        { lingo({
          en: 'Name',
          de: 'Name',
        })}
      </div>
      <input
        placeholder={ lingo({
          en: 'name contains',
          de: 'Name enthält',
        })}
        value={ text }
        onChange={ onChange }
      />
    </div>
  );

  function onChange(event)
  {
    const newText = event.target.value

    setText(newText);

    onChangeFilter(newText);
  }
}

const filterNamePropName = 'name';

const urlNamePropName = 'name';

export function saveFilterName(searchParams, filter )
{
  const filterValue = filter[ filterNamePropName ];

  if (filterValue != null && filterValue !== '') {
    searchParams.set( urlNamePropName, filterValue );
  }
}

export function loadFilterName(searchParams )
{
  const filter = {};

  const filterValue = searchParams.get( urlNamePropName );

  if (filterValue != null) {
    filter[ filterNamePropName ] = filterValue;
  }

  return filter;
}
