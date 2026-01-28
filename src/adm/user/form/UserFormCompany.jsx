import { FormFieldError } from './FormFieldError.jsx';
import './UserFormCompany.css';

export function UserFormCompany({ value, saveErrors, formErrors, onChangeCompany })
{
  return (
    <div className="UserFormCompany">
      <div>
        Company
      </div>
      <input
        placeholder="company"
        value={ value }
        onChange={ onChange }
      />
      <div className="formErrors">
        { formErrors?.map(error => <FormFieldError error={ error } />)}
      </div>
      <div className="saveErrors">
        <FormFieldError error={ saveErrors } />
      </div>
    </div>
  );

  function onChange( event )
  {
    const newValue = event.target.value

    onChangeCompany( newValue );
  }
}
