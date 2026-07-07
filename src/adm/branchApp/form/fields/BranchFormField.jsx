import { clsx } from 'clsx';
import { BranchFormFieldErrors } from './BranchFormFieldErrors.jsx';
import './BranchFormField.css';

export function BranchFormField({ label, control, formErrors, saveErrors, isFieldChanged })
{
  return (
    <branch-form-field>
      <branch-form-field-label className={ clsx({ 'isFieldChanged': isFieldChanged })}>
        { label }
      </branch-form-field-label>
      <branch-form-field-value>
        { control }
        <BranchFormFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </branch-form-field-value>
    </branch-form-field>
  );
}
