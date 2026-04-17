import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormSalutation.css';

const salutationOptions = [
  {
    formValue: undefined,
    controlValue: '',
    lingo: {
      en: 'Hello',
      de: 'Hallo',
    },
  }, {
    formValue: 1,
    controlValue: '1',
    lingo: {
      en: 'Mr',
      de: 'Herr',
    },
  }, {
    formValue: 2,
    controlValue: '2',
    lingo: {
      en: 'Ms',
      de: 'Frau',
    },
  },
];

export function UserFormSalutation({ value, saveErrors, formErrors, isFieldChanged, onChangeSalutation })
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
          { salutationOptions.map( salutationOption =>
            <option value={ salutationOption.controlValue }>
              { lingo( salutationOption.lingo )}
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
  const salutationOption = salutationOptions.find( salutationOption =>
    salutationOption.controlValue === controlValue
  );

  return salutationOption.formValue;
}

function form2control( formValue )
{
  const salutationOption = salutationOptions.find( salutationOption =>
    salutationOption.formValue === formValue
  );

  return salutationOption.controlValue;
}
