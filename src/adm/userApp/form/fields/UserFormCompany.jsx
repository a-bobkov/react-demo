import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../components/InputText/InputText.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormCompany.css';

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

export function UserFormCompany({ value, saveErrors, formErrors, isFieldChanged, onChangeCompany })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormCompany">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Company',
          de: 'Unternehmen',
        })}
      </div>
      <div className="UserFormFieldValue">
        <InputText
          placeholder={ lingo({
            en: 'company',
            de: 'unternehmen',
          })}
          value={ form2control(value) }
          onChange={ onChange }
        />
        <UserFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </div>
    </div>
  );

  function onChange( event )
  {
    const newControlValue = event.target.value;

    const newFormValue = control2form( newControlValue );

    onChangeCompany( newFormValue );
  }
}

function control2form( controlValue )
{
  if ( controlValue === emptyValue.controlValue ) {
    return emptyValue.formValue;
  }

  return controlValue;
}

function form2control( formValue )
{
  if ( formValue === emptyValue.formValue ) {
    return emptyValue.controlValue;
  }

  return formValue;
}
