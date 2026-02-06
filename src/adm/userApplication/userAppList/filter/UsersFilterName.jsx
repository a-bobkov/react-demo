import { useState } from 'react';

export function UsersFilterName({ filter, onChangeFilter })
{
  console.log(`UsersNameFilter: "${ filter }"`)

  const [text, setText] = useState( filter );

  return (
    <div>
      <div>
        Name
      </div>
      <input
        placeholder="name contains"
        value={text}
        onChange={onChange}
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
