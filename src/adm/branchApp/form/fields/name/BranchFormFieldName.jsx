import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../../components/InputText/InputText.jsx';
import { BranchFormField } from '../BranchFormField.jsx';
import './BranchFormFieldName.css';

export function BranchFormFieldName({ value, saveErrors, formErrors, isFieldChanged, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <BranchFormField
      label={ lingo({
        en: 'Name',
        de: 'Name',
      }) }
      control={ <BranchNameControl
        value={ value }
        onChangeName={ onChangeName }
      /> }
      formErrors={ formErrors }
      saveErrors={ saveErrors }
      isFieldChanged={ isFieldChanged }
    />
  );
}

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

function BranchNameControl({ value, onChangeName })
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
