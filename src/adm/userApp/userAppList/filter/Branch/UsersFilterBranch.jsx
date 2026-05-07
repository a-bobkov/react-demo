import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import './UsersFilterBranch.css';

const emptyOption = {
  formValue: undefined,
  controlValue: '',
  lingo: {
    en: 'Select one',
    de: 'Wählen eine aus',
  },
};

export function UsersFilterBranch({ filter, subordinates, onChangeFilter })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFilterBranch">
      <div>
        { lingo({
          en: 'Branch',
          de: 'Niederlassung',
        })}
      </div>
      <select
        value={ filter2control( filter ) }
        onChange={ onChange }
      >
        <option value={ emptyOption.controlValue }>
          { lingo( emptyOption.lingo )}
        </option>

        { subordinates.branches.map( branch =>
          <option value={ branch.id }>
            { branch.name }
          </option>
        )}
      </select>
    </div>
  );

  function onChange( event )
  {
    const newControlValue = event.target.value;

    const newFilterValue = control2filter( newControlValue );

    onChangeFilter( newFilterValue );
  }
}

function control2filter( controlValue )
{
  if ( controlValue === emptyOption.controlValue ) {
    return emptyOption.formValue;
  }

  return {
    id: parseInt( controlValue),
  };
}

function filter2control( filterValue )
{
  if ( filterValue === emptyOption.formValue ) {
    return emptyOption.controlValue;
  }

  return `${ filterValue.id }`;
}
