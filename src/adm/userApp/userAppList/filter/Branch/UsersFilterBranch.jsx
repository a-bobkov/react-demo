import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UsersFilterBranch.css';

export function UsersFilterBranch({ filter, subordinates, onChangeFilter })
{
  const { lingo } = useLingo();

  const options = branches2options( subordinates.branches );

  const selectedId = filter2option( filter );

  return (
    <div className="UserFilterBranch">
      <div>
        { lingo({
          en: 'Branch',
          de: 'Niederlassung',
        })}
      </div>
      <SingleSelect
        className='UserFilterBranchSelect'
        empty={ lingo({
          en: 'all',
          de: 'alle',
        })}
        options={ options }
        selectedId={ selectedId }
        onChangeSelectedId={ onChangeSelectedId }
      />
    </div>
  );

  function onChangeSelectedId( newSelectedId )
  {
    const newFilter = option2filter( newSelectedId );

    onChangeFilter( newFilter );
  }
}

function branches2options( branches )
{
  return new Map( branches.map( branch =>
    [ branch.id, `${ branch.id }: ${ branch.name }`]
  ));
}

function filter2option( filter )
{
  return filter && filter.id;
}

function option2filter( selectedId )
{
  return selectedId && { id: selectedId };
}
