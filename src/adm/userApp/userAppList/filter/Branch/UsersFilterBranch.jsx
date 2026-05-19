import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { SingleSelect } from './SingleSelect.jsx';
import './UsersFilterBranch.css';

const prompt = {
  en: 'Select one',
  de: 'Wählen eine aus',
};

export function UsersFilterBranch({ filter, subordinates, onChangeFilter })
{
  const { lingo } = useLingo();

  const options = branches2options( subordinates.branches );

  const selected = filter2option( filter, options );

  return (
    <div className="UserFilterBranch">
      <div>
        { lingo({
          en: 'Branch',
          de: 'Niederlassung',
        })}
      </div>
      <SingleSelect
        prompt={ lingo( prompt )}
        options={ options }
        selected={ selected }
        onChangeSelected={ onChangeSelected }
      />
    </div>
  );

  function onChangeSelected( option )
  {
    const newFilter = option2filter( option );

    onChangeFilter( newFilter );
  }
}

function branches2options( branches )
{
  return branches.map(
    branch => ({
      id: branch.id,
      text: `${ branch.id }: ${ branch.name }`,
    })
  );
}

function filter2option( filter, options )
{
  return filter
    ? options.find( option => option.id === filter.id)
    : undefined;
}

function option2filter( option )
{
  return option
    ? { id: option.id }
    : undefined;
}
