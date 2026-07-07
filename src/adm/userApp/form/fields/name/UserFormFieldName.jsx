import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import { UserFormField } from '../UserFormField.jsx';
import './UserFormFieldName.css';

export function UserFormFieldName({ value, formErrors, saveErrors, isFieldChanged, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Name',
        de: 'Name',
      }) }
      control={ <UserNameControl
        value={ value }
        onChangeName={ onChangeName }
      /> }
      formErrors={ formErrors }
      saveErrors={ saveErrors }
      isFieldChanged={ isFieldChanged }
    />
  );
}

function UserNameControl({ value, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <InputText
      placeholder={ lingo({
        en: 'name',
        de: 'Name',
      })}
      value={ form2control( value ) }
      onChange={ onChange }
    />
  );

  function onChange( event )
  {
    const newControlValue = event.target.value;

    const newFormValue = control2form( newControlValue );

    onChangeName( newFormValue );
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
