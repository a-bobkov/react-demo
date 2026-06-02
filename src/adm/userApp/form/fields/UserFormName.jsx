import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { InputText } from '../../../components/InputText/InputText.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormName.css';

const emptyValue = {
  formValue: undefined,
  controlValue: '',
};

export function UserFormName({ value, saveErrors, formErrors, isFieldChanged, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormName">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Name',
          de: 'Name',
        })}
      </div>
      <div className="UserFormFieldValue">
        <InputText
          placeholder={ lingo({
            en: 'name',
            de: 'Name',
          })}
          value={ form2control( value ) }
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
