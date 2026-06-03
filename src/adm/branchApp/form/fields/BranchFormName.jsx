import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../components/InputText/InputText.jsx';
import { BranchFieldErrors } from './BranchFieldErrors.jsx';
import './BranchFormName.css';

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

export function BranchFormName({ value, saveErrors, formErrors, isFieldChanged, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <div className="BranchFormName">
      <div className={ clsx('BranchFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Name',
          de: 'Name',
        })}
      </div>
      <div className="BranchFormFieldValue">
        <InputText
          placeholder={ lingo({
            en: 'name',
            de: 'Name',
          })}
          value={ form2control( value ) }
          onChange={ onChange }
        />
        <BranchFieldErrors
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
