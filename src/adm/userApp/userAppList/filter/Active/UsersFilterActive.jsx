import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UsersFilterActive.css';

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

export function UsersFilterActive({ filter, onChangeFilterActive })
{
  const { lingo } = useLingo();

  const options = actives2options( actives, lingo );

  return (
    <div className='UsersFilterActive'>
      <div>
        { lingo({
          en: 'Active',
          de: 'Tätig',
        })}
      </div>
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
    </div>
  );
}

function actives2options( actives, lingo )
{
  return new Map( actives.map(
    ([ key, value ]) => [ key, lingo( value )]
  ));
}
