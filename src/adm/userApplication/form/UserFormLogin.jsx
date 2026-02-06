import { FormFieldError } from './FormFieldError.jsx';
import './UserFormLogin.css';

export function UserFormLogin({ value, saveErrors, formErrors, onChangeLogin })
{
  return (
    <div className="UserFormLogin">
      <div>
        Login
      </div>
      <input
        placeholder="email address"
        value={ value }
        onChange={ onChange }
      />
      <div className="formErrors">
        <FormFieldError error={ formErrors } />
      </div>
      <div className="saveErrors">
        <FormFieldError error={ saveErrors } />
      </div>
    </div>
  );

  function onChange(event)
  {
    const newValue = event.target.value

    onChangeLogin( newValue );
  }
}
