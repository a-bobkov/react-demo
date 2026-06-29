import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UserFilterActive.css';

const actives = [
  [ true, {
    en: 'active',
    de: 'tätig',
  }],
  [ false, {
    en: 'inactive',
    de: 'untätig',
  }],
];

export function UserFilterActive({ filter, onChangeFilterActive })
{
  const { lingo } = useLingo();

  const options = actives2options( actives, lingo );

  return (
    <user-filter-active>
      <user-filter-active-label>
        { lingo({
          en: 'Active',
          de: 'Tätig',
        })}
      </user-filter-active-label>
      <SingleSelect
        className='UserFilterActiveSelect'
        empty={ lingo({
          en: 'all',
          de: 'alle',
        })}
        options={ options }
        selectedId={ filter }
        onChangeSelectedId={ onChangeFilterActive }
      />
    </user-filter-active>
  );
}

function actives2options( actives, lingo )
{
  return new Map( actives.map(
    ([ key, value ]) => [ key, lingo( value )]
  ));
}
