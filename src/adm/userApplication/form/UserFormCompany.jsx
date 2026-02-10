import { FormFieldError } from './FormFieldError.jsx';
import './UserFormCompany.css';

export function UserFormCompany({ value, saveErrors, formErrors, onChangeCompany })
{
  return (
    <div className="UserFormCompany">
      <div className="UserFormFieldName">
        Company
      </div>
      <div className="UserFormFieldValue">
        <input
          placeholder="company"
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

    onChangeCompany( newValue );
  }
}
