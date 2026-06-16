import { clsx } from 'clsx';
import { UserFormFieldErrors } from './UserFormFieldErrors.jsx';
import './UserFormField.css';

export function UserFormField({ label, renderControl, saveErrors, formErrors, isFieldChanged })
{
  return (
    <div className="UserFormField">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { label }
      </div>
      <div className="UserFormFieldValue">
        { renderControl() }
        <UserFormFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </div>
    </div>
  );
}
