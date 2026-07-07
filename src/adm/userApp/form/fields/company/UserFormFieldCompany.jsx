import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import { UserFormField } from '../UserFormField.jsx';
import './UserFormFieldCompany.css';

export function UserFormFieldCompany({ value, formErrors, saveErrors, isFieldChanged, onChangeCompany })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Company',
        de: 'Unternehmen',
      }) }
      control={ <UserCompanyControl
        value={ value }
        onChangeCompany={ onChangeCompany }
      /> }
      formErrors={ formErrors }
      saveErrors={ saveErrors }
      isFieldChanged={ isFieldChanged }
    />
  );
}

function UserCompanyControl({ value, onChangeCompany })
{
  const { lingo } = useLingo();

  return (
    <InputText
      placeholder={ lingo({
        en: 'company',
        de: 'unternehmen',
      })}
      value={ form2control(value) }
      onChange={ onChange }
    />
  );

  function onChange( event )
  {
    const newControlValue = event.target.value;

    const newFormValue = control2form( newControlValue );

    onChangeCompany( newFormValue );
  }
}

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

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
