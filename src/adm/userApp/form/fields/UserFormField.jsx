import { clsx } from 'clsx';
import { UserFormFieldErrors } from './UserFormFieldErrors.jsx';
import './UserFormField.css';

export function UserFormField({ label, renderControl, saveErrors, formErrors, isFieldChanged })
{
  return (
    <user-form-field>
      <user-form-field-label className={ clsx({ 'isFieldChanged': isFieldChanged })}>
        { label }
      </user-form-field-label>
      <user-form-field-value>
        { renderControl() }
        <UserFormFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </user-form-field-value>
    </user-form-field>
  );
}
