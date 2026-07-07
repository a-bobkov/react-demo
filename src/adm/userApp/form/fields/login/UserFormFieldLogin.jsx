import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import { UserFormField } from '../UserFormField.jsx';
import './UserFormFieldLogin.css';

export function UserFormFieldLogin({ value, formErrors, saveErrors, isFieldChanged, onChangeLogin })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Login',
        de: 'Login',
      }) }
      control={ <UserLoginControl
        value={ value }
        onChangeLogin={ onChangeLogin }
      /> }
      formErrors={ formErrors }
      saveErrors={ saveErrors }
      isFieldChanged={ isFieldChanged }
    />
  );
}

function UserLoginControl({ value, onChangeLogin })
{
  const { lingo } = useLingo();

  return (
    <InputText
      placeholder={ lingo({
        en: 'email address',
        de: 'E-Mail-Adresse',
      })}
      value={ form2control(value) }
      onChange={ onChange }
    />
  );

  function onChange( event )
  {
    const newControlValue = event.target.value;

    const newFormValue = control2form( newControlValue );

    onChangeLogin( newFormValue );
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
