import { clsx } from 'clsx';
import { FormFieldError } from './FormFieldError.jsx';
import './UserFormName.css';

export function UserFormName({ value, saveErrors, formErrors, isFieldChanged, onChangeName })
{
  return (
    <div className="UserFormName">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        Name
      </div>
      <div className="UserFormFieldValue">
        <input
          placeholder="name"
          value={ value }
          onChange={ onChange }
        />
        <div className="UserFormErrors">
          <FormFieldError error={ formErrors } />
        </div>
        <div className="UserSaveErrors">
          <FormFieldError error={ saveErrors } />
        </div>
      </div>
    </div>
  );

  function onChange( event )
  {
    const newValue = event.target.value

    onChangeName( newValue );
  }
}
