import { useState } from 'react';
import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function UsersFilterMail({ filter, onChangeFilter })
{
  const [ text, setText ] = useState( filter );

  const { lingo } = useLingo();

  return (
    <div>
      <div>
        { lingo({
          en: 'Email',
          de: 'E-Mail',
        })}
      </div>
      <input
        placeholder={ lingo({
          en: 'email contains',
          de: 'E-Mail enthält',
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
