import { clsx } from 'clsx';
import { FormFieldError } from './FormFieldError.jsx';
import './UserFormLogin.css';

export function UserFormLogin({ value, saveErrors, formErrors, isFieldChanged, onChangeLogin })
{
  return (
    <div className="UserFormLogin">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        Login
      </div>
      <div className="UserFormFieldValue">
        <input
          placeholder="email address"
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

  function onChange(event)
  {
    const newValue = event.target.value

    onChangeLogin( newValue );
  }
}
