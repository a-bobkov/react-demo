import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import { UserFormField } from '../UserFormField.jsx';
import './UserFormFieldLogin.css';

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

export function UserFormFieldLogin( { value, saveErrors, formErrors, isFieldChanged, onChangeLogin })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Login',
        de: 'Login',
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
          en: 'email address',
          de: 'E-Mail-Adresse',
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

    onChangeLogin( newFormValue );
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
