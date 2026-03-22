import { clsx } from 'clsx';
import { FormFieldError } from './FormFieldError.jsx';
import './UserFormCompany.css';

export function UserFormActive({ value, saveErrors, formErrors, isFieldChanged, onChangeActive })
{
  return (
    <div className="UserFormActive">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        Active
      </div>
      <div className="UserFormFieldValue">
        <input
          type="checkbox"
          checked={ value }
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
    const newValue = event.target.checked;

    onChangeActive( newValue );
  }
}
