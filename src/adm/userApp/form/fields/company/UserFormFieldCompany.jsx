import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import { UserFormField } from '../UserFormField.jsx';
import './UserFormFieldCompany.css';

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

export function UserFormFieldCompany({ value, saveErrors, formErrors, isFieldChanged, onChangeCompany })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Company',
        de: 'Unternehmen',
      }) }
      renderControl={ renderControl }
      saveErrors={ saveErrors }
      formErrors={ formErrors }
      isFieldChanged={ isFieldChanged }
    />
  );

  function renderControl()
  {
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
  }

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
