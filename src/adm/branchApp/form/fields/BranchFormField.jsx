import { clsx } from 'clsx';
import { BranchFormFieldErrors } from './BranchFormFieldErrors.jsx';
import './BranchFormField.css';

export function BranchFormField({ label, renderControl, saveErrors, formErrors, isFieldChanged })
{
  return (
    <branch-form-field className="BranchFormField">
      <branch-form-field-label className={ clsx({ 'isFieldChanged': isFieldChanged })}>
        { label }
      </branch-form-field-label>
      <branch-form-field-value>
        { renderControl() }
        <BranchFormFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </branch-form-field-value>
    </branch-form-field>
  );
}
