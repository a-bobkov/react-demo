import { useState } from 'react';

export function UsersFilterMail({ filter, onChangeFilter })
{
  console.log(`UsersMailFilter: "${ filter }"`)

  const [text, setText] = useState( filter );

  return (
    <div>
      <div>
        Mail
      </div>
      <input
        placeholder="mail contains"
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

const filterMailPropName = 'mail';

const urlMailPropName = 'mail';

export function saveFilterMail( searchParams, filter )
{
  const filterValue = filter[ filterMailPropName ];

  if (filterValue != null && filterValue !== '') {
    searchParams.set( urlMailPropName, filterValue );
  }
}

export function loadFilterMail( searchParams )
{
  const filter = {};

  const filterValue = searchParams.get( urlMailPropName );

  if (filterValue != null) {
    filter[ filterMailPropName ] = filterValue;
  }

  return filter;
}
