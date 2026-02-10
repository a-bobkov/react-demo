import { FormFieldError } from './FormFieldError.jsx';
import './UserFormLogin.css';

export function UserFormLogin({ value, saveErrors, formErrors, onChangeLogin })
{
  return (
    <div className="UserFormLogin">
      <div className="UserFormFieldName">
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
