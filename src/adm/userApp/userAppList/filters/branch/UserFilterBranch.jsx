import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UserFilterBranch.css';

export function UserFilterBranch({ filter, subordinates, onChangeFilter })
{
  const { lingo } = useLingo();

  const options = branches2options( subordinates.branches );

  const selectedId = filter2option( filter );

  return (
    <user-filter-branch>
      <user-filter-branch-label>
        { lingo({
          en: 'Branch',
          de: 'Niederlassung',
        })}
      </user-filter-branch-label>
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
    </user-filter-branch>
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
