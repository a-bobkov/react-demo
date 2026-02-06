import { FormFieldError } from './FormFieldError.jsx';
import './UserFormName.css';

export function UserFormName({ value, saveErrors, formErrors, onChangeName })
{
  return (
    <div className="UserFormName">
      <div>
        Name
      </div>
      <input
        placeholder="name"
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

  function onChange( event )
  {
    const newValue = event.target.value

    onChangeName( newValue );
  }
}
