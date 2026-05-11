import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormSalutation.css';

const emptyOption = {
  formValue: undefined,
  controlValue: '',
  lingo: {
    en: 'Hello',
    de: 'Hallo',
  },
};

export function UserFormSalutation({ value, salutations, saveErrors, formErrors, isFieldChanged, onChangeSalutation })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormSalutation">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Salutation',
          de: 'Anrede',
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

          { salutations.map( salutation =>
            <option value={ salutation.id }>
              { lingo( salutation.name )}
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

    onChangeSalutation( newFormValue );
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
