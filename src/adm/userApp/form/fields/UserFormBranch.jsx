import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormBranch.css';

const emptyOption = {
  formValue: undefined,
  controlValue: '',
  lingo: {
    en: 'Select one',
    de: 'Wählen eine aus',
  },
};

export function UserFormBranch({ value, branches, saveErrors, formErrors, isFieldChanged, onChangeBranch })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormBranch">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Branch',
          de: 'Niederlassung',
        })}
      </div>
      <div className="UserFormFieldValue">
        <select
          value={ form2control(value) }
          onChange={ onChangeControlValue }
        >
          <option value={ emptyOption.controlValue }>
            { lingo( emptyOption.lingo )}
          </option>

          { branches.map( branch =>
            <option value={ branch.id }>
              { branch.name }
            </option>
          )}
        </select>
        <UserFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </div>
    </div>
  );

  function onChangeControlValue( event )
  {
    const newControlValue = event.target.value;

    const newFormValue = control2form( newControlValue );

    onChangeBranch( newFormValue );
  }
}

function control2form( controlValue )
{
  if ( controlValue === emptyOption.controlValue ) {
    return emptyOption.formValue;
  }

  return {
    id: parseInt( controlValue),
  };
}

function form2control( formValue )
{
  if ( formValue === emptyOption.formValue ) {
    return emptyOption.controlValue;
  }

  return `${ formValue.id }`;
}
